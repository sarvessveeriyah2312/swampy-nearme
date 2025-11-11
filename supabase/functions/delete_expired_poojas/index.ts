// @ts-nocheck
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';


const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

Deno.serve(async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { error } = await supabase
    .from('poojas')
    .delete()
    .lt('pooja_date', today.toISOString());

  if (error) {
    console.error('Failed to delete expired poojas:', error);
    return new Response(JSON.stringify({ success: false, error }), { status: 500 });
  }

  console.log('Expired poojas deleted successfully');
  return new Response(JSON.stringify({ success: true }), { status: 200 });
});
