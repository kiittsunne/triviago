import { useState, MouseEvent, useEffect } from "react";

// components
import { NormalQuiz } from "./components/NormalQuiz";
import { SlotMachine } from "./components/SlotMachine";
import { SuddenDeath } from "./components/SuddenDeath";
import { SelectorOption } from "./components/Selector";
import QuestionCard from "./components/QuestionCard";
// api
import {
  QuestionState,
  getNormalQuizQuestions,
  getSlotMachineQuestions,
  getSuddenDeathQuestions,
} from "./apis/getQuizQuestions";

export type quizTypeProps = {
  setLoading: (val: boolean) => void;
  setGameStart: (val: boolean) => void;
};

export type AnswerObject = {
  question: string;
  userInput: string;
  correct: boolean;
  correctAnswer: string;
};

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [quizType, setQuizType] = useState<string>("normal");
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userInput, setUserInput] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startNormalQuiz = async (
    categories: SelectorOption[] | [],
    difficulty: SelectorOption,
    limit: number
  ) => {
    setIsLoading(true);
    setGameOver(false);

    const startNormalQuiz = await getNormalQuizQuestions(
      categories,
      difficulty,
      limit
    );

    setQuestions(startNormalQuiz);
    setScore(0);
    setUserInput([]);
    setNumber(0);
    setIsLoading(false);
  };

  const checkAnswer = (e: MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // get user answers
      const answer = e.currentTarget.value;

      // check answer against correct answer
      const correct = questions[number].correctAnswer === answer;

      // add score if answer is correct
      if (correct) setScore((prev) => prev + 1);

      // save answer in arr for user answers
      const answerObject = {
        question: questions[number].question,
        userInput: answer,
        correct,
        correctAnswer: questions[number].correctAnswer,
      };
      setUserInput((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    const nextQuestion = number + 1;

    if (nextQuestion === questions.length) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  useEffect(() => {
    console.log(questions);
  }, [questions]);

  return (
    <div>
      <h1>Trivia Quiz</h1>
      {isLoading ? (
        <p>is loading...</p>
      ) : (
        <>
          {gameOver ? (
            <>
              {/* variations of triviago */}
              <div className="flex flex-row space-x-4">
                <button
                  id="lucky"
                  className="outline outline-offset-2 outline-1"
                  onClick={(e: MouseEvent) => setQuizType(e.currentTarget.id)}
                >
                  Feeling Lucky
                </button>
                <button
                  id="normal"
                  className="outline outline-offset-2 outline-1"
                  onClick={(e: MouseEvent) => setQuizType(e.currentTarget.id)}
                >
                  Normal
                </button>
                <button
                  id="death"
                  className="outline outline-offset-2 outline-1"
                  onClick={(e: MouseEvent) => setQuizType(e.currentTarget.id)}
                >
                  Sudden Death
                </button>
              </div>
              {/* selection form container */}
              <div>
                {quizType === "lucky" && <SlotMachine />}
                {quizType === "normal" && (
                  <NormalQuiz startQuiz={startNormalQuiz} />
                )}
                {quizType === "death" && <SuddenDeath />}
              </div>
            </>
          ) : (
            <>
              <QuestionCard
                questionNum={number + 1}
                totalQuestions={questions.length}
                question={questions[number]?.question}
                answers={questions[number]?.answers}
                userInput={userInput ? userInput[number] : undefined}
                callback={checkAnswer}
              />
              {userInput.length === number + 1 &&
                number !== questions.length - 1 && (
                  <button onClick={nextQuestion}>Next</button>
                )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
