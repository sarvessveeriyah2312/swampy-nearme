'use client';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Filter, Clock, Calendar, Navigation, X } from 'lucide-react';

export const FiltersSection = ({
  searchQuery,
  setSearchQuery,
  activeFilter,
  setActiveFilter,
  userLocation,
  setSearchByLocation, // 🆕 parent function to trigger location-based filtering
}: any) => {
  const [locationName, setLocationName] = useState<string | null>(null);
  const [isFilteringByLocation, setIsFilteringByLocation] = useState(false);

  // 🗺️ Reverse Geocoding to get readable address
  useEffect(() => {
    async function fetchLocationName() {
      if (userLocation?.lat && userLocation?.lng) {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${userLocation.lat}&lon=${userLocation.lng}`
          );
          const data = await response.json();
          if (data?.address) {
            const { suburb, city, town, state, country } = data.address;
            const locality =
              suburb || city || town
                ? `${suburb || city || town}, ${state || ''}, ${country || ''}`
                : `${state || ''}, ${country || ''}`;
            setLocationName(locality);
          }
        } catch (err) {
          console.warn('Failed to fetch location name:', err);
        }
      }
    }
    fetchLocationName();
  }, [userLocation]);

  // 🌙 Current month name for display
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });

  // 🧭 Handle location click
  const handleLocationClick = () => {
    if (locationName) {
      if (isFilteringByLocation) {
        // remove location filter
        setIsFilteringByLocation(false);
        setSearchByLocation('');
      } else {
        // apply location filter
        setIsFilteringByLocation(true);
        setSearchByLocation(locationName.split(',')[0]); // just use area/city
      }
    }
  };

  return (
    <div className="w-full flex justify-center mb-10 px-4">
      {/* 🧭 Expanded Card Container */}
      <div className="w-full max-w-6xl bg-white/85 backdrop-blur-lg rounded-3xl p-8 border border-amber-200/70 shadow-[0_4px_25px_rgba(255,193,7,0.1)]">
        {/* 🔍 Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-500 h-5 w-5" />
          <Input
            type="text"
            placeholder="Search by pooja name, location, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-4 py-5 text-lg border-2 border-amber-200 focus:border-amber-500 rounded-2xl bg-amber-50/40 focus:ring-2 focus:ring-amber-300 transition-all w-full"
          />
        </div>

        {/* ⏰ Time Filters */}
        <div className="flex flex-wrap gap-3 mb-6 justify-center sm:justify-start">
          {[
            { key: 'all', label: 'All Poojas', icon: Filter },
            { key: 'today', label: 'Today', icon: Clock },
            { key: 'week', label: 'This Week', icon: Calendar },
            { key: 'month', label: `This ${currentMonth}`, icon: Calendar },
          ].map(({ key, label, icon: Icon }) => (
            <Button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={`flex items-center gap-2 rounded-full px-6 py-2.5 text-sm sm:text-base font-medium transition-all duration-300 ${
                activeFilter === key
                  ? 'bg-gradient-to-r from-amber-600 to-orange-500 text-white shadow-lg scale-[1.04]'
                  : 'bg-white/70 border border-amber-200 text-amber-700 hover:bg-amber-50'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Button>
          ))}
        </div>

        {/* 📍 Location Display (Clickable Filter) */}
        <div className="flex items-center justify-center sm:justify-start mt-6">
          {userLocation ? (
            <button
              onClick={handleLocationClick}
              className={`flex items-center gap-2 text-amber-900 bg-gradient-to-r px-5 py-2.5 rounded-xl shadow-inner transition-all duration-300 ${
                isFilteringByLocation
                  ? 'from-orange-200 to-amber-100 border border-amber-400 shadow-md'
                  : 'from-yellow-100 to-amber-50 hover:from-yellow-200'
              }`}
            >
              <MapPin className="h-5 w-5 text-amber-700" />
              <span className="text-sm sm:text-base font-medium">
                {locationName
                  ? isFilteringByLocation
                    ? `Filtering: ${locationName}`
                    : `${locationName}`
                  : 'Detecting your location...'}
              </span>
              {isFilteringByLocation && <X className="w-4 h-4 text-amber-700 ml-2" />}
            </button>
          ) : (
            <div className="flex items-center gap-2 text-amber-700 bg-amber-50 px-5 py-2.5 rounded-xl border border-amber-100 shadow-sm">
              <Navigation className="h-4 w-4" />
              <span className="text-sm sm:text-base font-medium">
                Enable location to show your area
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
