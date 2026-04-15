// src/components/UserProfile.tsx
import { MapPin, CreditCard, Bell, LogOut, ChevronRight } from "lucide-react";

export function UserProfile() {
  const settings = [
    {
      icon: <MapPin size={20} />,
      label: "Saved Spots",
      sub: "Beaches and Hotels",
    },
    {
      icon: <CreditCard size={20} />,
      label: "Payment Methods",
      sub: "Mastercard **** 4242",
    },
    {
      icon: <Bell size={20} />,
      label: "Notifications",
      sub: "Order status & Offers",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="w-24 h-24 bg-tropea-red rounded-full flex items-center justify-center text-white text-3xl font-serif shadow-xl">
          JD
        </div>
        <div>
          <h2 className="text-2xl font-bold">John Doe</h2>
          <p className="text-sm text-gray-400 italic text-tropea-red/60">
            "Cipolla & Fondente Lover"
          </p>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] overflow-hidden border border-black/5">
        {settings.map((item, index) => (
          <button
            key={index}
            className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-none"
          >
            <div className="flex items-center gap-4 text-tropea-dark">
              <div className="p-2 bg-gray-100 rounded-xl">{item.icon}</div>
              <div className="text-left">
                <p className="font-bold text-sm">{item.label}</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-tight">
                  {item.sub}
                </p>
              </div>
            </div>
            <ChevronRight size={16} className="text-gray-300" />
          </button>
        ))}
      </div>

      <button className="w-full p-6 flex items-center justify-center gap-2 text-gray-400 hover:text-tropea-red transition-colors text-sm font-bold">
        <LogOut size={18} /> Sign Out
      </button>
    </div>
  );
}
