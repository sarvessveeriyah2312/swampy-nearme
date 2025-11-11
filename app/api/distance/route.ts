import { NextResponse } from 'next/server';

/**
 * Proxy route to fetch driving distance from Google Maps Distance Matrix API
 * to bypass browser CORS restrictions and hide API key.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const origins = searchParams.get('origins');
  const destinations = searchParams.get('destinations');
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!origins || !destinations) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  const googleUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origins}&destinations=${destinations}&units=metric&key=${key}`;

  try {
    const res = await fetch(googleUrl);
    const data = await res.json();
    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // allow any origin
        'Access-Control-Allow-Methods': 'GET,OPTIONS',
      },
    });
  } catch (error) {
    console.error('Error fetching distance:', error);
    return NextResponse.json(
      { error: 'Failed to fetch distance' },
      { status: 500 }
    );
  }
}
