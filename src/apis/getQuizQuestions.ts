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
  console.log(data);
  return data.map((question: Question) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrectAnswers,
      question.correctAnswer,
    ]),
  }));
};

