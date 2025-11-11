import { NextResponse } from 'next/server';

// app/api/distance/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const origins = searchParams.get('origins');
  const destinations = searchParams.get('destinations');
  const key = process.env.OPENROUTESERVICE_API_KEY;

  if (!origins || !destinations) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  if (!key) {
    return NextResponse.json(
      { error: 'OpenRouteService API key not configured' },
      { status: 500 }
    );
  }

  // ORS expects longitude,latitude order
  const [originLat, originLon] = origins.split(',').map(Number);
  const [destLat, destLon] = destinations.split(',').map(Number);

  const orsUrl = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${key}&start=${originLon},${originLat}&end=${destLon},${destLat}`;

  try {
    const res = await fetch(orsUrl);
    const data = await res.json();

    if (!data || !data.features || data.features.length === 0) {
      console.error('OpenRouteService error:', data);
      return NextResponse.json({ error: 'No route found' }, { status: 400 });
    }

    const meters = data.features[0].properties.summary.distance;
    const km = meters / 1000;

    return NextResponse.json({ distance_km: km, source: 'openrouteservice' });
  } catch (error) {
    console.error('Error fetching ORS distance:', error);
    return NextResponse.json({ error: 'Failed to fetch distance' }, { status: 500 });
  }
}
