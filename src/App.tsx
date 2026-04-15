import { useState } from "react";
import {
  MapPin,
  ShoppingBag,
  IceCream,
  History,
  User,
  Umbrella,
  Loader2,
} from "lucide-react";

// UI Components da Shadcn
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

// Componenti Custom (che abbiamo definito nei passaggi precedenti)
import { GelatoCard } from "@/components/GelatoCard";
import { PaymentSelection } from "@/components/PaymentSelection";
import { OrderHistory } from "./components/OrderHistory";
import { UserProfile } from "./components/UserProfile";
import { LanguageGate } from "./components/LanguageGate";
import { GDPRBanner } from "./components/GDPRBanner";
import { GelatoGallery } from "./components/GelatoGallery";
import { useCart } from "./context/CartContext";
import { createOrder } from "./lib/orders";
import { useProducts } from "./hooks/useProducts";

type View = "menu" | "history" | "profile" | "checkout";

const DesktopBlocker = () => (
  <div className="hidden md:flex fixed inset-0 bg-[#8B2132] z-[9999] items-center justify-center p-10 text-center">
    <div className="max-w-sm space-y-6">
      <div className="bg-white/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
        >
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
      </div>
      <h2 className="text-white text-3xl font-serif italic font-bold">
        Mobile Only Experience
      </h2>
      <p className="text-white/70 text-sm leading-relaxed">
        GeloTropea è pensata per essere gustata sotto il sole. <br />
        Per favore, apri questa app dal tuo smartphone per ordinare il tuo
        gelato.
      </p>
      <div className="pt-4">
        <img
          src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://tuo-sito.it"
          alt="QR Code"
          className="mx-auto rounded-xl border-4 border-white/20"
        />
        <p className="text-white/40 text-[10px] mt-2 uppercase tracking-widest">
          Scan to open on mobile
        </p>
      </div>
    </div>
  </div>
);

export default function App() {
  const [view, setView] = useState<View>("menu");
  const [beachDelivery, setBeachDelivery] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const { cart, totalPrice, clearCart, addToCart } = useCart();
  const [loading, setLoading] = useState(false);
  const { products } = useProducts();
  // const { t } = useTranslation();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  return (
    <>
      <DesktopBlocker />
      <LanguageGate />
      <GDPRBanner />
      <div className="min-h-screen bg-[#FDFCF0] text-[#2D1414] max-w-md mx-auto relative pb-24 shadow-2xl font-sans">
        {/* HEADER */}
        <header className="p-6 flex justify-between items-center sticky top-0 bg-[#FDFCF0]/80 backdrop-blur-md z-50">
          <div>
            <div className="flex items-center text-[10px] font-black text-[#8B2132] uppercase tracking-[0.2em]">
              <MapPin size={12} className="mr-1" /> Tropea, Italy
            </div>
            <h1 className="text-2xl font-serif font-bold text-[#8B2132] italic">
              GeloTropea
            </h1>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-[#8B2132]/20 relative"
            onClick={() => setView("checkout")}
          >
            <ShoppingBag className="text-[#8B2132]" size={20} />
            <Badge className="absolute -top-1 -right-1 bg-[#FFB347] p-0.5 min-w-[18px] h-[18px] flex items-center justify-center text-[10px]">
              {cartCount > 0 && cartCount}
            </Badge>
          </Button>
        </header>

        <main className="px-6 space-y-8">
          {view === "menu" && (
            <div className="space-y-8 animate-in fade-in duration-500">
              {showAll ? (
                <GelatoGallery onBack={() => setShowAll(false)} />
              ) : (
                <>
                  <div className="relative rounded-[2.5rem] overflow-hidden h-48">
                    <img
                      src={"https://static.winenews.it/2018/08/GelatoMare.jpg"}
                      alt="Hero Gelato"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#8B2132]/80 to-transparent flex flex-col justify-end p-6 text-white">
                      <p className="text-[10px] uppercase font-bold tracking-widest opacity-80">
                        Sun-kissed sweetness
                      </p>
                      <h2 className="text-xl font-bold">
                        Artisanal Gelato <br /> delivered to your spot.
                      </h2>
                    </div>
                  </div>
                  <div
                    className={`p-5 rounded-[2rem] flex justify-between items-center border transition-all ${beachDelivery ? "bg-[#FFB347]/10 border-[#FFB347]/30" : "bg-white border-transparent"}`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-2 rounded-full ${beachDelivery ? "bg-[#FFB347] text-white" : "bg-gray-100 text-gray-400"}`}
                      >
                        <Umbrella size={20} />
                      </div>
                      <div>
                        <Label className="font-bold">Delivery to Beach</Label>
                        <p className="text-[10px] text-gray-400 uppercase">
                          Tropea Coastline
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={beachDelivery}
                      onCheckedChange={setBeachDelivery}
                    />
                  </div>
                  <section className="space-y-4">
                    <div className="flex justify-between items-end">
                      <h3 className="text-2xl font-bold">Daily Selection</h3>
                      <button
                        onClick={() => setShowAll(true)}
                        className="text-[#8B2132] text-xs font-bold underline"
                      >
                        See all
                      </button>
                    </div>
                    <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-6 px-6 pb-4">
                      {products.map((flavor) => (
                        <GelatoCard
                          onAdd={() => addToCart(flavor)}
                          key={flavor.id}
                          name={flavor.name}
                          price={flavor.price}
                          description={flavor.description}
                          image={flavor.image}
                        />
                      ))}
                    </div>
                  </section>
                </>
              )}
            </div>
          )}

          {view === "history" && <OrderHistory />}

          {view === "profile" && <UserProfile />}

          {view === "checkout" && (
            <div className="space-y-8 animate-in fade-in duration-500 pb-20">
              {/* HEADER */}
              <div>
                <h2 className="text-3xl font-bold">Checkout</h2>
                <p className="text-gray-500 text-sm">
                  Review your summer treat
                </p>
              </div>

              {/* LISTA ITEM NEL CARRELLO */}
              <section className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">
                  Your Selection
                </h4>
                <div className="space-y-3">
                  {cart.length > 0 ? (
                    cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between bg-white p-4 rounded-3xl shadow-sm"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-2xl overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h5 className="text-sm font-bold">{item.name}</h5>
                            <p className="text-[10px] text-gray-400">
                              Qty: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <span className="font-bold text-sm">
                          €{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 bg-white/50 rounded-3xl border-2 border-dashed border-gray-200">
                      <p className="text-sm text-gray-400 italic">
                        Your cart is empty 🍦
                      </p>
                    </div>
                  )}
                </div>
              </section>

              {/* SELEZIONE PAGAMENTO */}
              <section className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">
                  Payment Method
                </h4>
                <PaymentSelection
                  selected={"stripe"} // Qui potresti usare uno stato [payment, setPayment]
                  onChange={(value) =>
                    console.log("Selected payment method:", value)
                  }
                />
              </section>

              {/* TOTALI DINAMICI */}
              <div className="bg-white p-6 rounded-[2.5rem] space-y-3 shadow-sm">
                <div className="flex justify-between text-sm">
                  <span className="opacity-50">Subtotal</span>
                  <span className="font-bold">€{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="opacity-50">Delivery</span>
                  <span className="text-green-600 font-bold uppercase text-[10px]">
                    Free
                  </span>
                </div>
                <hr className="border-dashed my-2 border-gray-100" />
                <div className="flex justify-between text-xl font-bold">
                  <span className="text-[#8B2132]">Total</span>
                  <span>€{totalPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* TASTO ORDINE FINALE */}
              <Button
                disabled={cart.length === 0 || loading}
                onClick={async () => {
                  try {
                    setLoading(true);
                    // Qui passiamo il carrello, il totale e una posizione fissa (o recuperata da GPS)
                    await createOrder(
                      cart,
                      totalPrice,
                      "Ombrellone #42 - Lido Tropical",
                    );
                    alert("Ordine inviato con successo! 🍦🚀");
                    clearCart(); // Svuota il carrello dopo l'invio
                    setView("menu"); // Torna alla home
                  } catch (err: any) {
                    alert(
                      err.message === "Devi essere loggato per ordinare!"
                        ? "Accedi al tuo profilo per completare l'ordine!"
                        : "Errore durante l'ordine. Riprova.",
                    );
                  } finally {
                    setLoading(false);
                  }
                }}
                className={`w-full h-16 bg-[#8B2132] text-white rounded-3xl text-lg font-bold shadow-xl shadow-[#8B2132]/20 transition-all active:scale-95 ${
                  (cart.length === 0 || loading) &&
                  "opacity-50 grayscale cursor-not-allowed"
                }`}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="animate-spin" /> Processing...
                  </span>
                ) : (
                  "Confirm Order"
                )}
              </Button>
            </div>
          )}
        </main>

        {/* BOTTOM NAVIGATION BAR */}
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-xs bg-tropea-dark rounded-full py-4 px-8 flex justify-between items-center shadow-2xl z-50 border border-white/10 backdrop-blur-lg">
          <button
            onClick={() => setView("menu")}
            className={view === "menu" ? "text-white" : "text-white/30"}
          >
            <IceCream
              size={22}
              className={view === "menu" ? "scale-110" : ""}
            />
          </button>
          <button
            onClick={() => setView("history")}
            className={view === "history" ? "text-white" : "text-white/30"}
          >
            <History
              size={22}
              className={view === "history" ? "scale-110" : ""}
            />
          </button>
          <div className="w-px h-6 bg-white/10" />
          <button
            onClick={() => setView("checkout")}
            className={
              view === "checkout" ? "text-tropea-orange" : "text-white/30"
            }
          >
            <ShoppingBag
              size={22}
              className={view === "checkout" ? "scale-110" : ""}
            />
          </button>
          <button
            onClick={() => setView("profile")}
            className={view === "profile" ? "text-white" : "text-white/30"}
          >
            <User size={22} className={view === "profile" ? "scale-110" : ""} />
          </button>
        </nav>
      </div>
    </>
  );
}
