import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";

import {
  SpiritAnimalResultSchema,
  type SpiritAnimalResult,
} from "@/types/quiz";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getSpiritAnimal(
  answers: Record<string, string>,
): Promise<SpiritAnimalResult> {
  const prompt = `
Analyze the user's quiz answers and determine their spirit animal.

Choose one spirit animal that best matches the user's overall personality.
Provide:
- a short tagline;
- an explanation based on the answers;
- 3–5 strengths;
- one thing to watch out for.

User answers:
${JSON.stringify(answers)}
`;

  const response = await openai.responses.parse({
    model: "gpt-5.6-luna",
    input: prompt,
    text: {
      format: zodTextFormat(SpiritAnimalResultSchema, "spirit_animal_result"),
    },
  });

  if (!response.output_parsed) {
    throw new Error("Failed to parse spirit animal result");
  }

  return response.output_parsed;
}
