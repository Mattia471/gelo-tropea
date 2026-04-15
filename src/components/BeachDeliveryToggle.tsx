import { Umbrella, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface BeachToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

export function BeachDeliveryToggle({ enabled, onToggle }: BeachToggleProps) {
  return (
    <div
      onClick={onToggle}
      className={cn(
        "p-6 rounded-[2.5rem] flex items-center justify-between border-2 cursor-pointer transition-all duration-300",
        enabled
          ? "bg-[#FFB347]/10 border-[#FFB347]/40 shadow-inner"
          : "bg-white border-transparent",
      )}
    >
      <div className="flex items-center gap-4">
        <div
          className={cn(
            "p-3 rounded-full transition-colors",
            enabled ? "bg-[#FFB347] text-white" : "bg-gray-100 text-gray-400",
          )}
        >
          <Umbrella size={24} />
        </div>
        <div className="text-left">
          <span className="font-bold text-lg block">Delivery to Beach</span>
          <div className="flex items-center text-[10px] text-gray-400 uppercase font-medium mt-0.5">
            <MapPin size={10} className="mr-1 text-[#FFB347]" />
            Beach Spot #12 • Tropea
          </div>
        </div>
      </div>

      {/* Custom Tailwind Switch */}
      <div
        className={cn(
          "w-12 h-6 rounded-full relative transition-colors",
          enabled ? "bg-[#8B2132]" : "bg-gray-200",
        )}
      >
        <div
          className={cn(
            "absolute top-1 w-4 h-4 rounded-full bg-white transition-all shadow-sm",
            enabled ? "left-7" : "left-1",
          )}
        />
      </div>
    </div>
  );
}
