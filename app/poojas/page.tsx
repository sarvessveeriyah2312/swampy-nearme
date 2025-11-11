'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePoojaStore } from '@/lib/store';

import { StatsSection } from './sections/StatsSection';
import { FiltersSection } from './sections/FiltersSection';
import { PoojaCard } from '@/components/PoojaCard';
import { useFetchPoojas, useUserLocation } from './hooks';
import { calculateDistance, filterPoojas, getUpcomingPoojasCount } from './utils';
import { EmptyState } from './sections/EmptyState';
import { FooterNote } from './sections/FooterNote';

export default function PoojasPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchByLocation, setSearchByLocation] = useState(''); // ✅ added
  const [loading, setLoading] = useState(true);
  const [filteredPoojas, setFilteredPoojas] = useState<any[]>([]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'today' | 'week' | 'month'>('all');
  const { poojas, setPoojas, userLocation, setUserLocation } = usePoojaStore();

  // ✅ Fetch and setup user location
  useFetchPoojas(setPoojas, setFilteredPoojas, setLoading);
  useUserLocation(setUserLocation);

  // ✅ Combined filters: search + date + location
  useEffect(() => {
    let baseFiltered = filterPoojas(poojas, searchQuery, activeFilter);

    // 🌍 Location-based filter
    if (searchByLocation.trim()) {
      baseFiltered = baseFiltered.filter((p) =>
        p.location_address?.toLowerCase().includes(searchByLocation.toLowerCase())
      );
    }

    setFilteredPoojas(baseFiltered);
  }, [searchQuery, poojas, activeFilter, searchByLocation]);

  // ✅ Sort by nearest first
  const poojasWithDistance = filteredPoojas
    .map((p) => ({
      ...p,
      distance: userLocation
        ? calculateDistance(userLocation.lat, userLocation.lng, p.location_lat, p.location_lng)
        : undefined,
    }))
    .sort((a, b) => (a.distance || Infinity) - (b.distance || Infinity));

  const upcomingCount = getUpcomingPoojasCount(poojas);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/30 via-white to-amber-50/20 py-8 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 📊 Header Stats */}
          <StatsSection count={upcomingCount} />

          {/* 🔍 Filters */}
          <FiltersSection
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            userLocation={userLocation}
            setSearchByLocation={setSearchByLocation} // ✅ now passed down
          />

          {/* 🕉️ Optional Area Banner */}
          {searchByLocation && (
            <div className="flex justify-center mb-8">
              <div className="bg-amber-100 border border-amber-300 px-6 py-2 rounded-full text-amber-800 font-medium shadow-sm">
                Showing poojas near <span className="font-semibold">{searchByLocation}</span> 
              </div>
            </div>
          )}

          {/* 📦 Pooja Cards or Loading/Empty States */}
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin"></div>
                <p className="text-amber-700 font-medium">Loading sacred poojas...</p>
              </div>
            </div>
          ) : filteredPoojas.length === 0 ? (
            <EmptyState searchQuery={searchQuery} activeFilter={activeFilter} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {poojasWithDistance.map((pooja, index) => (
                <motion.div
                  key={pooja.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <PoojaCard pooja={pooja} distance={pooja.distance} />
                </motion.div>
              ))}
            </div>
          )}

          {/* 🌺 Footer */}
          <FooterNote />
        </motion.div>
      </div>
    </div>
  );
}
