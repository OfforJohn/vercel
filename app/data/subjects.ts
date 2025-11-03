export interface Question {
  question: string;
  options: string[];
  answer: string;          // e.g., "A", "B", "C", "D"
  explanation?: string;    // optional explanation for review
}

export interface SubjectData {
  name: string;
  questions: Question[];
}

// Import all subjects
import { physics } from "./physics";
import { mathematics } from "./mathematics";
import { chemistry } from "./chemistry";
import { biology } from "./biology";
import { english } from "./english";

export const subjectsData: Record<string, SubjectData> = {
  physics,
  mathematics,
  chemistry,
  biology,
  english,
};
