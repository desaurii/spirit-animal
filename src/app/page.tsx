import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-canvas">
      <div className="bg-white rounded-2xl p-8 shadow-md w-full max-w-md flex flex-col items-center">
        <Image
          src="/fox.png"
          alt="Spirit fox"
          width={90}
          height={90}
          className="mb-4"
        />
        <h1 className="mb-3 text-center text-4xl font-semibold text-pine-dark">
          What’s Your Spirit Animal?
        </h1>
        <p className="mb-6 text-center text-forest">
          Discover your spirit animal based on your personality.
        </p>
        <Link
          href="/quiz"
          className="rounded-lg bg-forest px-6 py-3 text-white
          hover:bg-olive
          focus:outline-none focus-visible:ring-2 focus-visible:ring-olive focus-visible:ring-offset-2"
        >
          Start Quiz
        </Link>
      </div>
    </main>
  );
}
