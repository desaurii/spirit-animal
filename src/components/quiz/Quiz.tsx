"use client";

import QuizContent from "@/components/quiz/QuizContent";
import QuizError from "@/components/quiz/QuizError";
import ResultCard from "@/components/quiz/ResultCard";
import { useQuiz } from "@/hooks/useQuiz";

export default function Quiz() {
  const quiz = useQuiz();

  if (quiz.error) {
    return <QuizError message={quiz.error} onRetry={quiz.clearError} />;
  }

  if (quiz.result) {
    return (
      <ResultCard
        result={quiz.result}
        onRetake={quiz.handleRetake}
        canPersistQuiz={quiz.canPersistQuiz}
      />
    );
  }

  return (
    <QuizContent
      currentStep={quiz.currentStep}
      lastStep={quiz.lastStep}
      questions={quiz.currentQuestions}
      answers={quiz.answers}
      isLoading={quiz.isLoading}
      allAnswered={quiz.allAnswered}
      canPersistQuiz={quiz.canPersistQuiz}
      onChange={quiz.handleChange}
      onBack={quiz.handleBack}
      onNext={quiz.handleNext}
    />
  );
}
