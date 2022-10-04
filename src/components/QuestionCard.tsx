import { FC, MouseEvent } from "react";
// types
import { AnswerObject } from "../App";

type Props = {
  question: string;
  answers: string[];
  callback: (e: MouseEvent<HTMLButtonElement>) => void;
  userSubmission: AnswerObject | undefined;
  questionNum: number;
  totalQuestions: number;
  score: number;
  userClicked: boolean;
  setUserClicked: React.Dispatch<React.SetStateAction<boolean>>;
  quizType: string;
  progress: number;
  maxProgress: number;
};

const QuestionCard: FC<Props> = (props: Props) => {
  return (
    <div className="flex flex-col items-center text-center space-y-4 mt-4 w-550">
      <div className="w-full">
        <div className="flex flex-row justify-between">
          <p>
            Question: {props.questionNum} / {props.totalQuestions}
          </p>
          <p>
            Score: {props.score} / {props.totalQuestions}
          </p>
        </div>
        <h3 className="font-bold my-4">{props.question}</h3>
      </div>
      <div
        className="flex items-center justify-center box-border space-x-4 w-full h-max min-h-24"
        onClick={() => {
          props.setUserClicked(true);
        }}
      >
        {props.answers.map((answer) => (
          <button
            className={`
            border 
            border-slate-300 
            w-1/4 
            self-stretch 
            rounded-md 
            p-1.5 
            
            ${
              !props.userClicked &&
              props.progress !== props.maxProgress &&
              "hover:text-white hover:bg-slate-400"
            }

            ${
              props.userClicked
                ? props.userSubmission?.correctAnswer === answer
                  ? "cursor bg-lime-400 text-white"
                  : props.userSubmission?.userInput === answer
                  ? "cursor bg-red-400 text-white"
                  : "cursor bg-slate-400 disabled:opacity-50"
                : ""
            }

            // if sudden death quiz times out and user has not submitted an answer, reveal the correct answer

            ${
              props.quizType === "death"
                ? props.progress === props.maxProgress && !props.userClicked
                  ? props.userSubmission?.correctAnswer === answer
                    ? "cursor-default bg-lime-400 text-white"
                    : "cursor-default bg-slate-400 opacity-50"
                  : ""
                : ""
            }

            `}
            key={answer}
            value={answer}
            disabled={props.userClicked}
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
