import { questions } from "@/data/questions";
import Progress from "@/components/quiz/Progress";
import QuizActions from "@/components/quiz/QuizActions";
import QuizQuestion from "@/components/quiz/QuizQuestion";
import StorageNotice from "@/components/quiz/StorageNotice";

type QuizContentProps = {
  currentStep: number;
  lastStep: number;
  questions: (typeof questions)[number][];
  answers: Record<string, string>;
  isLoading: boolean;
  allAnswered: boolean;
  canPersistQuiz: boolean;
  onChange: (questionId: number, answer: string) => void;
  onBack: () => void;
  onNext: () => void;
};

export default function QuizContent({
  currentStep,
  lastStep,
  questions: currentQuestions,
  answers,
  isLoading,
  allAnswered,
  canPersistQuiz,
  onChange,
  onBack,
  onNext,
}: QuizContentProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-canvas px-4 py-8">
      <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-sm">
        {!canPersistQuiz && <StorageNotice />}
        <Progress currentStep={currentStep} totalSteps={lastStep} />
        {currentQuestions.map((question) => (
          <QuizQuestion
            key={question.id}
            question={question}
            answer={answers[question.id]}
            onChange={onChange}
          />
        ))}
        <QuizActions
          currentStep={currentStep}
          isLastStep={currentStep === lastStep}
          isLoading={isLoading}
          allAnswered={allAnswered}
          onBack={onBack}
          onNext={onNext}
        />
      </div>
    </main>
  );
}
