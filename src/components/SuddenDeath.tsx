export function SuddenDeath({ startQuiz }: { startQuiz: () => void }) {
  return (
    <div className="h-44 flex flex-col items-center justify-around bg-lime-200">
      <h1>Sudden Death</h1>
      <p>30 Questions. 10s Per Question. 3 Lives.</p>
      <button
        className="border border-slate-400 rounded-full px-4 py-1 hover:bg-slate-400 hover:text-white"
        onClick={startQuiz}
      >
        Go!
      </button>
    </div>
  );
}
