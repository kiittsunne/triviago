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
  const [userClicked, setUserClicked] = useState(false);
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

  const startSlotMachineQuiz = async (tags: string) => {
    setIsLoading(true);
    setGameOver(false);

    const startSlotMachineQuiz = await getSlotMachineQuestions(tags);

    setQuestions(startSlotMachineQuiz);
    setScore(0);
    setUserInput([]);
    setNumber(0);
    setIsLoading(false);
  };

  const startSuddenDeathQuiz = async () => {
    setIsLoading(true);
    setGameOver(false);

    const startSuddenDeathQuiz = await getSuddenDeathQuestions();

    setQuestions(startSuddenDeathQuiz);
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
    setUserClicked(false);
    const nextQuestion = number + 1;

    if (nextQuestion === questions.length) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  const killQuiz = () => {
    setQuizType("normal");
    setUserClicked(false);
    setIsLoading(false);
    setGameOver(true);
    setQuestions([]);
    setScore(0);
    setUserInput([]);
    setNumber(0);
  };

  return (
    <div className="mt-12 h-500">
      <h1 className="cursor-pointer font-black text-center" onClick={killQuiz}>
        Trivia Quiz
      </h1>
      {isLoading ? (
        <p className="text-center mt-4">is loading...</p>
      ) : (
        <div className="flex flex-col items-center">
          {gameOver ? (
            <>
              {/* variations of triviago */}
              <div className="mt-4 flex flex-row space-x-4">
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
              <div className="mt-4">
                {quizType === "lucky" && (
                  <SlotMachine startQuiz={startSlotMachineQuiz} />
                )}
                {quizType === "normal" && (
                  <NormalQuiz startQuiz={startNormalQuiz} />
                )}
                {quizType === "death" && (
                  <SuddenDeath startQuiz={startSuddenDeathQuiz} />
                )}
              </div>
            </>
          ) : (
            <>
              <QuestionCard
                questionNum={number + 1}
                totalQuestions={questions.length}
                question={questions[number]?.question}
                answers={questions[number]?.answers}
                userSubmission={userInput ? userInput[number] : undefined}
                callback={checkAnswer}
                score={score}
                userClicked={userClicked}
                setUserClicked={setUserClicked}
              />
              {userInput.length === number + 1 &&
                number !== questions.length - 1 && (
                  <button onClick={nextQuestion}>Next</button>
                )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
