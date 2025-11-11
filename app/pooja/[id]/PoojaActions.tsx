'use client';
import { Button } from '@/components/ui/button';
import { Calendar, Navigation, Clock } from 'lucide-react';
import { format } from 'date-fns';

export const PoojaActions = ({ pooja, toast }: any) => {
  const handleGetDirections = () => {
    const hasCoordinates =
      pooja.location_lat &&
      pooja.location_lng &&
      !isNaN(Number(pooja.location_lat)) &&
      !isNaN(Number(pooja.location_lng));

    let googleMapsUrl = '';

    if (hasCoordinates) {
      googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${pooja.location_lat},${pooja.location_lng}`;
    } else if (pooja.location_address) {
      googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
        pooja.location_address
      )}`;
    } else {
      toast({
        title: 'Missing location',
        description: 'No address or coordinates found for this pooja.',
        variant: 'destructive',
      });
      return;
    }

    window.open(googleMapsUrl, '_blank');
  };

  const handleAddToCalendar = () => {
    const eventDate = new Date(pooja.pooja_date);
    const endDate = new Date(eventDate.getTime() + 2 * 60 * 60 * 1000); // +2 hrs

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//SwamiyeNearMe//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${Date.now()}@swamiye-nearme.app`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTSTART:${eventDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTEND:${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `SUMMARY:${pooja.title}`,
      `DESCRIPTION:${pooja.description || ''}`,
      `LOCATION:${pooja.location_address || 'Unknown location'}`,
      'BEGIN:VALARM',
      'TRIGGER:-P1D', // 1 day before
      'ACTION:DISPLAY',
      'DESCRIPTION:Reminder - Your sacred pooja starts tomorrow 🙏',
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\n');

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${pooja.title.replace(/\s+/g, '_')}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: 'Calendar event created 📅',
      description: 'A 1-day reminder has been added to your calendar',
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-amber-900 font-serif flex items-center gap-3">
        <Clock className="h-5 w-5 text-amber-600" />
        Quick Actions
      </h3>

      <div className="space-y-3">
        <Button
          onClick={handleGetDirections}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl py-6 justify-start"
        >
          <Navigation className="mr-3 h-5 w-5" />
          Get Directions
        </Button>

        <Button
          onClick={handleAddToCalendar}
          variant="outline"
          className="w-full border-amber-300 text-amber-700 hover:bg-amber-50 font-semibold rounded-xl py-6 justify-start"
        >
          <Calendar className="mr-3 h-5 w-5" />
          Add to Calendar
        </Button>
      </div>
    </div>
  );
};
