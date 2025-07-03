
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.2'
import { hash, compare } from "https://deno.land/x/bcrypt@v0.4.1/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  console.log('Admin auth function called with method:', req.method)
  
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const requestBody = await req.text()
    console.log('Request body received:', requestBody)
    
    let body
    try {
      body = JSON.parse(requestBody)
    } catch (parseError) {
      console.error('JSON parse error:', parseError)
      return new Response(
        JSON.stringify({ error: 'Invalid JSON in request body' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }
    
    const { email, password } = body
    console.log('Auth attempt for email:', email)

    if (!email || !password) {
      console.log('Missing email or password')
      return new Response(
        JSON.stringify({ error: 'Email and password are required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Create Supabase client with service role key for admin operations
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    
    console.log('Environment check - URL exists:', !!supabaseUrl, 'Service key exists:', !!supabaseServiceKey)
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing environment variables')
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    console.log('Querying database for admin user...')

    // Fetch admin user from database
    const { data: adminData, error: dbError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .maybeSingle()

    console.log('Database query result:', { adminData: !!adminData, error: dbError })

    if (dbError) {
      console.error('Database error:', dbError)
      return new Response(
        JSON.stringify({ error: 'Database error occurred' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    if (!adminData) {
      console.log('No admin user found with email:', email)
      return new Response(
        JSON.stringify({ error: 'Invalid credentials' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    console.log('Admin user found, verifying password...')
    console.log('Stored hash starts with:', adminData.password_hash.substring(0, 10))

    // Verify password using bcrypt
    let isValid = false
    try {
      isValid = await compare(password, adminData.password_hash)
      console.log('Password verification result:', isValid)
    } catch (bcryptError) {
      console.error('Bcrypt error:', bcryptError)
      
      // Fallback: generate a test hash to see if bcrypt is working
      try {
        const testHash = await hash('test', 10)
        console.log('Bcrypt test hash generated successfully:', testHash.substring(0, 10))
      } catch (hashError) {
        console.error('Bcrypt completely broken:', hashError)
        return new Response(
          JSON.stringify({ error: 'Authentication service error' }),
          { 
            status: 500, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
      }
      
      return new Response(
        JSON.stringify({ error: 'Password verification failed' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    if (!isValid) {
      console.log('Password verification failed for user:', email)
      return new Response(
        JSON.stringify({ error: 'Invalid credentials' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    console.log('Authentication successful for user:', email)

    // Return admin user data (without password hash)
    const { password_hash, ...adminUser } = adminData
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        admin: adminUser 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Admin auth error:', error)
    return new Response(
      JSON.stringify({ error: 'Authentication failed: ' + error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
