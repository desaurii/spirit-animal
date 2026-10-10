What's Your Spirit Animal?

A multi-step personality quiz built with Next.js, React, TypeScript, and Tailwind CSS.

The quiz contains 15 single-choice questions divided into 3 steps. After completing the quiz, the answers are sent to the server, which requests a structured result from the OpenAI API. The result includes a spirit animal, tagline, explanation, strengths, and one thing to watch out for.

Tech stack
Next.js (App Router)
React
TypeScript
Tailwind CSS
Axios
Zod
OpenAI API
Features
15 questions in 3 steps
Single-choice answers with radio buttons
Back / Next navigation
Step progress indicator
Validation before moving to the next step
Loading state during API requests
Error state with retry
Result card with the generated spirit animal
Retake quiz functionality
Quiz progress saved in localStorage
Answers and current step restored after page reload
Runtime validation with Zod
OpenAI API key used only on the server
Getting started

Install dependencies:

npm install

Start the development server:

npm run dev

Open:

http://localhost:3000
Environment variables

Create a .env.local file in the project root:

OPENAI_API_KEY=your_api_key

The API key is used only on the server and should not be committed to Git.

Project structure
src/
  app/
    api/spirit-animal/route.ts
    quiz/page.tsx
    globals.css
    layout.tsx
    page.tsx
  components/quiz/
    Quiz.tsx
    QuizActions.tsx
    QuizContent.tsx
    QuizError.tsx
    QuizQuestion.tsx
    Progress.tsx
    ResultCard.tsx
  data/questions.ts
  lib/
    api.ts
    openai.ts
    quiz-errors.ts
    storage.ts
  types/quiz.ts
How it works
User answers questions
        ↓
Quiz state
        ↓
Axios POST request
        ↓
/api/spirit-animal
        ↓
Server-side validation
        ↓
OpenAI API
        ↓
Structured result
        ↓
ResultCard
Deployment

The application is designed to be deployed to Vercel.

For production, add OPENAI_API_KEY to the project's Environment Variables in Vercel.

Code conventions

- React component files must not exceed 100 lines. ESLint enforces this for TSX and JSX files.
- Nested ternary expressions are prohibited by ESLint. Use a named condition or explicit branches instead.
- Use named Tailwind color tokens from `src/app/globals.css` instead of arbitrary hex colors: `bg-canvas`, `text-pine-dark`, `text-forest`, `bg-olive`, `bg-matcha-latte`, `border-sage`, and `bg-cream`.
- Conditional Tailwind classes should use complete class names in each branch. Dynamically constructing names such as `bg-${color}` prevents Tailwind from detecting and generating those styles.
