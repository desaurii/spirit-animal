import { questions } from "@/data/questions";
import { getSpiritAnimal } from "@/lib/openai";
import { z } from "zod";

const RequestSchema = z.object({
  answers: z.record(z.string(), z.string()),
});

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsedBody = RequestSchema.safeParse(body);

  if (!parsedBody.success) {
    return Response.json({ error: "Invalid answers" }, { status: 400 });
  }

  const { answers } = parsedBody.data;

  const allAnswersValid = questions.every((question) => {
    const answer = answers[String(question.id)];

    return answer !== undefined && question.options.includes(answer);
  });

  if (!allAnswersValid) {
    return Response.json({ error: "Invalid answers" }, { status: 400 });
  }

  try {
    const result = await getSpiritAnimal(answers);

    return Response.json(result);
  } catch (error) {
    console.error("Failed to generate spirit animal:", error);

    return Response.json(
      { error: "Failed to generate spirit animal" },
      { status: 500 },
    );
  }
}
