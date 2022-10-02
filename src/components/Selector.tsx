import { useState, useEffect, MouseEvent } from "react";

export type SelectorOption = {
  name: string;
  value: string;
};

// type SelectorProps = {
//   id: string;
//   options: SelectorOption[];
//   updateInput: (value: SelectorOption[]) => void;
//   display: SelectorOption[];
// };

type SingleSelectorProps = {
  multiple: false;
  updateInput: (value: SelectorOption) => void;
  display: SelectorOption;
};

type MultipleSelectorProps = {
  multiple: true;
  updateInput: (value: SelectorOption[]) => void;
  display: SelectorOption[];
};

type SelectorProps = {
  id: string;
  options: SelectorOption[];
} & (SingleSelectorProps | MultipleSelectorProps);

export function Selector({
  id,
  options,
  multiple,
  updateInput,
  display,
}: SelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  useEffect(() => {
    isOpen && setHighlight(0);
  }, [isOpen]);
  function selectOptions(value: SelectorOption) {
    if (multiple) {
      display.find((option) => option.name === value.name)
        ? updateInput(
            display.filter((option) => {
              return option.name !== value.name;
            })
          )
        : updateInput([...display, value]);
    } else {
      display.name !== value.name && updateInput(value);
    }
  }
  function clearOptions() {
    multiple ? updateInput([]) : updateInput({ name: "Difficulty", value: "" });
  }
  return (
    <div
      className="
    w-200 relative min-h-1.5 border border-slate-300 flex items-center gap-2 p-2 rounded outline-white"
      onClick={() => setIsOpen((prev) => !prev)}
      onBlur={() => setIsOpen(false)}
      tabIndex={0}
    >
      <span className="grow">
        {multiple ? (
          <>
            {!display.length
              ? id
              : display.map((option) => (
                  <button
                    key={option.value}
                    onClick={(e: MouseEvent) => {
                      e.stopPropagation();
                      selectOptions(option);
                    }}
                  >
                    {option.name}
                    <span>&times;</span>
                  </button>
                ))}
          </>
        ) : (
          display?.name
        )}
      </span>
      <button
        className="bg-transparent text-slate-400 border-0 outline-white cursor-pointer p-0 hover:text-slate-800"
        onClick={(e: MouseEvent) => {
          e.stopPropagation();
          clearOptions();
        }}
      >
        &times;
      </button>
      <div className="self-stretch bg-slate-400 w-px "></div>
      <div
        style={{
          translate: "0 40%",
          border: "0.25em solid transparent",
          borderTopColor: "#93a4b9",
          cursor: "pointer",
        }}
      ></div>
      <ul
        className={`absolute m-0 p-0 max-h-60 overflow-y-auto border rounded w-200 bg-white left-0 z-50 ${
          isOpen ? "block" : "hidden"
        }`}
        style={{ top: "calc(100% + 0.25em)" }}
      >
        {options.map((option, index) => (
          <li
            key={option.value}
            className={`pt-1 pl-1.5 pe-2 cursor-pointer ${
              index === highlight && "bg-slate-100"
            }`}
            onMouseEnter={() => setHighlight(index)}
            onClick={(e: MouseEvent) => {
              e.stopPropagation();
              selectOptions(option);
            }}
          >
            {option.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
