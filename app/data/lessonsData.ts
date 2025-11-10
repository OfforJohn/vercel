// app/data/lessonsData.ts

export type Lesson = {
  title: string;
  time: string;
};

export type TopicData = {
  title: string;
  description: string;
  videoSrc: string;
  credits: string;
  lessons: Lesson[];
  highlights: string[];
};

export const lessonsByTopic: Record<string, Record<string, TopicData>> = {
  mathematics: {
    trigonometry: {
      title: "Introduction to Trigonometry",
      description:
        "Master the basics of trigonometry and build a strong foundation for tackling WAEC, JAMB, and Post-UTME math questions.",
      videoSrc: "/videos/trigonometry-intro.mp4",
      credits: "Joel & Estelle",
      lessons: [
        { title: "Introduction to Trigonometry", time: "2:00" },
        { title: "Angles and Triangles Basics", time: "8:24" },
        { title: "Right-Angled Triangles", time: "4:09" },
        { title: "Trigonometric Ratios (Sine, Cosine, Tangent)", time: "2:54" },
        { title: "Solving Simple Trigonometry Problems", time: "7:23" },
      ],
      highlights: [
        "Understand angles and triangles",
        "Learn basic trigonometric ratios",
        "Apply trigonometry to solve problems"
      ],
    },
    algebra: {
      title: "Algebra Basics",
      description: "Learn how to manipulate algebraic expressions and solve linear equations.",
      videoSrc: "/videos/algebra-intro.mp4",
      credits: "Joel & Ada",
      lessons: [
        { title: "Introduction to Algebra", time: "3:10" },
        { title: "Simplifying Expressions", time: "4:55" },
        { title: "Solving Linear Equations", time: "6:12" },
      ],
      highlights: [
        "Simplify algebraic expressions",
        "Solve linear equations",
        "Apply algebra in real-life problems"
      ],
    },
    geometry: {
      title: "Geometry Fundamentals",
      description: "Shapes, angles, and theorems that bring math to life.",
      videoSrc: "/videos/geometry-intro.mp4",
      credits: "Estelle",
      lessons: [
        { title: "Introduction to Geometry", time: "3:00" },
        { title: "Lines, Angles, and Shapes", time: "5:10" },
        { title: "Triangles and Circles", time: "4:40" },
        { title: "Basic Theorems", time: "6:20" },
      ],
      highlights: [
        "Identify geometric shapes and angles",
        "Understand basic theorems",
        "Apply geometry in problem-solving"
      ],
    },
  },
  physics: {
    "motion-laws": {
      title: "Motion & Newton's Laws",
      description: "Understand motion, speed, velocity, and Newton's three laws with practical examples.",
      videoSrc: "/videos/motion-laws.mp4",
      credits: "Estelle",
      lessons: [
        { title: "Introduction to Motion", time: "3:45" },
        { title: "Newton's First Law", time: "5:20" },
        { title: "Newton's Second Law", time: "6:10" },
        { title: "Newton's Third Law", time: "4:30" },
      ],
      highlights: [
        "Understand motion, speed, and velocity",
        "Learn Newton's three laws",
        "Apply physics laws to everyday examples"
      ],
    },
    electricity: {
      title: "Electricity Basics",
      description: "Learn about current, voltage, and Ohm’s Law.",
      videoSrc: "/videos/electricity.mp4",
      credits: "Joel",
      lessons: [
        { title: "Introduction to Electricity", time: "3:15" },
        { title: "Current, Voltage, and Resistance", time: "4:50" },
        { title: "Ohm's Law in Practice", time: "5:30" },
        { title: "Series and Parallel Circuits", time: "6:10" },
      ],
      highlights: [
        "Understand current, voltage, and resistance",
        "Apply Ohm’s Law",
        "Analyze series and parallel circuits"
      ],
    },
  },
 chemistry: {
  "acids-bases": {
    title: "Acids & Bases",
    description: "Learn how acids react and balance equations.",
    videoSrc: "/videos/acids-bases-intro.mp4",
    credits: "Dr. Ada",
    lessons: [
      { title: "Introduction to Acids & Bases", time: "3:30" },
      { title: "Properties of Acids", time: "4:10" },
      { title: "Properties of Bases", time: "3:50" },
      { title: "pH and Neutralization", time: "5:00" },
    ],
    highlights: [
      "Understand acid and base properties",
      "Calculate pH and perform neutralization",
      "Apply knowledge in chemistry experiments",
    ],
  },
  "periodic-table": {
    title: "Periodic Table",
    description: "Discover trends and properties of elements.",
    videoSrc: "/videos/periodic-table.mp4",
    credits: "Dr. Joel",
    lessons: [
      { title: "Introduction to the Periodic Table", time: "2:50" },
      { title: "Groups and Periods", time: "4:20" },
      { title: "Element Properties", time: "5:10" },
    ],
    highlights: [
      "Understand groups and periods",
      "Learn element properties",
      "Recognize periodic trends",
    ],
  },
},

  biology: {  "cell-biology": {
    title: "Cell-Biology",
      description: "Understand the structure and function of cells.",
      videoSrc: "/videos/cell-biology.mp4",
      credits: "Estelle",
      lessons: [
        { title: "Introduction to Cells", time: "3:00" },
        { title: "Cell Organelles", time: "6:15" },
        { title: "Cell Division", time: "4:40" },
      ],
      highlights: [
        "Learn cell structure and organelles",
        "Understand cell division",
        "Apply knowledge in biology studies"
      ],
    },
    genetics: {
      title: "Genetics",
      description: "Explore DNA, genes, and inheritance patterns.",
      videoSrc: "/videos/genetics.mp4",
      credits: "Joel & Ada",
      lessons: [
        { title: "DNA Structure", time: "4:05" },
        { title: "Genes and Chromosomes", time: "5:20" },
        { title: "Mendelian Inheritance", time: "6:10" },
      ],
      highlights: [
        "Understand DNA and chromosomes",
        "Learn inheritance patterns",
        "Apply genetics in real-life scenarios"
      ],
    },
  },
  english: {
    grammar: {
      title: "Grammar",
      description: "Master tenses, clauses, and sentence structure.",
      videoSrc: "/videos/grammar.mp4",
      credits: "Estelle",
      lessons: [
        { title: "Parts of Speech", time: "3:50" },
        { title: "Sentence Structure", time: "4:30" },
        { title: "Tenses Overview", time: "5:10" },
      ],
      highlights: [
        "Master tenses and clauses",
        "Understand sentence structure",
        "Apply grammar in writing"
      ],
    },
    comprehension: {
      title: "Comprehension",
      description: "Improve understanding and interpretation of passages.",
      videoSrc: "/videos/comprehension.mp4",
      credits: "Joel",
      lessons: [
        { title: "Reading Strategies", time: "4:15" },
        { title: "Understanding Questions", time: "3:55" },
        { title: "Inference and Analysis", time: "5:00" },
      ],
      highlights: [
        "Develop reading strategies",
        "Interpret passages accurately",
        "Improve critical thinking skills"
      ],
    },
  },
  literature: {
    poetry: {
      title: "Poetry",
      description: "Analyze poems and learn poetic devices, rhythm, and imagery.",
      videoSrc: "/videos/poetry.mp4",
      credits: "Estelle & Ada",
      lessons: [
        { title: "Introduction to Poetry", time: "3:40" },
        { title: "Poetic Devices", time: "5:20" },
        { title: "Rhythm and Meter", time: "4:10" },
        { title: "Analyzing Poems", time: "6:00" },
      ],
      highlights: [
        "Understanding poetic devices",
        "Analyzing rhythm and meter",
        "Interpreting imagery and themes"
      ],
    },
    prose: {
      title: "Prose",
      description: "Explore novels, short stories, and essays, focusing on narrative techniques.",
      videoSrc: "/videos/prose.mp4",
      credits: "Joel & Estelle",
      lessons: [
        { title: "Understanding Prose", time: "3:50" },
        { title: "Narrative Techniques", time: "5:15" },
        { title: "Character and Plot Analysis", time: "6:05" },
      ],
      highlights: [
        "Analyze narrative techniques",
        "Understand character and plot development",
        "Apply skills to interpret literature"
      ],
    },
    drama: {
      title: "Drama",
      description: "Study plays and theatrical techniques, including dialogue and stage directions.",
      videoSrc: "/videos/drama.mp4",
      credits: "Ada",
      lessons: [
        { title: "Introduction to Drama", time: "4:00" },
        { title: "Elements of a Play", time: "5:10" },
        { title: "Dialogue and Stage Directions", time: "4:45" },
        { title: "Analyzing Scenes", time: "5:30" },
      ],
      highlights: [
        "Understand elements of drama",
        "Interpret dialogue and stage directions",
        "Analyze scenes critically"
      ],
    },
  },
};
