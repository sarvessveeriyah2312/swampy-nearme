'use client';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

export const PoojaVenue = ({ pooja }: any) => {
  const hasCoordinates =
    pooja.location_lat !== null &&
    pooja.location_lng !== null &&
    pooja.location_lat !== '' &&
    pooja.location_lng !== undefined &&
    !isNaN(Number(pooja.location_lat)) &&
    !isNaN(Number(pooja.location_lng));

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-amber-900 font-serif flex items-center gap-3">
        <MapPin className="h-5 w-5 text-amber-600" />
        Venue Details
      </h3>

      <Card className="border-amber-200 bg-amber-50/30">
        <CardContent className="p-4">
          <p className="text-gray-700 mb-3">{pooja.location_address}</p>

          {hasCoordinates && (
            <div className="text-sm text-gray-600 space-y-1">
              <p>📍 Latitude: {Number(pooja.location_lat).toFixed(6)}</p>
              <p>📍 Longitude: {Number(pooja.location_lng).toFixed(6)}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
