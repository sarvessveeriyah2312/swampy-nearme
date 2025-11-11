'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase, Pooja } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export function usePoojaDetail() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [pooja, setPooja] = useState<Pooja | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPooja = async () => {
      const id = Array.isArray(params.id) ? params.id[0] : params.id;

      if (!id) {
        toast({
          title: 'Invalid URL',
          description: 'No Pooja ID provided in the URL.',
          variant: 'destructive',
        });
        router.push('/poojas');
        return;
      }

      const { data, error } = await supabase
        .from('poojas')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) {
        toast({
          title: 'Database Error',
          description: error.message,
          variant: 'destructive',
        });
        router.push('/poojas');
        return;
      }

      if (!data) {
        toast({
          title: 'Pooja not found',
          description: 'The pooja you are looking for does not exist.',
          variant: 'destructive',
        });
        router.push('/poojas');
        return;
      }

      setPooja(data);
      setLoading(false);
    };

    fetchPooja();
  }, [params.id, router, toast]);

  return { pooja, loading };
}
