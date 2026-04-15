// src/components/GDPRBanner.tsx
import { useState, useEffect } from "react";

export function GDPRBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setIsVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-28 left-4 right-4 bg-white/95 backdrop-blur-md p-5 rounded-3xl shadow-2xl border border-black/5 z-[40] animate-in slide-in-from-bottom-10">
      <div className="flex flex-col gap-3">
        <p className="text-[10px] text-gray-500 leading-tight">
          Utilizziamo i cookie per migliorare la tua esperienza di degustazione
          a Tropea. Continuando, accetti la nostra policy.
        </p>
        <button
          onClick={accept}
          className="text-xs font-bold text-[#8B2132] bg-[#8B2132]/10 py-2 rounded-xl"
        >
          Accetto / Accept
        </button>
      </div>
    </div>
  );
}
