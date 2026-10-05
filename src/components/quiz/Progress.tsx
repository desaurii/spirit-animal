interface ProgressProps {
  currentStep: number;
  totalSteps: number;
}

export default function Progress({ currentStep, totalSteps }: ProgressProps) {
  return (
    <div className="mb-6">
      <p className="mb-3 text-sm text-[#3C5A3A]">
        Step {currentStep} of {totalSteps}
      </p>

      <div className="flex items-center gap-2">
        <span
          className={`h-3 w-3 rounded-full ${
            currentStep >= 1 ? "bg-[#6B8E23]" : "bg-[#C7D5A6]"
          }`}
        />
        <span
          className={`h-0.5 w-12 ${
            currentStep >= 2 ? "bg-[#6B8E23]" : "bg-[#C7D5A6]"
          }`}
        />
        <span
          className={`h-3 w-3 rounded-full ${
            currentStep >= 2 ? "bg-[#6B8E23]" : "bg-[#C7D5A6]"
          }`}
        />
        <span
          className={`h-0.5 w-12 ${
            currentStep >= 3 ? "bg-[#6B8E23]" : "bg-[#C7D5A6]"
          }`}
        />
        <span
          className={`h-3 w-3 rounded-full ${
            currentStep >= 3 ? "bg-[#6B8E23]" : "bg-[#C7D5A6]"
          }`}
        />
      </div>
    </div>
  );
}
