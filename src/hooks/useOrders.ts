import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export function useOrderHistory() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("orders")
        .select(
          `
          id,
          total_amount,
          status,
          created_at,
          order_items (
            quantity,
            unit_price,
            products (name)
          )
        `,
        )
        .order("created_at", { ascending: false });

      if (!error) setOrders(data);
      setLoading(false);
    }

    fetchOrders();
  }, []);

  return { orders, loading };
}
