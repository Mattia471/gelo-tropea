// src/hooks/useProducts.ts
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export function useProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_available", true);

      if (!error) setProducts(data);
      setLoading(false);
    }

    fetchProducts();
  }, []);

  return { products, loading };
}
