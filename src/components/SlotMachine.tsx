import { useState, useRef } from "react";
import { tags } from "../data/data.json";
import { shuffleTags } from "../utils/shuffleTags";

export function SlotMachine({
  startQuiz,
}: {
  startQuiz: (tags: string) => void;
}) {
  const [isSpin, setIsSpin] = useState(false);
  const [isStartQuiz, setIsStartQuiz] = useState(false);
  const tagInputs = useRef<string[]>([]);
  function spin() {
    setIsStartQuiz(true);
    setIsSpin(true);
  }
  function reset() {
    setIsStartQuiz(false);
    setIsSpin(false);
    tagInputs.current = [];
  }

  return (
    <div className="flex flex-col bg-slate-200 h-52 items-center justify-center">
      <div className="flex flex-row h-28 w-96 justify-around mb-4">
        <div className="w-24 bg-white overflow-y-hidden">
          <div
            className="flex flex-col items-center "
            id="doorOne"
            style={
              !isSpin
                ? {}
                : {
                    transform: `translateY(-${112.05 * tags.length}px)`,
                    transitionDuration: "1.5s",
                  }
            }
            onTransitionEnd={() => {
              const nodes = document.getElementById("doorOne")?.children;
              const last = nodes && nodes[nodes.length - 1]?.id;
              tagInputs.current.push(`${last}`);
            }}
          >
            <span className="w-24 h-28 text-center align-center pt-9 text-4xl">
              ❓
            </span>
            {shuffleTags(tags).map((tag) => (
              <span
                key={tag.query}
                id={tag.query}
                className="w-24 h-28 text-center align-center pt-9 text-4xl"
                style={isSpin ? { filter: `blur(1)` } : { filter: `blur(0)` }}
              >
                {tag.sprite}
              </span>
            ))}
          </div>
        </div>
        <div className="w-24 bg-white overflow-y-hidden">
          <div
            className="flex flex-col items-center "
            id="doorTwo"
            style={
              !isSpin
                ? {}
                : {
                    transform: `translateY(-${112.05 * tags.length}px)`,
                    transitionDuration: "1.5s",
                    transitionDelay: "0.08s",
                  }
            }
            onTransitionEnd={() => {
              const nodes = document.getElementById("doorTwo")?.children;
              const last = nodes && nodes[nodes.length - 1]?.id;
              tagInputs.current.push(`${last}`);
            }}
          >
            <span className="w-24 h-28 text-center align-center pt-9 text-4xl">
              ❓
            </span>
            {shuffleTags(tags).map((tag) => (
              <span
                key={tag.query}
                id={tag.query}
                className="w-24 h-28 text-center align-center pt-9 text-4xl"
                style={isSpin ? { filter: `blur(1)` } : { filter: `blur(0)` }}
              >
                {tag.sprite}
              </span>
            ))}
          </div>
        </div>
        <div className="w-24 bg-white overflow-y-hidden">
          <div
            className="flex flex-col items-center "
            id="doorThree"
            style={
              !isSpin
                ? {}
                : {
                    transform: `translateY(-${112.05 * tags.length}px)`,
                    transitionDuration: "1.5s",
                    transitionDelay: "0.16s",
                  }
            }
            onTransitionEnd={() => {
              const nodes = document.getElementById("doorThree")?.children;
              const last = nodes && nodes[nodes.length - 1]?.id;
              tagInputs.current.push(`${last}`);
            }}
          >
            <span className="w-24 h-28 text-center align-center pt-9 text-4xl">
              ❓
            </span>
            {shuffleTags(tags).map((tag) => (
              <span
                key={tag.query}
                id={tag.query}
                className="w-24 h-28 text-center align-center pt-9 text-4xl"
                style={isSpin ? { filter: `blur(1)` } : { filter: `blur(0)` }}
              >
                {tag.sprite}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-row">
        {isStartQuiz ? (
          <button
            className="mx-1  bg-slate-500 text-white"
            onClick={() => {
              let tagInput = Array.from(new Set(tagInputs.current)).join(",");
              startQuiz(tagInput);
            }}
          >
            Go
          </button>
        ) : (
          <button className="mx-1 border border-slate-300" onClick={spin}>
            Play
          </button>
        )}
        <button className="mx-1 border border-slate-300" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}
