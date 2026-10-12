import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";

import {
  SpiritAnimalModelSchema,
  SpiritAnimalResultSchema,
  type SpiritAnimalResult,
} from "@/types/quiz";

let openai: OpenAI | undefined;

function getOpenAIClient() {
  if (openai) return openai;

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not configured");

  openai = new OpenAI({ apiKey });
  return openai;
}

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

  const response = await getOpenAIClient().responses.parse({
    model: "gpt-5.6-luna",
    input: prompt,
    text: {
      format: zodTextFormat(SpiritAnimalModelSchema, "spirit_animal_result"),
    },
  });

  if (!response.output_parsed) {
    throw new Error("Failed to parse spirit animal result");
  }

  const result = SpiritAnimalResultSchema.safeParse(response.output_parsed);
  if (!result.success) {
    throw new Error("Spirit animal result did not meet content limits");
  }

  return result.data;
}
