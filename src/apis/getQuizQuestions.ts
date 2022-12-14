import { SelectorOption } from "../components/Selector";
import { shuffleArray } from "../utils/shuffleArray";

export type Question = {
  category: string;
  id: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  question: string;
  tags: string[];
  type: string;
  difficulty: string;
  regions: any[];
};

export type QuestionState = Question & { answers: string[] };

export const getNormalQuizQuestions = async (
  categories: SelectorOption[],
  difficulty: SelectorOption,
  limit: number
) => {
  let categoryQuery = !categories.length
    ? ""
    : `categories=${categories.map((category) => category.value).join(",")}&`;

  let difficultyQuery = !difficulty.value
    ? ""
    : `difficulty=${difficulty.value}&`;

  const endpoint = `https://the-trivia-api.com/api/questions?${categoryQuery}${difficultyQuery}limit=${limit}`;

  const data = await (await fetch(endpoint)).json();
  return data.map((question: Question) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrectAnswers,
      question.correctAnswer,
    ]),
  }));
};

export const getSlotMachineQuestions = async (tags: string) => {
  const endpoint = `https://the-trivia-api.com/api/questions?limit=12&tags=${tags}`;

  const data = await (await fetch(endpoint)).json();
  return data.map((question: Question) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrectAnswers,
      question.correctAnswer,
    ]),
  }));
};

export const getSuddenDeathQuestions = async () => {
  const endpoint = `https://the-trivia-api.com/api/questions?limit=30&difficulty=hard`;

  const data = await (await fetch(endpoint)).json();
  return data.map((question: Question) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrectAnswers,
      question.correctAnswer,
    ]),
  }));
};
