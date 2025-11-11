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

  const formattedDate = pooja.pooja_date
    ? format(new Date(pooja.pooja_date), 'PPP p')
    : 'Date not available';

  // ✅ 1. Get user's current location
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLat(pos.coords.latitude);
        setUserLng(pos.coords.longitude);
      },
      () => {
        // ignored silently
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
        const dist = await calculateDistance(userLat, userLng, poojaLat, poojaLng);
        if (dist && dist < 20000) {
          setDistance(dist);
          setDistanceType(
            process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? 'driving' : 'haversine'
          );
        }
      }
    };

    fetchDistance();
  }, [userLat, userLng, pooja]);

  return (
    <Card className="hover:shadow-xl transition-all duration-300 border-2 border-amber-100 hover:border-amber-300 rounded-2xl overflow-hidden min-h-[340px] flex flex-col justify-between">
      {/* Header */}
      <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50">
        <CardTitle className="text-xl text-amber-900 font-semibold">
          {pooja.title || 'Untitled Pooja'}
        </CardTitle>
      </CardHeader>

      {/* Content */}
      <CardContent className="flex flex-col justify-between flex-grow pt-4 space-y-4 sm:space-y-3">
        <div className="space-y-3">
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

          {/* ✅ Distance (moved up for visibility) */}
          {distance !== null && !isNaN(distance) && (
            <div className="flex items-center gap-2 text-sm text-gray-700 font-medium flex-wrap">
              {distanceType === 'driving' ? (
                <>
                  <Route className="h-4 w-4 text-amber-600" />
                  <span>Driving: {distance.toFixed(1)} km</span>
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
          <p className="text-sm text-gray-600 line-clamp-3 sm:line-clamp-2">
            {pooja.description || 'No description provided.'}
          </p>
        </div>

        {/* ✅ View Details Button */}
        <Button
          asChild
          className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg mt-3 sm:mt-4"
        >
          <Link href={`/pooja/${pooja.id}`}>
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
