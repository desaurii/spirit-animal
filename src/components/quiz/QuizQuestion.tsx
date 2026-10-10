import Image from "next/image";
import type { questions } from "@/data/questions";

type QuizQuestionProps = {
  question: (typeof questions)[number];
  answer: string | undefined;
  onChange: (questionId: number, answer: string) => void;
};

export default function QuizQuestion({
  question,
  answer,
  onChange,
}: QuizQuestionProps) {
  return (
    <section className="mb-8">
      <div className="mb-3 flex items-center gap-2">
        <Image src="/leaf.svg" alt="" width={20} height={20} />
        <h2 className="text-lg font-semibold text-pine-dark">
          {question.question}
        </h2>
      </div>
      <div className="flex flex-col gap-3">
        {question.options.map((option) => {
          const isSelected = answer === option;
          const borderColor = isSelected ? "border-olive" : "border-gray-200";
          const background = isSelected ? "bg-matcha-latte" : "bg-white";

          return (
            <label
              key={option}
              className={`flex items-center gap-3 rounded-lg border p-4 text-pine-dark hover:border-sage focus-within:ring-2 focus-within:ring-olive focus-within:ring-offset-2 ${borderColor} ${background}`}
            >
              <input
                type="radio"
                value={option}
                checked={isSelected}
                onChange={() => onChange(question.id, option)}
                className="accent-olive focus:outline-none"
              />
              {option}
            </label>
          );
        })}
      </div>
    </section>
  );
}
