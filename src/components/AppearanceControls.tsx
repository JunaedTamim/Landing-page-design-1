"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
export default function AppearanceControls() {
  const [dark, setDark] = useState(false);
  const [bn, setBn] = useState(false);
  // Hydrate persisted browser preference/content and subscribe to UI events.
  useEffect(() => {
    const savedTheme = localStorage.getItem("ff-theme"); const savedLanguage = localStorage.getItem("ff-language");
    const useDark = savedTheme === "dark"; const useBangla = savedLanguage === "bn";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDark(useDark); setBn(useBangla); document.documentElement.dataset.theme = useDark ? "dark" : "light"; document.documentElement.lang = useBangla ? "bn" : "en";
  }, []);
  function toggleTheme() { const next = !dark; setDark(next); localStorage.setItem("ff-theme", next ? "dark" : "light"); document.documentElement.dataset.theme = next ? "dark" : "light"; }
  function toggleLanguage() { const next = !bn; setBn(next); localStorage.setItem("ff-language", next ? "bn" : "en"); document.documentElement.lang = next ? "bn" : "en"; window.dispatchEvent(new CustomEvent("site-language-change", { detail: next ? "bn" : "en" })); }
  return <div className="flex items-center gap-2"><button onClick={toggleLanguage} className="rounded-full border border-line px-3 py-2 text-xs font-bold" aria-label={bn ? "Switch to English" : "বাংলায় দেখুন"}>{bn ? "EN" : "বাংলা"}</button><button onClick={toggleTheme} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line" aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}>{dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</button></div>;
}
