import { useState, useEffect } from "react";
import { toast } from "sonner";
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
        location: form.location.trim(),
        description: form.description.trim() || "",
        size: form.size || 0.0,
        imageUrl: form.imageUrl.trim() || "",
        maslahatBeraman: form.maslahatBeraman || true,
      };

      console.log("payload", payload);

      if (editingId) {
        const updated = await updateDavlat(editingId, payload);
        setDavlatlar((prev) =>
          prev.map((m) => (m.id === editingId ? updated : m)),
        );
        toast.success("Tog' yangilandi");
      } else {
        const created = await createDavlat(payload);
        setDavlatlar((prev) => [created, ...prev]);
        toast.success("Tog' qo'shildi");
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
      size: davlat.size || 0.0,
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
    if (!window.confirm("Bu tog'ni o'chirishni tasdiqlaysizmi?")) return;

    try {
      await deleteDavlat(id);
      setDavlatlar((prev) => prev.filter((m) => m.id !== id));
      toast.success("Tog' o'chirildi");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 font-sans">
      <h1 className="text-4xl font-extrabold text-slate-800 mb-8 tracking-tight flex items-center gap-2">
        Tog'larim
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-8 mb-10 space-y-6 backdrop-blur-sm transition-all"
      >
        <h2 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-3">
          {editingId ? "Tog'ni tahrirlash" : "Yangi tog' qo'shish"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Nomi"
            className="border border-slate-200 rounded-xl px-4 py-3 w-full bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200"
          />
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Yevropa"
            className="border border-slate-200 rounded-xl px-4 py-3 w-full bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200"
          />
        </div>

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Tavsif"
          rows="2"
          className="border border-slate-200 rounded-xl px-4 py-3 w-full resize-none bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input
            type="text"
            name="size"
            value={form.size}
            onChange={handleChange}
            placeholder="449.700.000km"
            className="border border-slate-200 rounded-xl px-4 py-3 w-full bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200"
          />
          <input
            type="text"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="Rasm URL"
            className="border border-slate-200 rounded-xl px-4 py-3 w-full bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200"
          />
        </div>

        <div className="flex items-center gap-3 py-1">
          <input
            type="checkbox"
            id="maslahatBeraman"
            name="maslahatBeraman"
            checked={form.maslahatBeraman}
            onChange={handleChange}
            className="w-5 h-5 rounded-md text-emerald-600 focus:ring-emerald-500/30 border-slate-300 cursor-pointer transition-all"
          />
          <label
            htmlFor="maslahatBeraman"
            className="text-sm font-medium text-slate-700 cursor-pointer select-none"
          >
            Maslahat beraman
          </label>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-emerald-600 text-white font-medium px-7 py-3 rounded-xl hover:bg-emerald-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-600/20 transition-all duration-200"
          >
            {saving ? "Saqlanmoqda..." : editingId ? "Saqlash" : "Qo'shish"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={handleCancel}
              className="border border-slate-200 text-slate-600 font-medium px-7 py-3 rounded-xl hover:bg-slate-100 hover:text-slate-800 active:scale-95 transition-all duration-200"
            >
              Bekor qilish
            </button>
          )}
        </div>
      </form>

      {loading && (
        <div className="text-center py-12">
          <p className="text-slate-500 font-medium animate-pulse">
            Yuklanmoqda...
          </p>
        </div>
      )}

      {error && (
        <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-700 rounded-2xl p-4 mb-6 shadow-sm">
          {error}
        </div>
      )}

      {!loading && !error && davlatlar.length === 0 && (
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-3xl p-10 bg-slate-50/50 text-center">
          <img
            src={HeroImage}
            alt="Travel and tour illustration"
            className="w-1/2 md:w-1/3 lg:w-1/4 h-auto object-contain mx-auto mb-4 opacity-90 drop-shadow-md"
          />
          <p className="text-slate-600 font-medium text-lg">
            Hozircha tog'lar yo'q. Birinchisini qo'shing!
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {davlatlar.map((davlat) => (
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
