// src/components/GelatoGallery.tsx (Contenuto aggiornato)
import { ArrowLeft, Search, Plus } from "lucide-react";

interface GelatoGalleryProps {
  onBack: () => void;
}

const ALL_GELATOS = [
  {
    id: 1,
    name: "Classic Pistachio",
    price: 4.5,
    // Usiamo il link generato per coerenza
    image: "/gelato1.jpg",
  },
  {
    id: 2,
    name: "Tropea Dark Soul",
    price: 6.5,
    image: "/gelato2.jpg",
  },
  {
    id: 3,
    name: "Wild Berry",
    price: 5.5,
    // Un placeholder realistico
    image: "/gelato1.jpg",
  },
  {
    id: 4,
    name: "Lemon Zest",
    price: 4.0,
    image: "/pistacchio.jpg",
  },
  {
    id: 5,
    name: "Salted Caramel",
    price: 5.0,
    image: "/gelato2.jpg",
  },
  {
    id: 6,
    name: "Coffee Swirl",
    price: 4.5,
    image: "/gelato1.jpg",
  },
];

export function GelatoGallery({ onBack }: GelatoGalleryProps) {
  return (
    <div className="animate-in slide-in-from-bottom-10 duration-500 bg-[#FDFCF0] min-h-screen">
      {/* Header Galleria */}
      <div className="flex items-center justify-between mb-8 sticky top-0 bg-[#FDFCF0]/80 backdrop-blur-md pt-6 pb-2 z-30 -mx-6 px-6">
        <button
          onClick={onBack}
          className="p-3 bg-white rounded-full shadow-sm hover:scale-105 active:scale-95 transition-all"
        >
          <ArrowLeft size={20} className="text-[#8B2132]" />
        </button>
        <h2 className="text-xl font-bold italic font-serif text-[#8B2132]">
          All Flavors
        </h2>
        <div className="w-10" />
      </div>

      {/* Search Bar */}
      <div className="relative mb-8">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
        <input
          type="text"
          placeholder="Search flavor..."
          className="w-full h-14 pl-12 pr-6 rounded-2xl bg-white border-none shadow-sm focus:ring-2 focus:ring-[#8B2132]/20 outline-none transition-all text-sm"
        />
      </div>

      {/* Grid dei Gelati */}
      <div className="grid grid-cols-2 gap-4 pb-20">
        {" "}
        {/* pb-20 per non coprire l'ultimo gelato con la Nav */}
        {ALL_GELATOS.map((item) => (
          <div
            key={item.id}
            className="bg-white p-3 rounded-[2rem] shadow-sm border border-black/5 flex flex-col group active:scale-[0.98] transition-all hover:shadow-xl"
          >
            {/* Immagine */}
            <div className="relative h-36 rounded-[1.5rem] mb-3 overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-md px-2 py-0.5 rounded-full shadow-sm text-[10px] font-bold text-[#8B2132]">
                €{item.price.toFixed(2)}
              </div>
            </div>

            {/* Testo */}
            <div className="px-2 pb-2">
              <h4 className="font-bold text-sm text-[#2D1414] truncate mb-3">
                {item.name}
              </h4>
              <button className="w-full h-10 bg-[#8B2132] hover:bg-[#6b1a26] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all active:scale-95 shadow-sm">
                <Plus size={14} />
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
