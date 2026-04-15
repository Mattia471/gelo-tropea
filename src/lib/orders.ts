import { supabase } from "./supabase";

export async function createOrder(
  cart: any[],
  total: number,
  beachSpot: string,
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Devi essere loggato per ordinare!");

  // 1. Inserisci la testata dell'ordine
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: user.id,
      total_amount: total,
      payment_type: "cash", // O 'stripe'
      beach_spot: beachSpot,
      status: "pending",
    })
    .select()
    .single();

  if (orderError) throw orderError;

  // 2. Inserisci i dettagli (i gelati nel carrello)
  const orderItems = cart.map((item) => ({
    order_id: order.id,
    product_id: item.id,
    quantity: item.quantity,
    unit_price: item.price,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (itemsError) throw itemsError;

  return order;
}
