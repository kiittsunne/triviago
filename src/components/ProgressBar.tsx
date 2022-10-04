type ProgressBarProps = {
  lives: number[];
  progress: number;
};

export function ProgressBar({ lives, progress }: ProgressBarProps) {
  return (
    <div className="flex flex-row mt-4 w-550 bg-black p-1">
      <div className="flex w-[458px] bg-yellow-200 p-1">
        <div className="bg-red-300" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="flex flex-row items-center mx-auto space-x-2">
        {lives.map((live, index) => (
          <div key={index}>💀</div>
        ))}
      </div>
    </div>
  );
}
