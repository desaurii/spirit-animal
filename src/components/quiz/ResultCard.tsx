import type { SpiritAnimalResult } from "@/types/quiz";

interface ResultCardProps {
  result: SpiritAnimalResult;
  onRetake: () => void;
}

export default function ResultCard({ result, onRetake }: ResultCardProps) {
  return (
    <div className="w-full max-w-xl rounded-2xl bg-white p-8 text-center shadow-md">
      <div className="mb-6 text-center">
        <p className="mb-2 text-sm font-medium uppercase tracking-wider text-[#6B8E23]">
          Your result
        </p>

        <h1 className="mb-2 text-4xl font-bold text-[#1F3B2E]">
          {result.animal}
        </h1>

        <p className="text-lg italic text-[#3C5A3A]">{result.tagline}</p>
      </div>
      <div className="mb-6">
        <h2 className="mb-2 text-lg font-semibold text-[#1F3B2E]">
          About your spirit
        </h2>

        <p className="text-base leading-7 text-[#3C5A3A]">
          {result.explanation}
        </p>
      </div>
      <div className="mb-6">
        <h2 className="mb-3 text-lg font-semibold text-[#1F3B2E]">
          Your strengths
        </h2>

        <div className="flex flex-wrap justify-center gap-2">
          {result.strengths.map((strength) => (
            <span
              key={strength}
              className="rounded-full bg-[#C7D5A6] px-4 py-2 text-sm text-[#1F3B2E]"
            >
              {strength}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-6 rounded-xl bg-[#F1F0DE] p-4">
        <h2 className="mb-2 text-lg font-semibold text-[#1F3B2E]">Watch out</h2>

        <p className="leading-7 text-[#3C5A3A]">{result.watchOut}</p>
      </div>

      <button
        onClick={onRetake}
        className="rounded-lg bg-[#3C5A3A] px-6 py-3 text-white 
        hover:bg-[#6B8E23]
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6B8E23] focus-visible:ring-offset-2"
      >
        Retake Quiz
      </button>
    </div>
  );
}
