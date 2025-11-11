'use client';
import { Calendar, MapPin } from 'lucide-react';
import { format } from 'date-fns';

export const PoojaHeader = ({ pooja }: any) => {
  const formattedDate = format(new Date(pooja.pooja_date), 'EEEE, MMMM d, yyyy');
  const formattedTime = format(new Date(pooja.pooja_date), 'h:mm a');
  const isUpcoming = new Date(pooja.pooja_date) > new Date();

  return (
    <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white p-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-yellow-400/5 rounded-full -translate-x-12 translate-y-12"></div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 font-serif text-yellow-50 leading-tight">
            {pooja.title}
          </h1>
          <div className="flex flex-wrap gap-6 text-amber-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center">
                <Calendar className="h-5 w-5 text-yellow-200" />
              </div>
              <div>
                <p className="font-semibold text-yellow-100">{formattedDate}</p>
                <p className="text-sm text-amber-200">{formattedTime}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center">
                <MapPin className="h-5 w-5 text-yellow-200" />
              </div>
              <p className="max-w-xs">{pooja.location_address}</p>
            </div>
          </div>
        </div>

        {isUpcoming && (
          <div className="bg-green-500/20 border border-green-400/30 text-green-100 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
            🕉️ Upcoming Sacred Gathering
          </div>
        )}
      </div>
    </div>
  );
};
