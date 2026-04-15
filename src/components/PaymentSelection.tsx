import { CreditCard, Banknote, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaymentSelectionProps {
  selected: "stripe" | "cash";
  onChange: (value: "stripe" | "cash") => void;
}

export function PaymentSelection({
  selected,
  onChange,
}: PaymentSelectionProps) {
  const options = [
    {
      id: "stripe",
      label: "Stripe",
      sub: "Digital Pay",
      icon: <CreditCard size={24} />,
    },
    {
      id: "cash",
      label: "Cash",
      sub: "At Delivery",
      icon: <Banknote size={24} />,
    },
  ] as const;

  return (
    <div className="grid grid-cols-2 gap-4">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onChange(option.id)}
          className={cn(
            "relative flex flex-col items-center justify-center p-6 rounded-[2rem] border-2 transition-all",
            selected === option.id
              ? "border-[#8B2132] bg-[#8B2132]/5 text-[#8B2132]"
              : "border-transparent bg-white text-gray-400 hover:bg-gray-50",
          )}
        >
          <div
            className={cn(
              "p-3 rounded-full mb-3",
              selected === option.id ? "bg-[#8B2132]/10" : "bg-gray-100",
            )}
          >
            {option.icon}
          </div>
          <span className="text-sm font-bold">{option.label}</span>
          <span className="text-[10px] uppercase opacity-60 tracking-tighter">
            {option.sub}
          </span>

          {selected === option.id && (
            <div className="absolute top-3 right-3 bg-[#8B2132] text-white rounded-full p-0.5">
              <Check size={12} />
            </div>
          )}
        </button>
      ))}
    </div>
  );
}
