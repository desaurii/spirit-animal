"use client";

import { useEffect, useState } from "react";
import { questions } from "@/data/questions";
import { submitQuiz } from "@/lib/api";
import type { SpiritAnimalResult } from "@/types/quiz";
import Progress from "@/components/quiz/Progress";
import ResultCard from "@/components/quiz/ResultCard";
import { getQuizState, saveQuizState, clearQuizState } from "@/lib/storage";
import Image from "next/image";

export default function Quiz() {
  const [currentStep, setCurrentStep] = useState(
    () => getQuizState()?.currentStep ?? 1,
  );
  const [answers, setAnswers] = useState<Record<string, string>>(
    () => getQuizState()?.answers ?? {},
  );
  const lastStep = Math.max(...questions.map((question) => question.step));
  const isLastStep = currentStep === lastStep;

  const [result, setResult] = useState<SpiritAnimalResult | null>(null);

  const currentQuestions = questions.filter(
    (question) => question.step === currentStep,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleChange = (questionId: number, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const allAnswered = currentQuestions.every(
    (question) => answers[question.id] !== undefined,
  );

  const handleNext = async () => {
    if (!allAnswered) {
      return;
    }

    if (isLastStep) {
      setIsLoading(true);
      setError(null);

      try {
        const result = await submitQuiz(answers);
        setResult(result);
      } catch (error) {
        console.error(error);
        setError("Failed to get your result. Please try again.");
      } finally {
        setIsLoading(false);
      }

      return;
    }
    window.scrollTo({ top: 0 });
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      window.scrollTo({ top: 0 });
      setCurrentStep(currentStep - 1);
    }
  };

  useEffect(() => {
    saveQuizState({
      currentStep,
      answers,
    });
  }, [currentStep, answers]);

  const handleRetake = () => {
    clearQuizState();
    setCurrentStep(1);
    setAnswers({});
    setResult(null);
    setError(null);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#D2D3B4]">
      {error ? (
        <div className="w-full max-w-xl rounded-2xl bg-white p-8 text-center shadow-md">
          <p className="mb-6 text-[#1F3B2E]">{error}</p>

          <button
            onClick={() => setError(null)}
            className="rounded-lg bg-[#3C5A3A] px-6 py-3 text-white 
            hover:bg-[#6B8E23]
            focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6B8E23] focus-visible:ring-offset-2"
          >
            Try again
          </button>
        </div>
      ) : result ? (
        <ResultCard result={result} onRetake={handleRetake} />
      ) : (
        <div className="bg-white rounded-lg p-6 shadow-sm w-full max-w-2xl">
          <Progress currentStep={currentStep} totalSteps={lastStep} />
          {currentQuestions.map((question) => (
            <div key={question.id} className="mb-8">
              <div className="mb-3 flex items-center gap-2">
                <Image src="/leaf.svg" alt="" width={20} height={20} />

                <h2 className="text-lg font-semibold text-[#1F3B2E]">
                  {question.question}
                </h2>
              </div>

              <div className="flex flex-col gap-3">
                {question.options.map((option) => (
                  <label
                    key={option}
                    className={`flex items-center gap-3 rounded-lg border border-[#6B8E23] p-4 
                      hover:border-[#A3B18A]
                      focus-within:ring-2 focus-within:ring-[#6B8E23] focus-within:ring-offset-2  
                      ${
                        answers[question.id] === option
                          ? "border-[#6B8E23] bg-[#C7D5A6]"
                          : "border-gray-200 bg-white"
                      }`}
                  >
                    <input
                      type="radio"
                      value={option}
                      checked={answers[question.id] === option}
                      onChange={() => handleChange(question.id, option)}
                      className="accent-[#6B8E23] focus:outline-none"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <div className="mt-6 flex items-center justify-between">
            {currentStep > 1 && (
              <button
                onClick={handleBack}
                className="rounded-lg border border-[#3C5A3A] px-6 py-3 text-[#3C5A3A] 
                hover:bg-[#C7D5A6]
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6B8E23] focus-visible:ring-offset-2"
              >
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={!allAnswered || isLoading}
              className="ml-auto rounded-lg bg-[#3C5A3A] px-6 py-3 text-white 
              hover:bg-[#6B8E23]
              focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6B8E23] focus-visible:ring-offset-2 
              disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLastStep ? (
                isLoading ? (
                  <span className="flex items-center gap-2 whitespace-nowrap">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Finding your spirit animal...
                  </span>
                ) : (
                  "Find my spirit animal"
                )
              ) : (
                "Next"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
