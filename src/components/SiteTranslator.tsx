"use client";
import { useEffect } from "react";
import { STATIC_TRANSLATIONS } from "@/lib/translations";
import { getContentTranslationMap, type SiteContent } from "@/lib/site-content-shared";

function formatNode(node: Text, translated: string) {
  const source = node.data;
  const leading = source.match(/^\s*/)?.[0] ?? "";
  const trailing = source.match(/\s*$/)?.[0] ?? "";
  node.data = `${leading}${translated}${trailing}`;
}
export default function SiteTranslator() {
  useEffect(() => {
    let dictionary: Record<string, string> = { ...STATIC_TRANSLATIONS, ...(window.__formFolioTranslations ?? {}) };
    let bangla = localStorage.getItem("ff-language") === "bn";
    const originals = new WeakMap<Text, { source: string; applied: string }>();
    const attributes = new WeakMap<Element, Map<string, { source: string; applied: string }>>();
    const normalize = (s: string) => s.replace(/\s+/g, " ").trim();
    function processText(node: Text) {
      if (!node.parentElement || /^(SCRIPT|STYLE|NOSCRIPT|TEXTAREA|INPUT|SELECT|OPTION|CODE)$/.test(node.parentElement.closest("script,style,noscript,textarea,input,select,option,code")?.tagName ?? "")) return;
      const prior = originals.get(node);
      let source = node.data;
      if (prior && source === prior.applied) source = prior.source;
      else if (prior && source !== prior.source) originals.delete(node);
      const translated = dictionary[normalize(source)];
      const target = bangla && translated ? translated : source;
      if (target !== node.data) formatNode(node, target);
      if (translated && bangla) originals.set(node, { source, applied: node.data });
      else if (prior && !bangla && node.data === prior.applied) originals.delete(node);
    }
    function processAttributes(element: Element) {
      for (const attr of ["aria-label", "title", "alt", "placeholder"]) {
        if (!element.hasAttribute(attr)) continue;
        const prior = attributes.get(element)?.get(attr);
        const current = element.getAttribute(attr) ?? "";
        const source = prior && current === prior.applied ? prior.source : current;
        const translated = dictionary[normalize(source)];
        const target = bangla && translated ? translated : source;
        if (current !== target) element.setAttribute(attr, target);
        if (translated && bangla) {
          const map = attributes.get(element) ?? new Map(); map.set(attr, { source, applied: target }); attributes.set(element, map);
        }
      }
    }
    function walk(root: Node = document.body) {
      if (root instanceof Text) processText(root);
      else {
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        let node: Node | null;
        while ((node = walker.nextNode())) processText(node as Text);
      }
      if (root instanceof Element) processAttributes(root);
      if (root instanceof Element) root.querySelectorAll("[aria-label],[title],[alt],[placeholder]").forEach(processAttributes);
    }
    const setLanguage = (language: string) => {
      bangla = language === "bn";
      document.documentElement.lang = bangla ? "bn" : "en";
      walk();
    };
    const onLanguage = (event: Event) => setLanguage((event as CustomEvent<string>).detail);
    const onMap = (event: Event) => {
      dictionary = { ...STATIC_TRANSLATIONS, ...dictionary, ...((event as CustomEvent<Record<string, string>>).detail ?? {}) };
      walk();
    };
    setLanguage(bangla ? "bn" : "en");
    if (!window.location.pathname.startsWith("/admin")) {
      void fetch("/api/site-content", { cache: "no-store" }).then((response) => response.ok ? response.json() as Promise<SiteContent> : null).then((content) => {
        if (content) { dictionary = { ...dictionary, ...getContentTranslationMap(content) }; walk(); }
      }).catch(() => undefined);
    }
    window.addEventListener("site-language-change", onLanguage);
    window.addEventListener("site-translation-map", onMap);
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "characterData" && mutation.target instanceof Text) processText(mutation.target);
        mutation.addedNodes.forEach((node) => walk(node));
      }
    });
    observer.observe(document.body, { subtree: true, childList: true, characterData: true });
    return () => { observer.disconnect(); window.removeEventListener("site-language-change", onLanguage); window.removeEventListener("site-translation-map", onMap); };
  }, []);
  return null;
}

declare global { interface Window { __formFolioTranslations?: Record<string, string> } }

export function TranslationMap({ dictionary }: { dictionary: Record<string, string> }) {
  useEffect(() => {
    window.__formFolioTranslations = dictionary;
    window.dispatchEvent(new CustomEvent("site-translation-map", { detail: dictionary }));
  }, [dictionary]);
  return null;
}
