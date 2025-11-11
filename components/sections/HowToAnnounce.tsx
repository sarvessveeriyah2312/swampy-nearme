'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function HowToAnnounce() {
  const steps = [
    {
      step: 1,
      title: 'Fill Sacred Details',
      desc: 'Enter the pooja name, date, time, and add any rituals or bhajans you plan to include.',
      icon: '🕉️',
      color: 'from-amber-500 to-orange-500',
    },
    {
      step: 2,
      title: 'Share Location',
      desc: 'Pin the exact temple, hall, or venue on the map so nearby devotees can join easily.',
      icon: '📍',
      color: 'from-orange-500 to-amber-600',
    },
    {
      step: 3,
      title: 'Connect Devotees',
      desc: 'Your event will be shared instantly with Ayyappa devotees nearby, fostering unity and devotion.',
      icon: '👥',
      color: 'from-amber-600 to-yellow-500',
    },
  ];

  return (
    <section className="relative py-20 px-6 bg-gradient-to-b from-white via-amber-50/60 to-orange-50/30 overflow-hidden">
      {/* Ambient background aura */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[70%] h-[300px] bg-gradient-to-b from-yellow-200/30 to-transparent blur-3xl opacity-40" />
      <div className="absolute bottom-0 right-1/2 transform translate-x-1/2 w-[80%] h-[200px] bg-gradient-to-t from-orange-200/30 to-transparent blur-3xl opacity-40" />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm mb-4">
              🙏 Step-by-Step Guide
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4 font-serif tracking-tight">
              Organize <span className="text-amber-600">Sacred Gathering</span>
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
              Share your devotion by announcing your pooja. It takes just three sacred steps to bring the community together in worship.
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto relative">
            {steps.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="relative group"
              >
                {/* Connector lines between cards (desktop only) */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 right-[-2rem] w-16 h-[2px] bg-gradient-to-r from-amber-400/60 to-orange-400/60 blur-sm" />
                )}

                <Card className="relative border border-amber-200/60 bg-gradient-to-b from-white to-amber-50/50 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:border-amber-300 group">
                  {/* Glowing Aura Behind Icon */}
                  <div
                    className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-gradient-to-br ${item.color} rounded-full blur-3xl opacity-20 group-hover:opacity-50 transition-opacity`}
                  />

                  <CardHeader className="text-center pt-10 pb-4 relative">
                    <div
                      className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center mx-auto shadow-lg text-2xl`}
                    >
                      {item.icon}
                    </div>
                    <div className="mt-4 font-bold text-xl text-amber-900">{item.title}</div>
                  </CardHeader>

                  <CardContent className="pt-2 pb-8">
                    <p className="text-gray-600 text-sm text-center leading-relaxed">{item.desc}</p>
                  </CardContent>

                  {/* Step Number */}
                  <div className="absolute -top-4 left-4 w-8 h-8 bg-amber-600 text-white text-sm rounded-full flex items-center justify-center font-semibold shadow-md">
                    {item.step}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/announce">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <Plus className="mr-2 h-5 w-5" />
                Announce Sacred Pooja
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
