import { z } from "zod";
import type { QuizData } from "@/types/quiz";

const STORAGE_KEY = "spirit-animal-quiz:v1";

const QuizDataSchema = z.object({
  currentStep: z.number().int().min(1).max(3),
  answers: z.record(z.string(), z.string()),
});

export function saveQuizState(data: QuizData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
export function getQuizState(): QuizData | null {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (!savedData) {
    return null;
  }

  try {
    const parsedData = JSON.parse(savedData);

    const result = QuizDataSchema.safeParse(parsedData);

    if (!result.success) {
      return null;
    }

    return result.data;
  } catch {
    return null;
  }
}
export function clearQuizState() {
  localStorage.removeItem(STORAGE_KEY);
}
