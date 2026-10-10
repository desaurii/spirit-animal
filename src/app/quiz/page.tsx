"use client";

import dynamic from "next/dynamic";

const Quiz = dynamic(() => import("../../components/quiz/Quiz"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen items-center justify-center gap-2 bg-canvas text-forest">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-forest border-t-transparent" />
      Loading...
    </div>
  ),
});

export default function QuizPage() {
  return <Quiz />;
}
