import type { SpiritAnimalResult } from "@/types/quiz";
import StorageNotice from "@/components/quiz/StorageNotice";

interface ResultCardProps {
  result: SpiritAnimalResult;
  onRetake: () => void;
  canPersistQuiz: boolean;
}

export default function ResultCard({
  result,
  onRetake,
  canPersistQuiz,
}: ResultCardProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-canvas px-4 py-8">
      <div className="w-full max-w-xl rounded-2xl bg-white p-8 text-center shadow-md">
        {!canPersistQuiz && <StorageNotice />}
        <div className="mb-6 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-olive">
            Your result
          </p>
          <h1 className="mb-2 text-4xl font-bold text-pine-dark">
            {result.animal}
          </h1>
          <p className="text-lg italic text-forest">{result.tagline}</p>
        </div>

        <div className="mb-6">
          <h2 className="mb-2 text-lg font-semibold text-pine-dark">
            About your spirit
          </h2>
          <p className="text-base leading-7 text-forest">
            {result.explanation}
          </p>
        </div>

        <div className="mb-6">
          <h2 className="mb-3 text-lg font-semibold text-pine-dark">
            Your strengths
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {result.strengths.map((strength) => (
              <span
                key={strength}
                className="rounded-full bg-matcha-latte px-4 py-2 text-sm text-pine-dark"
              >
                {strength}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-6 rounded-xl bg-cream p-4">
          <h2 className="mb-2 text-lg font-semibold text-pine-dark">
            Watch out
          </h2>
          <p className="leading-7 text-forest">{result.watchOut}</p>
        </div>

        <button
          onClick={onRetake}
          className="rounded-lg bg-forest px-6 py-3 text-white hover:bg-olive focus:outline-none focus-visible:ring-2 focus-visible:ring-olive focus-visible:ring-offset-2"
        >
          Retake Quiz
        </button>
      </div>
    </main>
  );
}
