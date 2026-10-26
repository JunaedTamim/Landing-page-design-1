"use client";
import { useEffect, useState, type ReactNode } from "react";
export default function LanguageText({ english, bangla }: { english: ReactNode; bangla: ReactNode }) {
  const [isBangla, setIsBangla] = useState(false);
  // Hydrate persisted browser preference/content and subscribe to UI events.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setIsBangla(localStorage.getItem("ff-language") === "bn"); const update = (event: Event) => setIsBangla((event as CustomEvent<string>).detail === "bn"); window.addEventListener("site-language-change", update); return () => window.removeEventListener("site-language-change", update); }, []);
  return <>{isBangla ? bangla : english}</>;
}
