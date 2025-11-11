'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Eye } from 'lucide-react';
import { Pooja } from '@/lib/supabase';
import { format } from 'date-fns';
import Link from 'next/link';

interface PoojaCardProps {
  pooja: Pooja;
  distance?: number;
}

export function PoojaCard({ pooja, distance }: PoojaCardProps) {
  const formattedDate = format(new Date(pooja.pooja_date), 'PPP p');

  return (
    <Card className="hover:shadow-xl transition-all duration-300 border-2 border-amber-100 hover:border-amber-300">
      <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50">
        <CardTitle className="text-xl text-amber-900">{pooja.title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-3">
        <div className="flex items-start gap-2 text-sm text-gray-700">
          <Calendar className="h-4 w-4 text-amber-600 mt-0.5" />
          <span>{formattedDate}</span>
        </div>

        <div className="flex items-start gap-2 text-sm text-gray-700">
          <MapPin className="h-4 w-4 text-amber-600 mt-0.5" />
          <span>{pooja.location_address || 'Location provided'}</span>
        </div>

        {distance && (
          <div className="text-sm font-semibold text-blue-600">
            {distance.toFixed(1)} km away
          </div>
        )}

        <p className="text-sm text-gray-600 line-clamp-2">{pooja.description}</p>

        <Link href={`/pooja/${pooja.id}`} className="block">
          <Button className="w-full bg-amber-600 hover:bg-amber-700">
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
