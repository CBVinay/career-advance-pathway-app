import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-MENTOR-BOOKING] ${step}${detailsStr}`);
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

    const { mentorId, amount, sessionDate, sessionDuration = 60, notes = "" } = await req.json();
    if (!mentorId || !amount) throw new Error("Missing mentorId or amount");

    // Fetch mentor details
    const { data: mentor, error: mentorError } = await supabaseClient
      .from('mentors')
      .select('*')
      .eq('id', mentorId)
      .single();
    
    if (mentorError) throw new Error(`Mentor not found: ${mentorError.message}`);
    logStep("Mentor found", { mentorId, name: mentor.name });

    // Check if user already has a booking for this mentor at this time
    const { data: existingBooking } = await supabaseClient
      .from('mentor_bookings')
      .select('*')
      .eq('user_id', user.id)
      .eq('mentor_id', mentorId)
      .eq('session_date', sessionDate)
      .eq('status', 'paid')
      .maybeSingle();

    if (existingBooking) {
      throw new Error("You already have a booking with this mentor at this time");
    }

    const razorpayKeyId = Deno.env.get("RAZORPAY_KEY_ID");
    const razorpayKeySecret = Deno.env.get("RAZORPAY_KEY_SECRET");
    if (!razorpayKeyId || !razorpayKeySecret) throw new Error("RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET is not set");
    
    // Create Razorpay order
    const razorpayOrderData = {
      amount: amount, // amount in paise (smallest currency unit)
      currency: "INR",
      receipt: `mentor_${mentorId}_${Date.now()}`,
      notes: {
        user_id: user.id,
        mentor_id: mentorId,
        mentor_name: mentor.name,
        session_date: sessionDate || '',
        session_duration: sessionDuration.toString()
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

    // Record the booking attempt
    await supabaseClient.from("mentor_bookings").insert({
      user_id: user.id,
      mentor_id: mentorId,
      stripe_session_id: razorpayOrder.id, // Using razorpay order id
      amount: amount,
      session_date: sessionDate,
      session_duration: sessionDuration,
      notes: notes,
      status: "pending",
    });

    logStep("Razorpay order created", { orderId: razorpayOrder.id });

    return new Response(JSON.stringify({ 
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      keyId: razorpayKeyId,
      mentorName: mentor.name,
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