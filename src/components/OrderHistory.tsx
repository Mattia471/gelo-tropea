// src/components/OrderHistory.tsx
import { Clock, CheckCircle2, ChevronRight } from "lucide-react";

const ORDERS = [
  {
    id: "1024",
    date: "Today, 14:20",
    total: "12.50",
    status: "Delivering",
    items: "2 scoops",
  },
  {
    id: "0982",
    date: "Yesterday",
    total: "6.50",
    status: "Completed",
    items: "1 scoop",
  },
];

export function OrderHistory() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h2 className="text-3xl font-bold text-tropea-dark">My Treats</h2>
      <div className="space-y-4">
        {ORDERS.map((order) => (
          <div
            key={order.id}
            className="bg-white p-5 rounded-[2rem] flex items-center justify-between shadow-sm border border-black/5"
          >
            <div className="flex items-center gap-4">
              <div
                className={
                  order.status === "Delivering"
                    ? "p-3 bg-tropea-orange/20 text-tropea-orange rounded-full"
                    : "p-3 bg-gray-100 text-gray-400 rounded-full"
                }
              >
                {order.status === "Delivering" ? (
                  <Clock size={20} />
                ) : (
                  <CheckCircle2 size={20} />
                )}
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold opacity-40">
                  Order #{order.id}
                </span>
                <p className="font-bold text-sm">{order.date}</p>
                <p className="text-xs text-gray-400">
                  {order.items} • €{order.total}
                </p>
              </div>
            </div>
            <ChevronRight size={18} className="text-gray-300" />
          </div>
        ))}
      </div>
    </div>
  );
}
