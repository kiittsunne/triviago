import { useState, useRef } from "react";
import SlotMachineDoor from "./SlotMachineDoor";

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
  function addTagInputs(tag: string) {
    tagInputs.current.push(tag);
  }
  function reset() {
    setIsStartQuiz(false);
    setIsSpin(false);
    tagInputs.current = [];
  }

  return (
    <div className="flex flex-col h-60 items-center justify-center space-y-12">
      <div className="flex flex-row h-28 w-96 justify-around">
        <SlotMachineDoor
          isSpin={isSpin}
          addTagInputs={addTagInputs}
          delay={0}
        />
        <SlotMachineDoor
          isSpin={isSpin}
          addTagInputs={addTagInputs}
          delay={0.08}
        />
        <SlotMachineDoor
          isSpin={isSpin}
          addTagInputs={addTagInputs}
          delay={0.16}
        />
      </div>
      <div className="flex flex-row w-48 justify-around">
        {isStartQuiz ? (
          <button
            className="outline outline-offset-2 outline-slate-400 rounded-md px-4 py-1 hover:bg-slate-400 hover:text-white hover:font-semibold"
            onClick={() => {
              let tagInput = Array.from(new Set(tagInputs.current)).join(",");
              startQuiz(tagInput);
            }}
          >
            Go
          </button>
        ) : (
          <button
            className="outline outline-offset-2 outline-slate-400 rounded-md px-4 py-1 hover:bg-slate-400 hover:text-white hover:font-semibold"
            onClick={spin}
          >
            Play
          </button>
        )}
        <button
          className="outline outline-offset-2 outline-slate-400 rounded-md px-4 py-1 hover:bg-slate-400 hover:text-white hover:font-semibold"
          onClick={reset}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
