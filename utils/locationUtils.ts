// utils/locationUtils.ts

/**
 * Get latitude and longitude from a full address using OpenStreetMap (Nominatim).
 * Includes fallback simplification and "Malaysia" context.
 */
export async function getCoordinatesFromAddress(address: string) {
  try {
    const query = `${address}, Malaysia`;

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=1&q=${encodeURIComponent(query)}`,
      {
        headers: {
          'User-Agent': 'SwamiyeNearMe/1.0 (contact@swamiyenearme.com)',
          'Accept-Language': 'en',
        },
      }
    );

    const data = await res.json();

    if (Array.isArray(data) && data.length > 0) {
      const lat = parseFloat(data[0].lat);
      const lng = parseFloat(data[0].lon);
      return { lat, lng };
    }

    // ✅ Fallback: simplified query (area + city only)
    const shortQuery = address
      .split(',')
      .slice(-2)
      .join(',')
      .concat(', Malaysia');

    const fallbackRes = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(shortQuery)}`,
      {
        headers: {
          'User-Agent': 'SwamiyeNearMe/1.0 (contact@swamiyenearme.com)',
          'Accept-Language': 'en',
        },
      }
    );

    const fallbackData = await fallbackRes.json();

    if (Array.isArray(fallbackData) && fallbackData.length > 0) {
      const lat = parseFloat(fallbackData[0].lat);
      const lng = parseFloat(fallbackData[0].lon);
      console.warn('Using fallback geocoding result for:', address);
      return { lat, lng };
    }

    console.warn('No geocoding results for address:', address);
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
    // ✅ Call your server-side proxy instead of Google directly
    const url = `/api/distance?origins=${lat1},${lon1}&destinations=${lat2},${lon2}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.rows?.[0]?.elements?.[0]?.distance?.value) {
      const meters = data.rows[0].elements[0].distance.value;
      return meters / 1000; // convert to km
    }

    // Fallback: Haversine
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
