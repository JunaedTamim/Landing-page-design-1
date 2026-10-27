"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useSiteLanguage } from "@/components/SiteLanguage";

export default function AppearanceControls() {
  const [dark, setDark] = useState(false);
  const { language, setLanguage } = useSiteLanguage();
  useEffect(() => {
    const useDark = localStorage.getItem("ff-theme") === "dark";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDark(useDark);
    document.documentElement.dataset.theme = useDark ? "dark" : "light";
  }, []);
  function toggleTheme() {
    const next = !dark;
    setDark(next);
    localStorage.setItem("ff-theme", next ? "dark" : "light");
    document.documentElement.dataset.theme = next ? "dark" : "light";
  }
  function toggleLanguage() { setLanguage(language === "bn" ? "en" : "bn"); }
  return <div className="flex items-center gap-2"><button onClick={toggleLanguage} className="rounded-full border border-line px-3 py-2 text-xs font-bold" aria-label={language === "bn" ? "ইংরেজিতে দেখুন" : "বাংলায় দেখুন"}>{language === "bn" ? "EN" : "বাংলা"}</button><button onClick={toggleTheme} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line" aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}>{dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</button></div>;
}
