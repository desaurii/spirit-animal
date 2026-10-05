"use client";

import dynamic from "next/dynamic";

const Quiz = dynamic(() => import("../../components/quiz/Quiz"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen items-center justify-center gap-2 bg-[#D2D3B4] text-[#3C5A3A]">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#3C5A3A] border-t-transparent" />
      Loading...
    </div>
  ),
});

export default function QuizPage() {
  return <Quiz />;
}
