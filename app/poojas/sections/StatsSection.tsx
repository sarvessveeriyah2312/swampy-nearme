'use client';
import { motion } from 'framer-motion';
import { Calendar, Users, Clock } from 'lucide-react';

export const StatsSection = ({ count }: { count: number }) => (
  <section className="relative mb-12">
    {/* Background Aura */}
    <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-amber-100/40 to-transparent rounded-3xl blur-2xl opacity-60"></div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10"
    >
      {/* 🪔 Upcoming Poojas */}
      <div className="bg-white/80 backdrop-blur-xl border border-yellow-200/60 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex items-center gap-4 group">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-300 to-amber-500 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">
          <Calendar className="w-7 h-7 text-amber-900" />
        </div>
        <div>
          <p className="text-3xl font-bold text-amber-900">{count}</p>
          <p className="text-sm text-amber-700 font-medium tracking-wide">Upcoming Poojas</p>
        </div>
      </div>

      {/* 👥 Active Devotees */}
      <div className="bg-white/80 backdrop-blur-xl border border-green-200/60 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex items-center gap-4 group">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-300 to-green-500 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">
          <Users className="w-7 h-7 text-green-900" />
        </div>
        <div>
          <p className="text-3xl font-bold text-green-900">1M+</p>
          <p className="text-sm text-green-700 font-medium tracking-wide">Active Devotees</p>
        </div>
      </div>

      {/* 🕉️ Mandala Days */}
      <div className="bg-white/80 backdrop-blur-xl border border-blue-200/60 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex items-center gap-4 group">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-300 to-indigo-500 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">
          <Clock className="w-7 h-7 text-blue-900" />
        </div>
        <div>
          <p className="text-3xl font-bold text-blue-900">48</p>
          <p className="text-sm text-blue-700 font-medium tracking-wide">Mandala Days</p>
        </div>
      </div>
    </motion.div>

    {/* Bottom Glow Line */}
    {/* <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-[3px] bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-300 rounded-full mt-10 shadow-[0_0_25px_rgba(255,196,0,0.8)]"></div> */}
  </section>
);
