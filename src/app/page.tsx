import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#D2D3B4]">
      <div className="bg-white rounded-2xl p-8 shadow-md w-full max-w-md flex flex-col items-center">
        <Image
          src="/fox.png"
          alt="Spirit fox"
          width={90}
          height={90}
          className="mb-4"
        />
        <h1 className="mb-3 text-center text-4xl font-semibold text-[#1F3B2E]">
          What’s Your Spirit Animal?
        </h1>
        <p className="mb-6 text-center text-[#3C5A3A]">
          Discover your spirit animal based on your personality.
        </p>
        <Link
          href="/quiz"
          className="rounded-lg bg-[#3C5A3A] px-6 py-3 text-white 
          hover:bg-[#6B8E23] 
          focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6B8E23] focus-visible:ring-offset-2"
        >
          Start Quiz
        </Link>
      </div>
    </main>
  );
}
