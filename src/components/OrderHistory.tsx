// src/components/OrderHistory.tsx
import { useState } from "react";
import {
  Clock,
  CheckCircle2,
  ChevronRight,
  Loader2,
  IceCream,
  Repeat,
  PackageCheck,
} from "lucide-react";
import { useOrderHistory } from "@/hooks/useOrders";
import { useCart } from "@/context/CartContext"; // Importiamo il carrello

export function OrderHistory() {
  const { orders, loading } = useOrderHistory();
  const { addToCart } = useCart(); // Funzione per aggiungere al carrello
  const [loadingReorder, setLoadingReorder] = useState<string | null>(null);

  // Stato per gestire l'ordine espanso (memorizza l'ID dell'ordine)
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrderId((prevId) => (prevId === orderId ? null : orderId));
  };

  // Funzione per gestire il riordine
  const handleReorder = async (order: any) => {
    setLoadingReorder(order.id);

    // Simuliamo un piccolo caricamento per feedback visivo
    await new Promise((resolve) => setTimeout(resolve, 600));

    try {
      // Per ogni item nell'ordine passato, lo aggiungiamo al carrello
      for (const item of order.order_items) {
        // Prepariamo l'oggetto prodotto compatibile con addToCart
        const productToCart = {
          id: item.products.id,
          name: item.products.name,
          price: item.unit_price, // Usiamo il prezzo dell'epoca dell'ordine
          image: item.products.image_url,
          // La quantità viene gestita internamente da addToCart se l'item esiste già
        };

        // Aggiungiamo tante volte quante era la quantità originale
        for (let i = 0; i < item.quantity; i++) {
          addToCart(productToCart);
        }
      }

      // Feedback opzionale: potresti navigare al carrello o mostrare un toast
      alert("Items added to cart! Ready to reorder? 🍦🛒");
    } catch (error) {
      console.error("Error reordering:", error);
      alert("Could not reorder. Please try adding items manually.");
    } finally {
      setLoadingReorder(null);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <Loader2 className="animate-spin text-[#8B2132]" size={32} />
        <p className="text-sm text-gray-400 font-medium">
          Fetching your treats...
        </p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-20 px-10 bg-white rounded-[3rem] shadow-sm border border-black/5">
        <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <IceCream className="text-gray-300" size={32} />
        </div>
        <h3 className="text-lg font-bold text-gray-800">No orders yet</h3>
        <p className="text-sm text-gray-400 mt-2">
          Your summer is too hot! Start ordering some fresh gelato.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-24">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold text-[#2D1414]">My Treats</h2>
          <p className="text-sm text-gray-400 italic">Your sweet history</p>
        </div>
        <span className="bg-[#8B2132]/10 text-[#8B2132] px-3 py-1 rounded-full text-[10px] font-black uppercase">
          {orders.length} Orders
        </span>
      </div>

      <div className="space-y-4">
        {orders.map((order) => {
          const isExpanded = expandedOrderId === order.id;
          const isReordering = loadingReorder === order.id;

          return (
            <div
              key={order.id}
              className={`bg-white rounded-[2.5rem] shadow-sm border border-black/5 transition-all duration-300 ease-in-out ${
                isExpanded ? "p-6" : "p-5"
              }`}
            >
              {/* HEADER DELL'ORDINE (Sempre visibile, cliccabile per espandere) */}
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleOrderExpansion(order.id)}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={
                      order.status === "pending" || order.status === "preparing"
                        ? "p-4 bg-orange-100 text-orange-500 rounded-3xl"
                        : "p-4 bg-green-100 text-green-500 rounded-3xl"
                    }
                  >
                    {order.status === "pending" ||
                    order.status === "preparing" ? (
                      <Clock size={22} />
                    ) : (
                      <CheckCircle2 size={22} />
                    )}
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-black tracking-tighter opacity-30">
                      ID: {order.id.slice(0, 8)}
                    </span>
                    <p className="font-bold text-sm text-[#2D1414]">
                      {new Date(order.created_at).toLocaleDateString("it-IT", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <p className="text-xs text-gray-400 font-medium">
                      {order.order_items.length}{" "}
                      {order.order_items.length === 1 ? "flavor" : "flavors"} •
                      <span className="text-[#8B2132] ml-1">
                        €{order.total_amount.toFixed(2)}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-bold uppercase opacity-40 hidden sm:block">
                    {order.status}
                  </span>
                  <ChevronRight
                    size={18}
                    className={`text-gray-300 transition-transform duration-300 ${isExpanded ? "rotate-90" : ""}`}
                  />
                </div>
              </div>

              {/* DETTAGLI ESPANSI (Visibili solo se isExpanded è true) */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isExpanded
                    ? "max-h-[500px] mt-6 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="border-t border-dashed border-gray-100 pt-5 space-y-4">
                  {/* Lista degli articoli */}
                  <div className="space-y-3">
                    <h5 className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
                      <PackageCheck size={14} />
                      Order Details
                    </h5>
                    {order.order_items.map((item: any, index: number) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-50/50 p-3 rounded-2xl border border-gray-100/50"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white rounded-xl overflow-hidden shadow-inner border border-gray-100">
                            <img
                              src={item.products.image_url}
                              alt={item.products.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-[#2D1414]">
                              {item.products.name}
                            </p>
                            <p className="text-xs text-gray-400">
                              Qty: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-[#8B2132]">
                          €{(item.unit_price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Pulsante di RIORDINO */}
                  <button
                    onClick={() => handleReorder(order)}
                    disabled={isReordering}
                    className="w-full h-14 bg-[#8B2132] text-white rounded-2xl font-bold flex items-center justify-center gap-2.5 active:scale-95 transition-all disabled:opacity-60 shadow-lg shadow-[#8B2132]/10"
                  >
                    {isReordering ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Adding to Cart...
                      </>
                    ) : (
                      <>
                        <Repeat size={18} />
                        One More Time! (Reorder)
                      </>
                    )}
                  </button>
                  <p className="text-center text-[10px] text-gray-400 italic px-4">
                    Items will be added to your cart at their original price.
                    Check current availability before checkout.
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
