'use client';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export const HeaderSection = () => (
  <section className="relative overflow-hidden py-20 sm:py-28 bg-gradient-to-b from-amber-900 via-amber-800 to-amber-700 text-white rounded-b-[3rem] shadow-2xl">
    {/* Decorative Orbs */}
    <div className="absolute top-10 left-10 w-40 h-40 bg-yellow-400/20 rounded-full blur-3xl animate-pulse" />
    <div className="absolute bottom-10 right-10 w-56 h-56 bg-orange-400/10 rounded-full blur-3xl animate-pulse" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,200,120,0.15),transparent_60%)]" />

    <div className="container relative mx-auto text-center z-10">
      {/* Subtext Badge */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="inline-flex items-center gap-2 bg-yellow-400/20 text-yellow-100 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium mb-6"
      >
        <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
        Mandala Season 2025 – Join the Sacred Journey
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9 }}
        className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-yellow-300 tracking-wide drop-shadow-[0_3px_8px_rgba(0,0,0,0.4)]"
      >
        Swamiye&nbsp;
        <span className="bg-gradient-to-r from-yellow-200 via-amber-100 to-yellow-300 bg-clip-text text-transparent">
          Saranam&nbsp;Ayyappa
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-5 text-amber-100 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
      >
        Discover, announce, and join sacred <span className="text-yellow-200 font-semibold">Poojas</span> near you.  
        Unite devotees and illuminate your Mandala Deeksha journey.
      </motion.p>

      {/* Glowing Divider */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-10 flex justify-center"
      >
        <div className="h-[3px] w-24 sm:w-32 bg-gradient-to-r from-yellow-400 via-orange-300 to-yellow-400 rounded-full shadow-[0_0_15px_rgba(255,193,7,0.7)]" />
      </motion.div>
    </div>

    {/* Bottom Glow */}
    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-amber-800 via-amber-700/50 to-transparent" />
  </section>
);
