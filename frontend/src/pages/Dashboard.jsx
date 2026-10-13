import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { Search, X } from "lucide-react";
import {
  getDavlat,
  createDavlat,
  updateDavlat,
  deleteDavlat,
} from "../api/davlat";
import DavlatCard from "../components/DavlatCard";
import HeroImage from "../img/hero.png";

const EMPTY_FORM = {
  title: "",
  description: "",
  imageUrl: "",
  location: "",
  size: 1.0,
  maslahatBeraman: true,
};

function Dashboard() {
  const [davlatlar, setDavlatlar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [search, setSearch] = useState("");

  const loadDavlatlar = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getDavlat();
      setDavlatlar(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDavlatlar();
  }, []);

  const filteredAndSortedDavlatlar = useMemo(() => {
    const query = search.trim().toLowerCase();
    let list = [...davlatlar];

    if (query) {
      list = list.filter((d) => {
        const title = (d.title || "").toLowerCase();
        const description = (d.description || "").toLowerCase();

        return title.includes(query) || description.includes(query);
      });
    }

    if (sortBy === "alphabet") {
      return list.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    }

    if (sortBy === "size") {
      return list.sort(
        (a, b) => (parseFloat(b.size) || 0) - (parseFloat(a.size) || 0),
      );
    }

    return list;
  }, [davlatlar, sortBy, search]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      toast.warning("Sarlavha to'ldirilishi shart");
      return;
    }

    setSaving(true);

    try {
      const payload = {
        title: form.title.trim(),
        location: form.location.trim() || "",
        description: form.description.trim() || "",
        size: parseFloat(form.size) || 0.0,
        imageUrl: form.imageUrl.trim() || "",
        maslahatBeraman: form.maslahatBeraman,
      };

      if (editingId) {
        const updated = await updateDavlat(editingId, payload);

        setDavlatlar((prev) =>
          prev.map((m) => (m.id === editingId ? updated : m)),
        );

        toast.success("Davlat yangilandi");
      } else {
        const created = await createDavlat(payload);

        setDavlatlar((prev) => [created, ...prev]);

        toast.success("Davlat qo'shildi");
      }

      setForm(EMPTY_FORM);
      setEditingId(null);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (davlat) => {
    setEditingId(davlat.id);

    setForm({
      title: davlat.title || "",
      location: davlat.location || "",
      description: davlat.description || "",
      size: parseFloat(davlat.size) || 0.0,
      imageUrl: davlat.imageUrl || "",
      maslahatBeraman: davlat.maslahatBeraman ?? true,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bu davlatni o'chirishni tasdiqlaysizmi?")) {
      return;
    }

    try {
      await deleteDavlat(id);

      setDavlatlar((prev) => prev.filter((m) => m.id !== id));

      toast.success("Davlat o'chirildi");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const inputClass =
    "border border-slate-200 dark:border-slate-600 rounded-xl px-4 py-3 w-full " +
    "bg-[#F5F4EE]/50 dark:bg-slate-800/80 text-[#22344F] dark:text-slate-100 " +
    "font-medium placeholder-slate-400 dark:placeholder-slate-500 " +
    "focus:bg-white dark:focus:bg-slate-800 focus:outline-none " +
    "focus:ring-2 focus:ring-[#1F6E63]/30 focus:border-[#1F6E63] " +
    "transition-all text-sm";

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 font-sans bg-[#F5F4EE] dark:bg-slate-900 min-h-screen text-[#22344F] dark:text-slate-100 transition-colors duration-300">
      <div className="border-b-2 border-[#1F6E63] dark:border-teal-500 pb-5 mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-extrabold tracking-tight text-[#22344F] dark:text-white flex items-center gap-3">
          <span className="bg-[#1F6E63] dark:bg-teal-600 text-white px-3 py-1 rounded-xl text-2xl shadow-sm">
            🌍
          </span>
          Davlatlar
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-8 mb-6 shadow-lg shadow-slate-200/60 dark:shadow-none space-y-6 transition-colors duration-300"
      >
        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-700 pb-3">
          <div className="w-3.5 h-3.5 rounded-full bg-[#1F6E63] dark:bg-teal-500"></div>
          <h2 className="text-xl font-bold text-[#22344F] dark:text-white">
            {editingId ? "Davlatni tahrirlash" : "Yangi davlat qo'shish"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Davlat nomi (masalan: Yaponiya)"
            className={inputClass}
          />

          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Mintaqa (masalan: SHARQIY OSIYO)"
            className={`${inputClass} uppercase tracking-wider`}
          />
        </div>

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Tavsif"
          rows="3"
          className={`${inputClass} resize-none`}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input
            type="text"
            name="size"
            value={form.size}
            onChange={handleChange}
            placeholder="Maydoni yoki Aholi (sonlarda)"
            className={inputClass}
          />

          <input
            type="text"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="Rasm URL"
            className={inputClass}
          />
        </div>

        <div className="flex items-center gap-3 py-1">
          <input
            type="checkbox"
            id="maslahatBeraman"
            name="maslahatBeraman"
            checked={form.maslahatBeraman}
            onChange={handleChange}
            className="w-5 h-5 rounded-md text-[#1F6E63] focus:ring-[#1F6E63] border-slate-300 dark:border-slate-500 cursor-pointer accent-[#1F6E63]"
          />

          <label
            htmlFor="maslahatBeraman"
            className="text-sm font-semibold text-[#22344F] dark:text-slate-200 cursor-pointer select-none"
          >
            Tavsiya etish
          </label>
        </div>

        <div className="flex items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-[#1F6E63] hover:bg-[#18574e] dark:bg-teal-600 dark:hover:bg-teal-500 text-white font-bold px-8 py-3.5 rounded-xl active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-[#1F6E63]/30 dark:shadow-teal-900/40 transition-all text-xs uppercase tracking-wider"
          >
            {saving ? "Saqlanmoqda..." : editingId ? "Saqlash" : "Qo'shish"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={handleCancel}
              className="border-2 border-slate-200 dark:border-slate-600 text-[#22344F] dark:text-slate-200 font-bold px-8 py-3.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 active:scale-[0.98] transition-all text-xs uppercase tracking-wider"
            >
              Bekor qilish
            </button>
          )}
        </div>
      </form>

      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Qidirish (nomi yoki tavsif)..."
            className="w-full pl-10 pr-10 py-2.5 rounded-full border border-slate-200/80 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium text-[#22344F] dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#1F6E63]/30 focus:border-[#1F6E63] shadow-sm dark:shadow-none transition-all"
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              aria-label="Tozalash"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2.5 bg-white dark:bg-slate-800 px-5 py-2.5 rounded-full border border-slate-200/80 dark:border-slate-700 shadow-sm dark:shadow-none transition-all duration-300 hover:shadow-md shrink-0">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
            Saralash:
          </span>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent text-sm font-extrabold text-[#22344F] dark:text-slate-100 focus:outline-none cursor-pointer appearance-none pr-7 py-1"
          >
            <option value="default">Odatiy</option>
            <option value="alphabet">Alifbo bo'yicha (A-Z)</option>
            <option value="size">Maydoni katta bo'yicha</option>
          </select>
        </div>
      </div>

      {loading && (
        <div className="text-center py-12">
          <p className="text-[#1F6E63] dark:text-teal-400 font-bold animate-pulse text-lg">
            Yuklanmoqda...
          </p>
        </div>
      )}

      {error && (
        <div className="bg-[#E30A17]/10 dark:bg-red-900/30 border-l-4 border-[#E30A17] text-[#E30A17] dark:text-red-400 font-semibold rounded-r-xl p-4 mb-6 text-sm shadow-sm">
          {error}
        </div>
      )}

      {!loading && !error && davlatlar.length === 0 && (
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-2xl p-12 bg-white dark:bg-slate-800 text-center shadow-sm transition-colors duration-300">
          <img
            src={HeroImage}
            alt="Travel illustration"
            className="w-1/3 h-auto object-contain mx-auto mb-4 opacity-80 dark:opacity-70"
          />

          <p className="text-[#22344F] dark:text-slate-200 font-bold text-lg">
            Hozircha davlatlar yo'q. Birinchisini qo'shing!
          </p>
        </div>
      )}

      {!loading &&
        !error &&
        davlatlar.length > 0 &&
        filteredAndSortedDavlatlar.length === 0 && (
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-2xl p-10 bg-white dark:bg-slate-800 text-center shadow-sm transition-colors duration-300">
            <p className="text-[#22344F] dark:text-slate-200 font-bold text-lg">
              «{search}» bo'yicha hech narsa topilmadi
            </p>

            <button
              type="button"
              onClick={() => setSearch("")}
              className="mt-3 text-sm font-semibold text-[#1F6E63] dark:text-teal-400 hover:underline"
            >
              Qidiruvni tozalash
            </button>
          </div>
        )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredAndSortedDavlatlar.map((davlat) => (
          <DavlatCard
            key={davlat.id}
            davlat={davlat}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
