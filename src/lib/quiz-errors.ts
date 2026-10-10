const messages = {
  "invalid-answers":
    "Your answers could not be validated. Please review them and try again.",
  "rate-limited": "Too many attempts. Please wait a moment and try again.",
  server: "Your result could not be generated. Please try again later.",
  network: "Could not connect to the server. Check your connection and try again.",
  "invalid-response":
    "The server returned an unexpected result. Please try again.",
} as const;

export type QuizRequestErrorCode = keyof typeof messages;

export class QuizRequestError extends Error {
  constructor(public readonly code: QuizRequestErrorCode) {
    super(messages[code]);
    this.name = "QuizRequestError";
  }
}

export function getQuizErrorMessage(error: unknown) {
  if (error instanceof QuizRequestError) return error.message;
  return "Failed to get your result. Please try again.";
}
