/**
 * Dynamically geocode an address using OpenStreetMap (Nominatim),
 * with progressive simplification, normalization, and caching.
 */
const geocodeCache: Record<string, { lat: number; lng: number }> = {};

export async function getCoordinatesFromAddress(address: string) {
  try {
    if (!address) return null;

    // 🧹 Step 1: Normalize
    let cleanAddress = address
      .replace(/\s+/g, ' ')
      .replace(/\bqueenstreet\b/i, 'Queen Street')
      .replace(/\blittle india\b/i, 'George Town')
      .replace(/\bmaha\b/i, 'Maha')
      .replace(/\bmariamman\b/i, 'Mariamman')
      .replace(/\btemple\b/i, 'Temple')
      .trim();

    const cacheKey = cleanAddress.toLowerCase();
    if (geocodeCache[cacheKey]) {
      return geocodeCache[cacheKey];
    }

    // 🧭 Step 2: Progressive Search Strategy
    const candidates = [
      `${cleanAddress}, Malaysia`,
      `${cleanAddress}, Penang, Malaysia`,
      cleanAddress.split(',').slice(-2).join(', ') + ', Malaysia',
      cleanAddress.split(' ').slice(-3).join(' ') + ', Malaysia',
    ];

    for (const query of candidates) {
      const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=1&q=${encodeURIComponent(
        query
      )}`;

      const res = await fetch(url, {
        headers: {
          'User-Agent': 'SwamiyeNearMe/1.0 (contact@swamiyenearme.com)',
          'Accept-Language': 'en',
        },
      });

      const data = await res.json();

      if (Array.isArray(data) && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);
        geocodeCache[cacheKey] = { lat, lng };

        console.log('✅ Dynamic geocode success for:', query, lat, lng);
        return { lat, lng };
      }
    }

    console.warn('❌ No geocoding results for:', address);
    return null;
  } catch (err) {
    console.error('Geocoding error:', err);
    return null;
  }
}

/**
 * Compute straight-line (Haversine) distance between two coordinates in kilometers.
 */
export function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number | null {
  if (
    [lat1, lon1, lat2, lon2].some(
      (v) => typeof v !== 'number' || isNaN(v) || v === 0
    )
  ) {
    return null;
  }

  const R = 6371; // km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Fetch real driving distance (km) using your backend proxy API route.
 * Falls back to Haversine if the API fails.
 */
export async function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): Promise<number | null> {
  try {
    const url = `/api/distance?origins=${lat1},${lon1}&destinations=${lat2},${lon2}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.distance_km) {
      return data.distance_km; // ✅ actual driving distance from ORS
    }

    // fallback: Haversine
    const fallback = calculateHaversineDistance(lat1, lon1, lat2, lon2);
    if (fallback !== null) {
      console.warn('Falling back to Haversine distance.');
      return fallback;
    }

    return null;
  } catch (err) {
    console.error('Distance fetch failed:', err);
    const fallback = calculateHaversineDistance(lat1, lon1, lat2, lon2);
    return fallback;
  }
}

