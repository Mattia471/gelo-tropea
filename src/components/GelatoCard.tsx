import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface GelatoCardProps {
  name: string;
  price: number;
  description: string;
  image: string;
  onAdd?: () => void;
}

export function GelatoCard({
  name,
  price,
  description,
  image,
  onAdd,
}: GelatoCardProps) {
  return (
    <div className="min-w-[280px] bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-black/5 flex flex-col group transition-all hover:shadow-xl">
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full shadow-sm text-sm font-bold text-[#8B2132]">
          €{price.toFixed(2)}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-[#2D1414] mb-2">{name}</h3>
        <p className="text-xs text-gray-400 italic line-clamp-2 leading-relaxed flex-1">
          {description}
        </p>

        <button
          onClick={onAdd}
          className="mt-6 w-full bg-[#8B2132] hover:bg-[#6b1a26] text-white h-14 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-[#8B2132]/20"
        >
          <Plus size={20} />
          Add to Order
        </button>
      </div>
    </div>
  );
}
