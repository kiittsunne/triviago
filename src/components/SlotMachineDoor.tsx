import { TransitionEvent } from "react";
import { shuffleTags } from "../utils/shuffleTags";
import { tags } from "../data/data.json";

type Props = {
  isSpin: boolean;
  addTagInputs: (tag: string) => void;
  delay: number;
};

const SlotMachineDoor = ({ isSpin, addTagInputs, delay }: Props) => {
  return (
    <div className="w-max w-24 bg-white border border-slate-400 rounded-lg overflow-y-hidden overflow-x-clip">
      <div
        className="flex flex-col items-center"
        style={
          !isSpin
            ? {}
            : {
                transform: `translateY(-${112.05 * tags.length}px)`,
                transitionDuration: "1.5s",
                transitionDelay: `${delay}s`,
              }
        }
        onTransitionEnd={(e: TransitionEvent) => {
          const nodes = e.currentTarget.children;
          const last = nodes && nodes[nodes.length - 1]?.id;
          addTagInputs(`${last}`);
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
  );
};

export default SlotMachineDoor;
