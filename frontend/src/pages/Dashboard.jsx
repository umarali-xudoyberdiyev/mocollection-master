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

    if (!form.title.trim() || !form.davlat.trim()) {
      toast.warning("Sarlavha va davlat to'ldirilishi shart");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        title: form.title.trim(),
        description: form.description.trim() || undefined,
        imageUrl: form.imageUrl.trim() || undefined,
        davlat: form.davlat.trim(),
        maslahatBeraman: form.maslahatBeraman,
      };

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
      description: davlat.description || "",
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
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Tog'larim</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-sm border p-6 mb-8 space-y-4"
      >
        <h2 className="text-lg font-semibold">
          {editingId ? "Tog'ni tahrirlash" : "Yangi tog' qo'shish"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Nomi *"
            className="border rounded-lg px-4 py-2 w-full"
          />
        </div>

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Tavsif"
          rows="2"
          className="border rounded-lg px-4 py-2 w-full resize-none"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="Rasm URL"
            className="border rounded-lg px-4 py-2 w-full"
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="maslahatBeraman"
            checked={form.maslahatBeraman}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <label className="text-sm">Maslahat beraman</label>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? "Saqlanmoqda..." : editingId ? "Saqlash" : "Qo'shish"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={handleCancel}
              className="border px-6 py-2 rounded-lg"
            >
              Bekor qilish
            </button>
          )}
        </div>
      </form>

      {loading && <p className="text-center py-8">Yuklanmoqda...</p>}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-4">
          {error}
        </div>
      )}

      {!loading && !error && davlatlar.length === 0 && (
        <div class="flex flex-col items-center border-1 rounded-xl">
          <img
            src={HeroImage}
            alt="Travel and tour illustration"
            class="w-1/2 md:w-1/3 lg:w-1/4 h-auto object-contain mx-auto py-5"
          />
          <p class="mt-4 text-center text-gray-700">
            Hozircha tog'lar yo'q. Birinchisini qo'shing!
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
