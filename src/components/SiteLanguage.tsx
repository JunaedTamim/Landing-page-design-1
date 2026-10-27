"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { STATIC_TRANSLATIONS } from "@/lib/translations";
import { getContentTranslationMap, type SiteContent } from "@/lib/site-content-shared";

type Language = "en" | "bn";
type LanguageContextValue = { language: Language; setLanguage: (language: Language) => void; translations: Record<string, string>; t: (english: string, bangla?: string) => string };
const LanguageContext = createContext<LanguageContextValue>({ language: "en", setLanguage: () => undefined, translations: STATIC_TRANSLATIONS, t: (english) => english });

export function SiteLanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [translations, setTranslations] = useState<Record<string, string>>(STATIC_TRANSLATIONS);

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
    if (typeof window !== "undefined") {
      localStorage.setItem("ff-language", next);
      document.documentElement.lang = next;
    }
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("ff-language") === "bn" ? "bn" : "en";
    // Restore the saved preference after hydration; React re-renders translated text declaratively.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLanguageState(saved);
    document.documentElement.lang = saved;
    if (!window.location.pathname.startsWith("/admin")) {
      void fetch("/api/site-content", { cache: "no-store" })
        .then((response) => response.ok ? response.json() as Promise<SiteContent> : null)
        .then((content) => { if (content) setTranslations({ ...STATIC_TRANSLATIONS, ...getContentTranslationMap(content) }); })
        .catch(() => undefined);
    }
  }, []);

  const t = useCallback((english: string, bangla?: string) => language === "bn" ? bangla ?? translations[english] ?? english : english, [language, translations]);
  const value = useMemo(() => ({ language, setLanguage, translations, t }), [language, setLanguage, translations, t]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useSiteLanguage() { return useContext(LanguageContext); }

export function Text({ english, bangla }: { english: string; bangla?: string }) {
  const { t } = useSiteLanguage();
  return <>{t(english, bangla)}</>;
}
