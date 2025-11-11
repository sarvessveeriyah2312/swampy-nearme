'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MapPin, Plus, Users } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden text-white">
      {/* Background Image - Sabarimala */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://amritkatha.in/wp-content/uploads/2024/07/sabarimala-1536x864.jpg')",
        }}
      />

      {/* Transparent Orange Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-700/80 via-orange-700/80 to-amber-800/70 backdrop-blur-[1px]" />

      {/* Sacred Light Rays Overlay */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(255,255,255,0.35) 1px, transparent 0),
            radial-gradient(circle at 80% 70%, rgba(255,255,255,0.25) 1px, transparent 0)
          `,
          backgroundSize: '60px 60px, 40px 40px',
        }}
      />

      {/* Content */}
      <div className="container relative z-10 text-center px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-6"
        >
          {/* Glowing Sacred Emblem */}
          <div className="flex justify-center mb-2">
            <div className="w-20 h-20 rounded-full border-4 border-yellow-300 flex items-center justify-center shadow-[0_0_60px_rgba(255,255,0,0.3)]">
              <div className="w-10 h-10 rounded-full bg-yellow-300/80 blur-[1px]" />
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-serif tracking-tight leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            Swamiye <span className="text-yellow-300">Saranam</span> Ayyappa
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-lg lg:text-xl max-w-3xl mx-auto text-amber-100 leading-relaxed drop-shadow-md">
            Experience the divine aura of Sabarimala. Discover sacred poojas, bhajans, and connect 
            with fellow devotees in devotion and unity during your Mandala Deeksha.
          </p>

          {/* Devotee Count */}
          <div className="flex items-center justify-center gap-2 text-amber-200 text-sm md:text-base mt-4">
            <Users className="h-4 w-4" />
            <span>Join 1,000+ devotees on this sacred journey</span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Link href="/poojas">
              <Button
                size="lg"
                className="bg-yellow-400 text-amber-900 hover:bg-yellow-300 font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <MapPin className="mr-2 h-5 w-5" />
                Find Poojas Near Me
              </Button>
            </Link>

            <Link href="/announce">
              <Button
                size="lg"
                variant="outline"
                className="border-yellow-400 text-yellow-300 hover:bg-yellow-300/10 font-semibold backdrop-blur-md shadow-lg"
              >
                <Plus className="mr-2 h-5 w-5" />
                Announce Pooja
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Gradient fade at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
    </section>
  );
}
