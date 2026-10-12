import { z } from "zod";

export const SpiritAnimalModelSchema = z.object({
  animal: z.string(),
  tagline: z.string(),
  explanation: z.string(),
  strengths: z.array(z.string()).min(3).max(5),
  watchOut: z.string(),
});

export const SpiritAnimalResultSchema = SpiritAnimalModelSchema.extend({
  animal: z.string().min(1).max(60),
  tagline: z.string().min(1).max(120),
  explanation: z.string().min(1).max(1200),
  strengths: z.array(z.string().min(1).max(100)).min(3).max(5),
  watchOut: z.string().min(1).max(600),
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
  result?: SpiritAnimalResult;
}



