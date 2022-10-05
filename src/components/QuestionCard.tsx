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
    <div className="flex flex-col items-center text-center sm:space-y-4 space-y-2 mt-4 sm:w-550 w-92">
      <div className="sm:w-full w-5/6">
        <div className="flex flex-row justify-between">
          <p>
            Question: {props.questionNum} / {props.totalQuestions}
          </p>
          <p>
            Score: {props.score} / {props.totalQuestions}
          </p>
        </div>
        <h3
          className={`
        sm:font-bold 
        sm:my-4 
        
        mt-2
        text-${props.question.length > 80 ? "sm" : "md"}

        `}
        >
          {props.question}
        </h3>
      </div>
      <div
        className="
        h-max
        flex 
        items-center
        justify-center
        box-border
        flex-wrap
        w-full
        sm:flex-nowrap
        sm:space-x-4 
        sm:min-h-24
        "
        onClick={() => {
          props.setUserClicked(true);
        }}
      >
        {props.answers.map((answer) => (
          <button
            className={`
            border 
            border-slate-300 
            w-1/3
            m-2
            min-h-[6em]
            text-xs
            p-1
            sm:m-0
            self-stretch 
            rounded-md 
            sm:p-1.5 
            sm:w-1/4
            sm:text-md 
            
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
