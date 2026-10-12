type QuizActionsProps = {
  currentStep: number;
  isLastStep: boolean;
  isLoading: boolean;
  allAnswered: boolean;
  onBack: () => void;
  onNext: () => void;
};

export default function QuizActions({
  currentStep,
  isLastStep,
  isLoading,
  allAnswered,
  onBack,
  onNext,
}: QuizActionsProps) {
  const label = isLastStep ? "Find my spirit animal" : "Next";

  return (
    <div className="mt-6 flex items-center justify-between">
      {currentStep > 1 && (
        <button
          onClick={onBack}
          className="rounded-lg border border-forest px-6 py-3 text-forest hover:bg-matcha-latte focus:outline-none focus-visible:ring-2 focus-visible:ring-olive focus-visible:ring-offset-2"
        >
          Back
        </button>
      )}
      <button
        onClick={onNext}
        disabled={!allAnswered || isLoading}
        className="ml-auto rounded-lg bg-forest px-6 py-3 text-white hover:bg-olive focus:outline-none focus-visible:ring-2 focus-visible:ring-olive focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? (
          <span className="flex items-center gap-2 whitespace-nowrap">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Finding your spirit animal...
          </span>
        ) : (
          label
        )}
      </button>
    </div>
  );
}
