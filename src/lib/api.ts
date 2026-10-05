import axios from "axios";
import {
  SpiritAnimalResultSchema,
  type SpiritAnimalResult,
} from "@/types/quiz";

export const submitQuiz = async (
  answers: Record<string, string>,
): Promise<SpiritAnimalResult> => {
  const response = await axios.post("/api/spirit-animal", { answers });

  const result = SpiritAnimalResultSchema.safeParse(response.data);

  if (!result.success) {
    throw new Error("Invalid spirit animal response");
  }

  return result.data;
};
