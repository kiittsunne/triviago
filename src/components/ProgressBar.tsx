import { useState, useEffect } from "react";
import { AnswerObject } from "../App";

type ProgressBarProps = {
  lives: number[];
  progress: number;
};

export function ProgressBar({ lives, progress }: ProgressBarProps) {
  return (
    <div className="flex flex-row mt-4 sm:w-550 w-[320px] bg-black p-1">
      <div className="flex sm:w-[458px] w-[266px] bg-yellow-200 p-1">
        <div className="bg-red-300" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="flex flex-row items-center mx-auto justify-around sm:space-x-2">
        {lives.map((live, index) => (
          <div key={index}>💀</div>
        ))}
      </div>
    </div>
  );
}

/**
 * Steps
 * 1. Trigger progress start
 * 2. Increment progress by 10 every 1s
 *
 * If player answers in time
 * 3. Check answer
 * 3a. If correct: next question
 * 3b. If wrong:
 *     3bi. if lives > 0: setLives -1 & next question
 *     3bii. if lives === 0: end game
 *
 * If player does not answer in time
 * 4. Check lives
 * 4a. If lives > 0: setLives -1 & nextquestion
 * 4b. If lives === 0: end game
 *
 * Things to write
 * 1. Fx to trigger progress start when question changes
 * 2. Fx to increment progress by 10 every 1s
 * 3. useEffect if
 *
 */

/**
 * Issues
 * - style: !userClicked so all buttons remain clickable even after answer check
 * nextquestion not firing
 */
