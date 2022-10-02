import { useState, FormEvent } from "react";
// components
import { Selector, SelectorOption } from "./Selector";
// data
import { categories, difficulty } from "../data/data.json";
// types

export type formInputTypes = {
  limit: number;
  difficulty: SelectorOption;
  categories: SelectorOption[];
};

export function NormalQuiz({
  startQuiz,
}: {
  startQuiz: (
    categories: SelectorOption[] | [],
    difficulty: SelectorOption,
    limit: number
  ) => void;
}) {
  /* #region   */
  const [categoryInput, setCategoryInput] = useState<
    formInputTypes["categories"]
  >([]);
  const [difficultyInput, setDifficultyInput] = useState<
    formInputTypes["difficulty"]
  >({ name: "Difficulty", value: "" });
  const [limitInput, setLimitInput] = useState<formInputTypes["limit"]>(5);
  /* #endregion */

  return (
    <div className="h-180 flex flex-col items-center justify-around m-2">
      <h1>normal quiz</h1>
      {/* category multiselect */}
      <Selector
        id={"Categories"}
        multiple={true}
        display={categoryInput}
        options={categories}
        updateInput={setCategoryInput}
      />
      {/* difficulty multiselect */}
      <Selector
        id={"Difficulty"}
        multiple={false}
        display={difficultyInput}
        options={difficulty}
        updateInput={setDifficultyInput}
      />
      {/* number of qns selector */}
      <div className="w-200 min-h-1.5 flex flex-row justify-between">
        <label htmlFor="limit" className="ml-2">
          Limit
        </label>
        <input
          type="range"
          name="limit"
          id="limit"
          min={5}
          max={20}
          step={1}
          value={limitInput}
          className="w-60"
          onInput={(e: FormEvent<HTMLInputElement>) => {
            setLimitInput(parseInt(e.currentTarget.value));
          }}
        />
        <span>{limitInput}</span>
      </div>
      <button
        className="border border-slate-400 rounded-full px-4 py-1 hover:bg-slate-400 hover:text-white"
        onClick={() => {
          startQuiz(categoryInput, difficultyInput, limitInput);
        }}
      >
        Go!
      </button>
    </div>
  );
}
