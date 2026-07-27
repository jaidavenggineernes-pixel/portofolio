import { supabase } from "./src/lib/supabase";

async function test() {
  console.log("Testing Supabase Insert...");
  
  const dummy = { testing: "123" };
  
  const { data, error } = await supabase
    .from("portfolio_data")
    .upsert({ id: "main_state", data: dummy })
    .select();
    
  console.log("Error:", error);
  console.log("Data:", data);
}

test();
