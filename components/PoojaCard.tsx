'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Eye, Navigation, Route } from 'lucide-react';
import { Pooja } from '@/lib/supabase';
import { format } from 'date-fns';
import Link from 'next/link';
import { getCoordinatesFromAddress, calculateDistance } from '@/utils/locationUtils';

interface PoojaCardProps {
  pooja: Pooja;
  distance?: number;
}

export function PoojaCard({ pooja }: PoojaCardProps) {
  const [distance, setDistance] = useState<number | null>(null);
  const [distanceType, setDistanceType] = useState<'driving' | 'haversine' | null>(null);
  const [userLat, setUserLat] = useState<number | null>(null);
  const [userLng, setUserLng] = useState<number | null>(null);
  const formattedDate = format(new Date(pooja.pooja_date), 'PPP p');

  // ✅ 1. Get user's current location
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLat(pos.coords.latitude);
        setUserLng(pos.coords.longitude);
      },
      () => {
        console.warn('Unable to fetch user location');
      }
    );
  }, []);

  // ✅ 2. Compute distance (Google API or Haversine fallback)
  useEffect(() => {
    const fetchDistance = async () => {
      if (!userLat || !userLng) return;

      let poojaLat = pooja.location_lat;
      let poojaLng = pooja.location_lng;

      const isInvalid =
        !poojaLat ||
        !poojaLng ||
        isNaN(Number(poojaLat)) ||
        isNaN(Number(poojaLng)) ||
        poojaLat === 0 ||
        poojaLng === 0;

      if (isInvalid && pooja.location_address) {
        const coords = await getCoordinatesFromAddress(pooja.location_address);
        if (coords) {
          poojaLat = coords.lat;
          poojaLng = coords.lng;
        }
      }

      if (poojaLat && poojaLng) {
        // ✅ Fetch actual driving distance (or fallback to Haversine)
        const dist = await calculateDistance(userLat, userLng, poojaLat, poojaLng);
        if (dist && dist < 20000) {
          setDistance(dist);
          // detect type based on env key presence
          if (process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
            setDistanceType('driving');
          } else {
            setDistanceType('haversine');
          }
        }
      }
    };

    fetchDistance();
  }, [userLat, userLng, pooja]);

  return (
    <Card className="hover:shadow-xl transition-all duration-300 border-2 border-amber-100 hover:border-amber-300">
      {/* Header */}
      <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50">
        <CardTitle className="text-xl text-amber-900 font-semibold">
          {pooja.title}
        </CardTitle>
      </CardHeader>

      {/* Content */}
      <CardContent className="pt-4 space-y-3">
        {/* Date */}
        <div className="flex items-start gap-2 text-sm text-gray-700">
          <Calendar className="h-4 w-4 text-amber-600 mt-0.5" />
          <span>{formattedDate}</span>
        </div>

        {/* Address */}
        <div className="flex items-start gap-2 text-sm text-gray-700">
          <MapPin className="h-4 w-4 text-amber-600 mt-0.5" />
          <span>{pooja.location_address || 'Location not provided'}</span>
        </div>

        {/* ✅ Distance (with icon + dynamic label) */}
        {distance !== null && !isNaN(distance) && (
          <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
            {distanceType === 'driving' ? (
              <>
                <Route className="h-4 w-4 text-amber-600" />
                <span>Driving distance: {distance.toFixed(1)} km</span>
              </>
            ) : (
              <>
                <Navigation className="h-4 w-4 text-amber-600" />
                <span>Approx. {distance.toFixed(1)} km away</span>
              </>
            )}
          </div>
        )}

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2">
          {pooja.description || 'No description provided.'}
        </p>

        {/* View Button */}
        <Link href={`/pooja/${pooja.id}`} className="block">
          <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg">
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
