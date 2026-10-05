import { useEffect, useState } from "react";

function ConnectionStatus() {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    const check = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/health`);
        setStatus(res.ok ? "connected" : "error");
      } catch {
        setStatus("disconnected");
      }
    };
    check();
  }, []);

  const colors = {
    checking: "bg-yellow-500",
    connected: "bg-green-500",
    error: "bg-orange-500",
    disconnected: "bg-red-500",
  };

  const labels = {
    checking: "Tekshirilmoqda...",
    connected: "Backend ulangan",
    error: "Backend xato",
    disconnected: "Backend uzilgan",
  };

  return (
    <div className="fixed bottom-4 right-4 flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-lg text-sm">
      <span className={`w-3 h-3 rounded-full ${colors[status]}`}></span>
      <span>{labels[status]}</span>
    </div>
  );
}

export default ConnectionStatus;
