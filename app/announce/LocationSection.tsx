'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

export function LocationSection({ formData, handleChange, handleGetLocation }: any) {
  return (
    <div className="space-y-4 border-t border-amber-200 pt-4">
      <Label className="text-gray-700 font-semibold flex items-center gap-2">
        <MapPin className="h-4 w-4 text-amber-600" />
        Location *
      </Label>

      <Input
        id="location_address"
        name="location_address"
        placeholder="Full address"
        value={formData.location_address}
        onChange={handleChange}
        required
        className="border-amber-200 focus:border-amber-500"
      />

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="location_lat" className="text-sm text-gray-600">
            Latitude (optional)
          </Label>
          <Input
            id="location_lat"
            name="location_lat"
            type="number"
            step="any"
            placeholder="Optional"
            value={formData.location_lat || ''}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location_lng" className="text-sm text-gray-600">
            Longitude (optional)
          </Label>
          <Input
            id="location_lng"
            name="location_lng"
            type="number"
            step="any"
            placeholder="Optional"
            value={formData.location_lng || ''}
            onChange={handleChange}
          />
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={handleGetLocation}
        className="w-full border-amber-300 text-amber-700 hover:bg-amber-50"
      >
        <MapPin className="mr-2 h-4 w-4" />
        Use My Current Location
      </Button>
    </div>
  );
}
