import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
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

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");
    
    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

    // Check if customer exists
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { 
              name: `Mentorship Session with ${mentor.name}`,
              description: `${sessionDuration} minute mentorship session - ${mentor.title} at ${mentor.company}`,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/mentors?booking=success`,
      cancel_url: `${req.headers.get("origin")}/mentors?booking=cancelled`,
      metadata: {
        user_id: user.id,
        mentor_id: mentorId,
        session_date: sessionDate || '',
      },
    });

    // Record the booking attempt
    await supabaseClient.from("mentor_bookings").insert({
      user_id: user.id,
      mentor_id: mentorId,
      stripe_session_id: session.id,
      amount: amount,
      session_date: sessionDate,
      session_duration: sessionDuration,
      notes: notes,
      status: "pending",
    });

    logStep("Checkout session created", { sessionId: session.id });

    return new Response(JSON.stringify({ url: session.url }), {
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