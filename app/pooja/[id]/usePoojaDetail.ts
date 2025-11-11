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
    async function fetchPooja() {
      const { data, error } = await supabase
        .from('poojas')
        .select('*')
        .eq('id', params.id)
        .maybeSingle();

      if (data) {
        setPooja(data);
      } else {
        toast({
          title: 'Pooja not found',
          description: 'The pooja you are looking for does not exist',
          variant: 'destructive',
        });
        router.push('/poojas');
      }
      setLoading(false);
    }

    if (params.id) fetchPooja();
  }, [params.id, router, toast]);

  return { pooja, loading };
}
