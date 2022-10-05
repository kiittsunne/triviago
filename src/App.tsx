import { useState, MouseEvent, useEffect } from "react";

// components
import { NormalQuiz } from "./components/NormalQuiz";
import { SlotMachine } from "./components/SlotMachine";
import { SuddenDeath } from "./components/SuddenDeath";
import { SelectorOption } from "./components/Selector";
import QuestionCard from "./components/QuestionCard";
import { QuizTypeButton } from "./components/QuizTypeButton";
// api
import {
  QuestionState,
  getNormalQuizQuestions,
  getSlotMachineQuestions,
  getSuddenDeathQuestions,
} from "./apis/getQuizQuestions";
//data
import { QuizTypeButtonData } from "./data/data.json";
import { ProgressBar } from "./components/ProgressBar";

export type quizTypeProps = {
  setLoading: (val: boolean) => void;
  setGameStart: (val: boolean) => void;
};

export type AnswerObject = {
  question: string;
  userInput: string | null;
  correct: boolean | null;
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

  // states for Sudden Death variant
  const [lives, setLives] = useState<number[]>([]);
  const [progress, setProgress] = useState(-1);
  const [suddenDeath, setSuddenDeath] = useState(false);
  const MAX_PROGRESS = 100;

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
    setQuizType("normal");
  };

  const startSlotMachineQuiz = async (tags: string) => {
    setIsLoading(true);
    setGameOver(false);

    const startSlotMachineQuiz = await getSlotMachineQuestions(tags);

    setQuestions(startSlotMachineQuiz);
    setScore(0);
    setUserInput([]);
    setNumber(0);
    setQuizType("lucky");
    setUserClicked(false);
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
    setUserClicked(false);
    setQuizType("death");
    setLives([1, 1, 1]);
    setProgress(0);
  };

  const checkAnswer = (e?: MouseEvent<HTMLButtonElement>) => {
    if (e && !gameOver) {
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

      // gameover check for sudden death

      if (quizType === "death") {
        if (!correct) {
          let newLives = lives;
          newLives.pop();
          setLives(newLives);

          !lives.length ? setSuddenDeath(true) : setTimeout(nextQuestion, 1000);
        } else {
          setTimeout(nextQuestion, 1000);
        }
      }
    } else if (!e && !gameOver) {
      // this is for suddendeath variation

      // update answerObject with null userInput
      const answerObject = {
        question: questions[number].question,
        userInput: null,
        correct: null,
        correctAnswer: questions[number].correctAnswer,
      };
      setUserInput((prev) => [...prev, answerObject]);
      let newLives = lives;
      newLives.pop();
      setLives(newLives);
      !lives.length ? setSuddenDeath(true) : setTimeout(nextQuestion, 1000);
    }
  };

  const nextQuestion = () => {
    setUserClicked(false);

    quizType === "death" && setProgress(0);

    const nextQuestion = number + 1;
    if (nextQuestion !== questions.length) {
      setNumber(nextQuestion);
    }

    quizType === "death" &&
      nextQuestion === questions.length &&
      setSuddenDeath(true);
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

  let timer: number | undefined;
  function updateProgress() {
    if (!timer) {
      timer = setInterval(() => {
        console.log("tick");
        setProgress((prev) => (prev += 10));
      }, 1000);
    }

    if (userClicked && progress < MAX_PROGRESS) {
      timer && clearInterval(timer);
    }
    if (!userClicked && progress === MAX_PROGRESS) {
      checkAnswer();
      timer && clearInterval(timer);
    }
  }
  useEffect(() => {
    if (quizType === "death") updateProgress();
    return () => clearInterval(timer);
  }, [progress]);

  return (
    <div className="my-40 h-fit p-4 box-border w-screen">
      <h1
        className="cursor-pointer font-black text-center text-7xl"
        onClick={killQuiz}
      >
        <span className="text-orange-400">TRI</span>
        <span className="text-sky-400">VIA</span>
        <span className="text-lime-400">GO</span>
      </h1>
      {isLoading ? (
        <p className="text-center mt-4">is loading...</p>
      ) : (
        <div className="flex flex-col items-center">
          {gameOver ? (
            <>
              {/* variations of triviago */}
              <div className="mt-4 flex flex-row space-x-4">
                {QuizTypeButtonData.map((button) => (
                  <QuizTypeButton
                    key={button.id}
                    id={button.id}
                    text={button.text}
                    setQuizType={setQuizType}
                    quizType={quizType}
                  />
                ))}
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
                quizType={quizType}
                progress={progress}
                maxProgress={MAX_PROGRESS}
              />
              {quizType !== "death" ? (
                userInput.length === number + 1 && (
                  <>
                    {number !== questions.length - 1 ? (
                      <button
                        onClick={nextQuestion}
                        className="outline outline-offset-2 outline-slate-400 rounded-md px-4 py-1 hover:bg-slate-400 hover:text-white hover:font-semibold mt-6"
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        onClick={killQuiz}
                        className="outline outline-offset-2 outline-lime-400 rounded-md px-4 py-1 hover:bg-lime-400 hover:text-white hover:font-semibold mt-6"
                      >
                        Again!
                      </button>
                    )}
                  </>
                )
              ) : (
                <>
                  {!suddenDeath ? (
                    <ProgressBar lives={lives} progress={progress} />
                  ) : (
                    <button
                      onClick={killQuiz}
                      className="outline outline-offset-2 outline-lime-400 rounded-md px-4 py-1 hover:bg-lime-400 hover:text-white hover:font-semibold mt-6"
                    >
                      {number === questions.length - 1
                        ? "Woah 😳"
                        : "Better Luck Next Time 😏"}
                    </button>
                  )}
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
