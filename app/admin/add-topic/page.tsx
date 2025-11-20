"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminTopicsPage() {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [topics, setTopics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [editingTopic, setEditingTopic] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [videoSrc, setVideoSrc] = useState("");
  const [credits, setCredits] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  // Fetch subjects
  useEffect(() => {
    const fetchSubjects = async () => {
      const { data, error } = await supabase.from("subjects").select("*");
      if (!error) setSubjects(data || []);
    };
    fetchSubjects();
  }, []);

  // Fetch topics
  const fetchTopics = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("topics").select("*");
    if (!error) setTopics(data || []);
    setLoading(false);
  };
  useEffect(() => { fetchTopics(); }, []);

  const resetForm = () => {
    setTitle(""); setSlug(""); setDescription("");
    setVideoSrc(""); setCredits(""); setSubjectId("");
    setEditingTopic(null); setMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !subjectId) {
      setMessage("Title and Subject are required");
      return;
    }

    const topicSlug = slug || title.toLowerCase().replace(/\s+/g, "-");
    const selectedSubject = subjects.find((s) => s.id === subjectId);
    if (!selectedSubject) { setMessage("Invalid subject"); return; }

    if (editingTopic) {
      const { error } = await supabase
        .from("topics")
        .update({
          title, slug: topicSlug, description: description || null,
          video_src: videoSrc || null, credits: credits || null,
          subject_id: subjectId, subject_slug: selectedSubject.slug
        }).eq("id", editingTopic.id);
      if (!error) { resetForm(); fetchTopics(); setMessage("Topic updated ✅"); }
      else setMessage(error.message);
    } else {
      const { error } = await supabase.from("topics").insert([{
        title, slug: topicSlug, description: description || null,
        video_src: videoSrc || null, credits: credits || null,
        subject_id: subjectId, subject_slug: selectedSubject.slug
      }]);
      if (!error) { resetForm(); fetchTopics(); setMessage("Topic added ✅"); }
      else setMessage(error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this topic?")) return;
    const { error } = await supabase.from("topics").delete().eq("id", id);
    if (!error) fetchTopics();
    else setMessage(error.message);
  };

  const handleEdit = (topic: any) => {
    setEditingTopic(topic);
    setTitle(topic.title);
    setSlug(topic.slug);
    setDescription(topic.description || "");
    setVideoSrc(topic.video_src || "");
    setCredits(topic.credits || "");
    setSubjectId(topic.subject_id);
    setMessage("");
  };

  const filteredTopics = topics.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Topics</h1>

      {message && <div className="mb-4 text-green-600">{message}</div>}

      {/* Search */}
      <input
        type="text"
        placeholder="Search topics..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Form */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">{editingTopic ? "Edit Topic" : "Add New Topic"}</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
            className="border rounded px-3 py-2 col-span-1 md:col-span-2"
          >
            <option value="">Select Subject</option>
            {subjects.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
          </select>

          <input
            type="text" placeholder="Title"
            value={title} onChange={(e) => setTitle(e.target.value)}
            className="border rounded px-3 py-2"
          />

          <input
            type="text" placeholder="Slug (optional)"
            value={slug} onChange={(e) => setSlug(e.target.value)}
            className="border rounded px-3 py-2"
          />

          <textarea
            placeholder="Description" value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded px-3 py-2 col-span-1 md:col-span-2"
          />

          <input
            type="text" placeholder="Video URL" value={videoSrc}
            onChange={(e) => setVideoSrc(e.target.value)}
            className="border rounded px-3 py-2"
          />

          <input
            type="text" placeholder="Credits" value={credits}
            onChange={(e) => setCredits(e.target.value)}
            className="border rounded px-3 py-2"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded col-span-1 md:col-span-2 hover:bg-blue-700 transition"
          >
            {editingTopic ? "Update Topic" : "Add Topic"}
          </button>
        </form>
      </div>

      {/* Topics List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTopics.map(topic => {
          const subject = subjects.find(s => s.id === topic.subject_id);
          return (
            <div key={topic.id} className="bg-white p-4 rounded shadow flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{topic.title}</h3>
                <p className="text-sm text-gray-600">{topic.description || "No description"}</p>
                <span className="text-xs text-gray-400 mt-1 block">Subject: {subject?.title || "Unknown"}</span>
              </div>
              <div className="flex flex-col gap-2 ml-4">
                <button onClick={() => handleEdit(topic)} className="bg-yellow-400 px-3 py-1 rounded hover:opacity-90">Edit</button>
                <button onClick={() => handleDelete(topic.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:opacity-90">Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
