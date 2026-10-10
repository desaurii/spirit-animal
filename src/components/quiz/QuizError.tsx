type QuizErrorProps = {
  message: string;
  onRetry: () => void;
};

export default function QuizError({ message, onRetry }: QuizErrorProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-canvas px-4">
      <div className="w-full max-w-xl rounded-2xl bg-white p-8 text-center shadow-md">
        <p className="mb-6 text-pine-dark">{message}</p>
        <button
          onClick={onRetry}
          className="rounded-lg bg-forest px-6 py-3 text-white hover:bg-olive focus:outline-none focus-visible:ring-2 focus-visible:ring-olive focus-visible:ring-offset-2"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
