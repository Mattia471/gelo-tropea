// src/components/LanguageGate.tsx
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export function LanguageGate() {
  const { i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem("user-language");
    if (!savedLang) setIsVisible(true);
  }, []);

  const selectLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("user-language", lang);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-[#8B2132] z-[10000] flex items-center justify-center p-6">
      <div className="bg-[#FDFCF0] rounded-[3rem] p-8 w-full max-w-xs text-center space-y-6 shadow-2xl">
        <h2 className="text-2xl font-serif font-bold text-[#8B2132]">
          GeloTropea
        </h2>
        <p className="text-gray-500 text-sm italic">
          Choose your language / Scegli la lingua
        </p>
        <div className="grid gap-3">
          <button
            onClick={() => selectLanguage("it")}
            className="h-14 bg-white border-2 border-[#8B2132]/10 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#8B2132]/5"
          >
            🇮🇹 Italiano
          </button>
          <button
            onClick={() => selectLanguage("en")}
            className="h-14 bg-white border-2 border-[#8B2132]/10 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#8B2132]/5"
          >
            🇬🇧 English
          </button>
        </div>
      </div>
    </div>
  );
}
