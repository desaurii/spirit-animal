import axios from "axios";
import { QuizRequestError } from "@/lib/quiz-errors";
import {
  SpiritAnimalResultSchema,
  type SpiritAnimalResult,
} from "@/types/quiz";

export const submitQuiz = async (
  answers: Record<string, string>,
): Promise<SpiritAnimalResult> => {
  try {
    const response = await axios.post("/api/spirit-animal", { answers });

    const result = SpiritAnimalResultSchema.safeParse(response.data);

    if (!result.success) throw new QuizRequestError("invalid-response");
    return result.data;
  } catch (error) {
    if (error instanceof QuizRequestError) throw error;
    if (!axios.isAxiosError(error)) throw error;

    const status = error.response?.status;
    if (status === 400) throw new QuizRequestError("invalid-answers");
    if (status === 429) throw new QuizRequestError("rate-limited");
    if (status !== undefined) throw new QuizRequestError("server");
    throw new QuizRequestError("network");
  }
};
