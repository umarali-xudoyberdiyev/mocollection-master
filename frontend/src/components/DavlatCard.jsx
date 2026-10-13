function DavlatCard({ davlat, onEdit, onDelete }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-md shadow-slate-200/50 dark:shadow-black/30 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
      <div>
        {davlat.imageUrl && (
          <div className="relative w-full h-48 bg-slate-100 dark:bg-slate-700 overflow-hidden">
            <img
              src={davlat.imageUrl}
              alt={davlat.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>
        )}

        <div className="p-5 space-y-3">
          {davlat.location && (
            <span className="text-[11px] font-bold tracking-wider text-[#1F6E63] dark:text-emerald-400 uppercase block">
              {davlat.location}
            </span>
          )}

          <h3 className="text-2xl font-extrabold text-[#22344F] dark:text-slate-100 leading-tight">
            {davlat.title}
          </h3>

          {davlat.description && (
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3 font-normal">
              {davlat.description}
            </p>
          )}

          {davlat.size && (
            <div className="pt-2 text-xs font-semibold text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-700">
              {davlat.size} KM
            </div>
          )}
        </div>
      </div>

      <div className="p-5 pt-0">
        <div className="flex gap-2 pt-3 border-t border-slate-100 dark:border-slate-700">
          <button
            onClick={() => onEdit(davlat)}
            className="flex-1 bg-[#F5F4EE] dark:bg-slate-700 hover:bg-[#1F6E63] dark:hover:bg-[#1F6E63] text-[#22344F] dark:text-slate-100 hover:text-white font-bold py-2.5 px-3 rounded-xl text-xs uppercase tracking-wider transition-all duration-200 shadow-sm"
          >
            Tahrirlash
          </button>
          <button
            onClick={() => onDelete(davlat.id)}
            className="flex-1 border border-[#E30A17]/30 text-[#E30A17] dark:text-red-400 hover:bg-[#E30A17] hover:text-white font-bold py-2.5 px-3 rounded-xl text-xs uppercase tracking-wider transition-all duration-200 shadow-sm"
          >
            O'chirish
          </button>
        </div>
      </div>
    </div>
  );
}

export default DavlatCard;
