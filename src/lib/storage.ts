import { z } from "zod";
import { SpiritAnimalResultSchema, type QuizData } from "@/types/quiz";

const STORAGE_KEY = "spirit-animal-quiz:v1";

const QuizDataSchema = z.object({
  currentStep: z.number().int().min(1).max(3),
  answers: z.record(z.string(), z.string()),
  result: SpiritAnimalResultSchema.optional(),
});

export function saveQuizState(data: QuizData): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}
export function getQuizState(): QuizData | null {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (!savedData) return null;

    const parsedData = JSON.parse(savedData);
    const result = QuizDataSchema.safeParse(parsedData);

    return result.success ? result.data : null;
  } catch {
    return null;
  }
}
export function clearQuizState(): boolean {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
}
