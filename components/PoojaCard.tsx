'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Eye } from 'lucide-react';
import { Pooja } from '@/lib/supabase';
import { format } from 'date-fns';
import Link from 'next/link';
import { getCoordinatesFromAddress, calculateDistance } from '@/utils/locationUtils';

interface PoojaCardProps {
  pooja: Pooja;
}

export function PoojaCard({ pooja }: PoojaCardProps) {
  const [distance, setDistance] = useState<number | null>(null);
  const [userLat, setUserLat] = useState<number | null>(null);
  const [userLng, setUserLng] = useState<number | null>(null);
  const formattedDate = format(new Date(pooja.pooja_date), 'PPP p');

  // ✅ 1. Get user's current location automatically
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

  // ✅ 2. Compute distance once user location is known
  useEffect(() => {
    const fetchDistance = async () => {
      if (!userLat || !userLng) return; // wait for geolocation

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
        const dist = calculateDistance(userLat, userLng, poojaLat, poojaLng);
        if (dist && dist < 20000) setDistance(dist);
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

        {/* Distance (only when ready) */}
        {distance !== null && !isNaN(distance) && (
          <div className="text-sm font-semibold text-blue-600">
            {distance.toFixed(1)} km away
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
