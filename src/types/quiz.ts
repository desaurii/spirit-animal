import { z } from "zod";

export const SpiritAnimalResultSchema = z.object({
  animal: z.string(),
  tagline: z.string(),
  explanation: z.string(),
  strengths: z.array(z.string()).min(3).max(5),
  watchOut: z.string(),
});

export type SpiritAnimalResult = z.infer<typeof SpiritAnimalResultSchema>;
export type Step = 1 | 2 | 3;

export interface Question {
  id: number;
  step: Step;
  question: string;
  options: string[];
}

export interface QuizData {
  currentStep: number;
  answers: Record<string, string>;
}



