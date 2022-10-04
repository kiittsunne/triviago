import { MouseEvent, Dispatch, SetStateAction } from "react";

export function QuizTypeButton({
  id,
  text,
  setQuizType,
  quizType,
}: {
  id: string;
  text: string;
  setQuizType: Dispatch<SetStateAction<string>>;
  quizType: string;
}) {
  return (
    <button
      id={id}
      className={`outline outline-offset-2 outline-stone-100 px-4 py-2 rounded-md ${
        quizType === id && "bg-stone-200 font-semibold"
      }`}
      onClick={(e: MouseEvent) => setQuizType(e.currentTarget.id)}
    >
      {text}
    </button>
  );
}
