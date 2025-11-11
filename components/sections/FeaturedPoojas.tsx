'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Plus, Sparkles } from 'lucide-react';
import { PoojaCard } from '@/components/PoojaCard';
import Link from 'next/link';
import { Pooja } from '@/lib/supabase';

interface FeaturedPoojasProps {
  poojas: Pooja[];
  loading: boolean;
}

export default function FeaturedPoojas({ poojas, loading }: FeaturedPoojasProps) {
  return (
    <section className="relative py-20 px-6 bg-gradient-to-b from-amber-50 via-white to-orange-50 overflow-hidden">
      {/* Glowing Aura Decoration */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[70%] h-[250px] bg-gradient-to-b from-yellow-300/30 to-transparent blur-3xl opacity-50" />
      <div className="absolute bottom-0 right-1/2 transform translate-x-1/2 w-[80%] h-[200px] bg-gradient-to-t from-orange-200/40 to-transparent blur-3xl opacity-40" />

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm mb-4">
            <Sparkles className="h-4 w-4 text-amber-700" />
            Blessed Events & Gatherings
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4 font-serif tracking-tight">
            Featured <span className="text-amber-600">Poojas</span>
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Explore sacred gatherings taking place near you. Immerse yourself in bhajans, rituals, and divine
            experiences shared by devotees of Lord Ayyappa.
          </p>
        </motion.div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-3 text-amber-700">
              <div className="w-6 h-6 border-2 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="font-medium">Loading sacred poojas...</span>
            </div>
          </div>
        ) : poojas.length > 0 ? (
          <>
            {/* Cards Grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.15 },
                },
              }}
            >
              {poojas.map((pooja, index) => (
                <motion.div
                  key={pooja.id}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                  className="relative group"
                >
                  {/* Glow behind each card */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-yellow-200/30 via-orange-100/20 to-transparent blur-2xl rounded-3xl opacity-0 group-hover:opacity-70 transition-opacity duration-500" />
                  <PoojaCard pooja={pooja} />
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              className="text-center mt-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link href="/poojas">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-amber-700 to-orange-700 hover:from-amber-800 hover:to-orange-800 text-white shadow-lg font-semibold transition-all duration-300 hover:shadow-2xl"
                >
                  View All Sacred Gatherings
                </Button>
              </Link>
            </motion.div>
          </>
        ) : (
          /* Empty State */
          <motion.div
            className="text-center py-16 bg-white/60 rounded-2xl border-2 border-dashed border-amber-300 max-w-xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
              <Plus className="h-8 w-8 text-amber-700" />
            </div>
            <p className="text-gray-600 mb-4 font-medium">
              No poojas have been announced yet. Be the first to initiate a sacred gathering!
            </p>
            <Link href="/announce">
              <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 shadow-lg font-semibold">
                Announce First Pooja
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
