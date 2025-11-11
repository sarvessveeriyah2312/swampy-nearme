import { useEffect } from 'react';
import { usePoojaStore } from '@/lib/store';
import { fetchPoojasFromDB } from './utils';
import { Pooja } from '@/lib/supabase';

export function useFetchPoojas(setPoojas: (p: Pooja[]) => void, setFiltered: (p: Pooja[]) => void, setLoading: (b: boolean) => void) {
  useEffect(() => {
    async function load() {
      const data = await fetchPoojasFromDB();
      setPoojas(data);
      setFiltered(data);
      setLoading(false);
    }
    load();
  }, [setPoojas]);
}

export function useUserLocation(setUserLocation: (loc: { lat: number; lng: number }) => void) {
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      pos => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => console.log('Location access denied')
    );
  }, [setUserLocation]);
}
