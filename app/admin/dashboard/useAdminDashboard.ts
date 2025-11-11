'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, Pooja } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export const useAdminDashboard = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [poojas, setPoojas] = useState<Pooja[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    upcoming: 0,
  });

  // ✅ Redirect to login if not authenticated
  useEffect(() => {
    const isAuth = localStorage.getItem('admin-auth');
    if (!isAuth) router.push('/admin-login');
  }, [router]);

  // ✅ On mount: auto-delete past poojas + fetch current list
  useEffect(() => {
    const cleanupOldPoojas = async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const { error } = await supabase
        .from('poojas')
        .delete()
        .lt('pooja_date', today.toISOString()); // delete poojas before today

      if (error) {
        console.error('Error cleaning up past poojas:', error);
      } else {
        console.log('✅ Old poojas deleted successfully');
      }
    };

    cleanupOldPoojas().then(fetchPoojas);
  }, []);

  // ✅ Fetch poojas and compute stats
  const fetchPoojas = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from('poojas')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching poojas:', error);
      setLoading(false);
      return;
    }

    if (data) {
      setPoojas(data);

      const now = new Date();
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const todayEnd = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000);

      setStats({
        total: data.length,
        today: data.filter(
          (p) => new Date(p.pooja_date) >= todayStart && new Date(p.pooja_date) < todayEnd
        ).length,
        upcoming: data.filter((p) => new Date(p.pooja_date) >= now).length,
      });
    }

    setLoading(false);
  };

  // ✅ Manual delete for specific pooja
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this pooja?')) return;

    const { error } = await supabase.from('poojas').delete().eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete pooja',
        variant: 'destructive',
      });
    } else {
      toast({ title: 'Deleted', description: 'Pooja has been removed' });
      fetchPoojas();
    }
  };

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem('admin-auth');
    toast({ title: 'Logged out', description: 'You have been logged out' });
    router.push('/');
  };

  return { poojas, stats, loading, handleDelete, handleLogout };
};
