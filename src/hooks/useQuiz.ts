import { useRef, useState } from "react";
import { questions } from "@/data/questions";
import { submitQuiz } from "@/lib/api";
import { getQuizErrorMessage } from "@/lib/quiz-errors";
import { clearQuizState, getQuizState, saveQuizState } from "@/lib/storage";
import type { SpiritAnimalResult } from "@/types/quiz";

export function useQuiz() {
  const [currentStep, setCurrentStep] = useState(
    () => getQuizState()?.currentStep ?? 1,
  );
  const [answers, setAnswers] = useState<Record<string, string>>(
    () => getQuizState()?.answers ?? {},
  );
  const [result, setResult] = useState<SpiritAnimalResult | null>(
    () => getQuizState()?.result ?? null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [canPersistQuiz, setCanPersistQuiz] = useState(true);
  const isSubmitting = useRef(false);
  const lastStep = Math.max(...questions.map((question) => question.step));
  const currentQuestions = questions.filter(
    (question) => question.step === currentStep,
  );
  const allAnswered = currentQuestions.every(
    (question) => answers[question.id] !== undefined,
  );

  const handleChange = (questionId: number, answer: string) => {
    const nextAnswers = { ...answers, [questionId]: answer };
    setCanPersistQuiz(saveQuizState({ currentStep, answers: nextAnswers }));
    setAnswers(nextAnswers);
  };

  const handleNext = async () => {
    if (!allAnswered) return;
    if (currentStep < lastStep) {
      const nextStep = currentStep + 1;
      setCanPersistQuiz(saveQuizState({ currentStep: nextStep, answers }));
      window.scrollTo({ top: 0 });
      setCurrentStep(nextStep);
      return;
    }

    if (isSubmitting.current) return;
    isSubmitting.current = true;
    setIsLoading(true);
    setError(null);
    try {
      const quizResult = await submitQuiz(answers);
      const saved = saveQuizState({ currentStep, answers, result: quizResult });
      setCanPersistQuiz(saved);
      setResult(quizResult);
    } catch (requestError) {
      console.error(requestError);
      setError(getQuizErrorMessage(requestError));
    } finally {
      isSubmitting.current = false;
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    const previousStep = currentStep - 1;
    setCanPersistQuiz(saveQuizState({ currentStep: previousStep, answers }));
    window.scrollTo({ top: 0 });
    setCurrentStep(previousStep);
  };

  const handleRetake = () => {
    setCanPersistQuiz(clearQuizState());
    setCurrentStep(1);
    setAnswers({});
    setResult(null);
    setError(null);
  };

  return {
    currentStep,
    lastStep,
    currentQuestions,
    answers,
    result,
    isLoading,
    error,
    canPersistQuiz,
    allAnswered,
    handleChange,
    handleNext,
    handleBack,
    handleRetake,
    clearError: () => setError(null),
  };
}
