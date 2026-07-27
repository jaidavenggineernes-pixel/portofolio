import { supabase } from "./src/lib/supabase";

async function check() {
  const { data, error } = await supabase
    .from("portfolio_data")
    .select("data")
    .eq("id", "main_state")
    .single();
    
  console.log("Error:", error);
  console.log("Data:", data);
}

check();
