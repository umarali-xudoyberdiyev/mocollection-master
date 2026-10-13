import { useEffect, useState } from "react";

function boshlangichRejim() {
  try {
    const saqlangan = localStorage.getItem("rejim");
    if (saqlangan === "dark" || saqlangan === "light") return saqlangan;
  } catch {}
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function useRejim() {
  const [rejim, setRejim] = useState(boshlangichRejim);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", rejim === "dark");
    try {
      localStorage.setItem("rejim", rejim);
    } catch {}
  }, [rejim]);

  const rejimniAlmashtir = () =>
    setRejim((r) => (r === "dark" ? "light" : "dark"));

  return { rejim, rejimniAlmashtir };
}
