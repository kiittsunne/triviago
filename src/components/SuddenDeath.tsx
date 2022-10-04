export function SuddenDeath({ startQuiz }: { startQuiz: () => void }) {
  return (
    <div className="h-max flex flex-col justify-center items-center mt-12 text-center">
      <p className="text-2xl font-black">30 Questions</p>
      <p className="text-xl my-2 font-semibold">10s Per Question</p>
      <p className="text-xl font-semibold">3 Lives</p>
      <button
        className="mt-8 outline outline-offset-2 outline-slate-400 rounded-md px-4 py-1 hover:bg-slate-400 hover:text-white hover:font-semibold"
        onClick={startQuiz}
      >
        💀💀💀
      </button>
    </div>
  );
}
