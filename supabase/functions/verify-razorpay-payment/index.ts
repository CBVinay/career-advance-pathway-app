import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[VERIFY-RAZORPAY-PAYMENT] ${step}${detailsStr}`);
};

// Function to verify Razorpay signature
const verifyRazorpaySignature = (orderId: string, paymentId: string, signature: string, secret: string): boolean => {
  const crypto = require('node:crypto');
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');
  return expectedSignature === signature;
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

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
    if (!user) throw new Error("User not authenticated");

    const { orderId, paymentId, signature, type } = await req.json();
    if (!orderId || !paymentId || !signature || !type) {
      throw new Error("Missing required parameters: orderId, paymentId, signature, type");
    }

    const razorpayKeySecret = Deno.env.get("RAZORPAY_KEY_SECRET");
    if (!razorpayKeySecret) throw new Error("RAZORPAY_KEY_SECRET is not set");

    // Verify Razorpay signature
    const isValidSignature = verifyRazorpaySignature(orderId, paymentId, signature, razorpayKeySecret);
    if (!isValidSignature) {
      throw new Error("Invalid Razorpay signature");
    }

    logStep("Signature verified", { orderId, paymentId });

    // Update the appropriate table based on type
    if (type === 'project') {
      const { error: updateError } = await supabaseClient
        .from('project_purchases')
        .update({
          status: 'paid',
          purchased_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('stripe_session_id', orderId) // We're using this field for razorpay order id
        .eq('user_id', user.id);

      if (updateError) {
        logStep("Error updating project purchase", { error: updateError });
        throw updateError;
      }
      logStep("Project purchase verified and updated");
    } else if (type === 'mentor') {
      const { error: updateError } = await supabaseClient
        .from('mentor_bookings')
        .update({
          status: 'paid',
          booked_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('stripe_session_id', orderId) // We're using this field for razorpay order id
        .eq('user_id', user.id);

      if (updateError) {
        logStep("Error updating mentor booking", { error: updateError });
        throw updateError;
      }
      logStep("Mentor booking verified and updated");
    } else {
      throw new Error("Invalid payment type");
    }

    return new Response(JSON.stringify({ success: true, status: 'paid' }), {
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