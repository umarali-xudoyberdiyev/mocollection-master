import { useRejim } from "../hooks/useRejim";

function RejimTugmasi() {
  const { rejim, rejimniAlmashtir } = useRejim();
  const qorongi = rejim === "dark";

  return (
    <button
      type="button"
      onClick={rejimniAlmashtir}
      aria-label={qorongi ? "Yorug' rejim" : "Qorong'i rejim"}
      title={qorongi ? "Yorug' rejim" : "Qorong'i rejim"}
      className="w-10 h-10 rounded-xl flex items-center justify-center text-lg border border-slate-200 bg-white hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors duration-200"
    >
      {qorongi ? "☀️" : "🌙"}
    </button>
  );
}

export default RejimTugmasi;
