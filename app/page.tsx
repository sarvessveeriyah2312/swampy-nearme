'use client';

import { useEffect, useState } from 'react';
import { supabase, Pooja } from '@/lib/supabase';

// Section Components
import MandalaCountdownBanner from '@/components/sections/MandalaCountdownBanner';
import HeroSection from '@/components/sections/HeroSection';
import SpiritualSignificance from '@/components/sections/SpiritualSignificance';
import FeaturedPoojas from '@/components/sections/FeaturedPoojas';
import HowToAnnounce from '@/components/sections/HowToAnnounce';
import CommunitySection from '@/components/sections/CommunitySection';

export default function Home() {
  const [featuredPoojas, setFeaturedPoojas] = useState<Pooja[]>([]);
  const [loading, setLoading] = useState(true);
  const [daysToMakaravilakku, setDaysToMakaravilakku] = useState(0);

  // Calculate countdown
  useEffect(() => {
    const calculateDaysToMakaravilakku = () => {
      const today = new Date();
      const currentYear = today.getFullYear();
      const makaravilakkuDate = new Date(currentYear, 0, 14); // January 14th
      if (today > makaravilakkuDate) makaravilakkuDate.setFullYear(currentYear + 1);
      const diffTime = makaravilakkuDate.getTime() - today.getTime();
      setDaysToMakaravilakku(Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    };
    calculateDaysToMakaravilakku();
  }, []);

  // Fetch featured poojas
  useEffect(() => {
    async function fetchFeaturedPoojas() {
      const { data } = await supabase
        .from('poojas')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false })
        .limit(3);
      if (data) setFeaturedPoojas(data);
      setLoading(false);
    }
    fetchFeaturedPoojas();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-amber-50">
      <MandalaCountdownBanner daysToMakaravilakku={daysToMakaravilakku} />
      <HeroSection />
      <SpiritualSignificance />
      <FeaturedPoojas poojas={featuredPoojas} loading={loading} />
      <HowToAnnounce />
      <CommunitySection />
    </div>
  );
}
