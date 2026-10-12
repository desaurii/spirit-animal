interface ProgressProps {
  currentStep: number;
  totalSteps: number;
}

export default function Progress({ currentStep, totalSteps }: ProgressProps) {
  return (
    <div className="mb-6">
      <p className="mb-3 text-sm text-forest">
        Step {currentStep} of {totalSteps}
      </p>

      <div className="flex items-center gap-2">
        <span
          className={`h-3 w-3 rounded-full ${
            currentStep >= 1 ? "bg-olive" : "bg-matcha-latte"
          }`}
        />
        <span
          className={`h-0.5 w-12 ${
            currentStep >= 2 ? "bg-olive" : "bg-matcha-latte"
          }`}
        />
        <span
          className={`h-3 w-3 rounded-full ${
            currentStep >= 2 ? "bg-olive" : "bg-matcha-latte"
          }`}
        />
        <span
          className={`h-0.5 w-12 ${
            currentStep >= 3 ? "bg-olive" : "bg-matcha-latte"
          }`}
        />
        <span
          className={`h-3 w-3 rounded-full ${
            currentStep >= 3 ? "bg-olive" : "bg-matcha-latte"
          }`}
        />
      </div>
    </div>
  );
}
