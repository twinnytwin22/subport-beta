import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { ProductWithPrice } from "lib/types";
import { createServerClient } from "lib/providers/supabase/supabase-server";

const getActiveProductsWithPrices = async (): Promise<ProductWithPrice[]> => {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from("products")
    .select("*, prices(*)")
    .eq("active", true)
    .eq("prices.active", true)
    .order("metadata->index")
    .order("unit_amount", { foreignTable: "prices" });

  if (error) {
    console.log(error.message);
  }

  return (data as any) || [];
};

export default getActiveProductsWithPrices;
