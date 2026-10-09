function DavlatCard({ davlat, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden hover:shadow-md transition">
      {davlat.imageUrl && (
        <img
          src={davlat.imageUrl}
          alt={davlat.title}
          className="w-full h-40 object-cover"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      )}

      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start gap-2">
          <div>
            <h3 className="text-lg font-semibold">{davlat.title}</h3>
          </div>
        </div>

        {davlat.description && (
          <p className="text-sm text-gray-700 line-clamp-2">
            {davlat.description}
          </p>
        )}

        <div className="flex gap-2 pt-2 border-t">
          <button
            onClick={() => onEdit(davlat)}
            className="flex-1 border rounded-lg py-2 text-sm hover:bg-gray-50"
          >
            Tahrirlash
          </button>
          <button
            onClick={() => onDelete(davlat.id)}
            className="flex-1 border border-red-200 text-red-600 rounded-lg py-2 text-sm hover:bg-red-50"
          >
            O'chirish
          </button>
        </div>
      </div>
    </div>
  );
}

export default DavlatCard;
