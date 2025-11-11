'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Users, Calendar } from 'lucide-react';

export default function SpiritualSignificance() {
  const items = [
    {
      icon: <span className="text-white font-bold text-lg">48</span>,
      title: 'Days of Penance',
      desc: 'A sacred period of discipline, simplicity, and deep devotion to Lord Ayyappa.',
      color: 'from-amber-500 to-orange-500',
    },
    {
      icon: <Users className="h-6 w-6 text-white" />,
      title: 'Community Worship',
      desc: 'Collective prayer amplifies spiritual energy — unity through bhajans and rituals.',
      color: 'from-orange-500 to-amber-600',
    },
    {
      icon: <Calendar className="h-6 w-6 text-white" />,
      title: 'Sacred Timeline',
      desc: 'The divine journey from the first day of Vrichikam to the auspicious Makaravilakku.',
      color: 'from-amber-600 to-yellow-500',
    },
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-amber-50 via-white to-amber-100 relative overflow-hidden">
      {/* Decorative Aura Gradient */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[80%] h-[300px] bg-gradient-to-b from-yellow-200/40 to-transparent rounded-full blur-3xl opacity-40" />

      <div className="container mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-5 py-2 rounded-full text-sm font-semibold tracking-wide shadow-sm">
            <Clock className="h-4 w-4" />
            48 Days of Spiritual Journey
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4 font-serif tracking-tight">
            Mandala Deeksha <span className="text-amber-600">Significance</span>
          </h2>
          <p className="text-gray-700 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            The Mandala Deeksha marks forty-one days of sacred transformation — where body, mind, and soul align
            towards devotion, purity, and the divine light of Lord Ayyappa.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-b from-white to-amber-50 border border-amber-200/50 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 group">
                <CardContent className="pt-10 pb-8 text-center relative">
                  {/* Glowing Halo */}
                  <div
                    className={`absolute top-6 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gradient-to-br ${item.color} rounded-full blur-2xl opacity-30 group-hover:opacity-60 transition-opacity`}
                  />
                  <div
                    className={`relative w-14 h-14 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}
                  >
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-amber-900 text-lg mb-3 group-hover:text-amber-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Subtle Divider Text */}
        <div className="text-center mt-16">
          <p className="text-amber-800 text-sm italic">
            “The 48 days are not just a countdown — they are a climb within, a sacred ascent toward the divine.”
          </p>
        </div>
      </div>
    </section>
  );
}
