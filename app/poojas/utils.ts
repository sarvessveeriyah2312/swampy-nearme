import { supabase, Pooja } from '@/lib/supabase';

export async function fetchPoojasFromDB() {
  const { data, error } = await supabase
    .from('poojas')
    .select('*')
    .eq('status', 'approved')
    .order('pooja_date', { ascending: true });

  if (error) console.error('Error fetching poojas:', error);
  return data || [];
}

export function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export const filterPoojas = (poojas: any[], searchQuery: string, activeFilter: string) => {
  if (!poojas) return [];

  let filtered = [...poojas];
  const query = searchQuery.trim().toLowerCase();

  // 🔍 Text search filter
  if (query) {
    filtered = filtered.filter(
      (pooja) =>
        pooja.title?.toLowerCase().includes(query) ||
        pooja.description?.toLowerCase().includes(query) ||
        pooja.location_address?.toLowerCase().includes(query)
    );
  }

  // 📅 Date filters
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  switch (activeFilter) {
    case 'today':
      filtered = filtered.filter((p) => {
        const poojaDate = new Date(p.pooja_date);
        return poojaDate.toDateString() === today.toDateString();
      });
      break;

    case 'week':
      const weekEnd = new Date(today);
      weekEnd.setDate(today.getDate() + 7);
      filtered = filtered.filter((p) => {
        const poojaDate = new Date(p.pooja_date);
        return poojaDate >= today && poojaDate <= weekEnd;
      });
      break;

    case 'month': {
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      filtered = filtered.filter((p) => {
        const d = new Date(p.pooja_date);
        // ⏰ Handles UTC and local time difference properly
        const localDate = new Date(
          d.getUTCFullYear(),
          d.getUTCMonth(),
          d.getUTCDate()
        );
        return (
          localDate.getMonth() === currentMonth &&
          localDate.getFullYear() === currentYear
        );
      });
      break;
    }

    default:
      break;
  }

  return filtered;
};


export function getUpcomingPoojasCount(poojas: Pooja[]) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return poojas.filter(p => new Date(p.pooja_date) >= today).length;
}
