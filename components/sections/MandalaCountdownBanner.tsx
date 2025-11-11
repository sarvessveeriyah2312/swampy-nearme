'use client';

import { Clock, Calendar } from 'lucide-react';

interface MandalaCountdownBannerProps {
  daysToMakaravilakku: number;
}

export default function MandalaCountdownBanner({ daysToMakaravilakku }: MandalaCountdownBannerProps) {
  return (
    <div className="bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800 text-white py-3 px-4">
      <div className="container mx-auto text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm md:text-base">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="font-semibold">Mandala Deeksha Period</span>
          </div>
          <div className="hidden sm:block">|</div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{daysToMakaravilakku} days to Makaravilakku</span>
          </div>
        </div>
      </div>
    </div>
  );
}
