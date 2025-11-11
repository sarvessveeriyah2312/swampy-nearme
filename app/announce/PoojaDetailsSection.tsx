'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from 'lucide-react';

export function PoojaDetailsSection({ formData, handleChange }: any) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="title" className="text-gray-700 font-semibold">
          Pooja Title *
        </Label>
        <Input
          id="title"
          name="title"
          placeholder="e.g., Evening Ayyappa Bhajan at Home"
          value={formData.title}
          onChange={handleChange}
          required
          className="border-amber-200 focus:border-amber-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-gray-700 font-semibold">
          Description
        </Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Share details about the pooja, what to bring, dress code, etc."
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="border-amber-200 focus:border-amber-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="pooja_date" className="text-gray-700 font-semibold flex items-center gap-2">
          <Calendar className="h-4 w-4 text-amber-600" />
          Date & Time *
        </Label>
        <Input
          id="pooja_date"
          name="pooja_date"
          type="datetime-local"
          value={formData.pooja_date}
          onChange={handleChange}
          required
          className="border-amber-200 focus:border-amber-500"
        />
      </div>
    </>
  );
}
