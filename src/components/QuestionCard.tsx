import { FC, MouseEvent } from "react";
// types
import { AnswerObject } from "../App";

type Props = {
  question: string;
  answers: string[];
  callback: (e: MouseEvent<HTMLButtonElement>) => void;
  userInput: AnswerObject | undefined;
  questionNum: number;
  totalQuestions: number;
};

const QuestionCard: FC<Props> = (props: Props) => {
  return (
    <div>
      <div>
        <p>
          Question: {props.questionNum} / {props.totalQuestions}
        </p>
        <h3>{props.question}</h3>
      </div>
      <div className="flex flex-col w-60">
        {props.answers.map((answer) => (
          <button
            // className={`${props.userInput?.correctAnswer === answer ? "bg-lime-300 text-black" : "bg-red-300 text-white"} ${props.userInput?.userInput === answer ? "bg-lime-300 text-black" : "bg-red-300 text-white"}`}
            className="border border-slate-300 m-1"
            key={answer}
            disabled={!!props.userInput}
            value={answer}
            onClick={props.callback}
          >
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
