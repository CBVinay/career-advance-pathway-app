import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-PROJECT-PAYMENT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    // Initialize Supabase client with service role key
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");
    
    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");
    
    logStep("User authenticated", { userId: user.id, email: user.email });

    const { projectId, amount } = await req.json();
    if (!projectId || !amount) throw new Error("Missing projectId or amount");

    // Fetch project details
    const { data: project, error: projectError } = await supabaseClient
      .from('projects')
      .select('*')
      .eq('id', projectId)
      .single();
    
    if (projectError) throw new Error(`Project not found: ${projectError.message}`);
    logStep("Project found", { projectId, title: project.title });

    // Check if user already purchased this project
    const { data: existingPurchase } = await supabaseClient
      .from('project_purchases')
      .select('*')
      .eq('user_id', user.id)
      .eq('project_id', projectId)
      .eq('status', 'paid')
      .maybeSingle();

    if (existingPurchase) {
      throw new Error("Project already purchased");
    }

    const razorpayKeyId = Deno.env.get("RAZORPAY_KEY_ID");
    const razorpayKeySecret = Deno.env.get("RAZORPAY_KEY_SECRET");
    if (!razorpayKeyId || !razorpayKeySecret) throw new Error("RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET is not set");
    
    // Create Razorpay order
    const razorpayOrderData = {
      amount: amount, // amount in paise (smallest currency unit)
      currency: "INR",
      receipt: `project_${projectId}_${Date.now()}`,
      notes: {
        user_id: user.id,
        project_id: projectId,
        project_title: project.title
      }
    };

    const auth = btoa(`${razorpayKeyId}:${razorpayKeySecret}`);
    const razorpayResponse = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(razorpayOrderData),
    });

    if (!razorpayResponse.ok) {
      const errorData = await razorpayResponse.text();
      throw new Error(`Razorpay API error: ${errorData}`);
    }

    const razorpayOrder = await razorpayResponse.json();

    // Record the purchase attempt
    await supabaseClient.from("project_purchases").insert({
      user_id: user.id,
      project_id: projectId,
      stripe_session_id: razorpayOrder.id, // Using razorpay order id
      amount: amount,
      status: "pending",
    });

    logStep("Razorpay order created", { orderId: razorpayOrder.id });

    return new Response(JSON.stringify({ 
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      keyId: razorpayKeyId,
      projectTitle: project.title,
      userEmail: user.email
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});