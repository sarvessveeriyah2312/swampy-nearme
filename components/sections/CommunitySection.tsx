'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';

export default function CommunitySection() {
  const handleShare = async () => {
    const shareData = {
      title: 'Swamiye NearMe',
      text: '🙏 Join the Swamiye NearMe community — discover nearby poojas and unite with Ayyappa devotees!',
      url:
        typeof window !== 'undefined'
          ? window.location.href
          : 'https://swamiyenearme.com',
    };

    try {
      // ✅ 1. Native Web Share API
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      // ✅ 2. Clipboard API fallback
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        await navigator.clipboard.writeText(shareData.url);
        alert('🔗 Link copied to clipboard!');
        return;
      }

      // ✅ 3. Manual input fallback
      const tempInput = document.createElement('input');
      tempInput.value = shareData.url;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
      alert('🔗 Link copied to clipboard!');
    } catch (err: any) {
      // 🧘 Ignore user cancelation — normal behavior
      if (err.name === 'AbortError') {
        console.log('User canceled the share action.');
        return;
      }
      console.error('Error sharing:', err);
    }
  };

  return (
    <section className="relative py-20 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-amber-900 via-orange-800 to-amber-700 text-white overflow-hidden">
      {/* Decorative Background Orbs */}
      <div className="absolute top-10 left-10 w-32 sm:w-40 h-32 sm:h-40 bg-yellow-400/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-52 sm:w-64 h-52 sm:h-64 bg-orange-400/10 rounded-full blur-3xl animate-pulse" />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 sm:gap-12"
        >
          {/* ✨ Left Text Section */}
          <div className="text-center md:text-left space-y-6 sm:space-y-8">
            <div className="inline-flex items-center bg-yellow-300/20 text-yellow-100 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium tracking-wide mx-auto md:mx-0">
              🙏 Join the Divine Collective
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-yellow-300 leading-tight drop-shadow-[0_3px_8px_rgba(0,0,0,0.4)]">
              Unite in Devotion,
              <br className="hidden sm:block" />
              <span className="text-yellow-200"> Share the Spiritual Light ✨</span>
            </h2>

            <p className="text-amber-100 text-sm sm:text-base md:text-lg leading-relaxed max-w-md mx-auto md:mx-0 px-2 sm:px-0">
              Be part of a growing community of Ayyappa devotees.
              Receive updates on poojas, join bhajan gatherings, and share sacred energy wherever you are.
            </p>

            {/* 🟡 Single Yellow Share Button */}
            <div className="flex justify-center md:justify-start pt-2 sm:pt-4">
              <Button
                size="lg"
                onClick={handleShare}
                className="bg-yellow-400 hover:bg-yellow-300 text-amber-900 font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 w-full sm:w-auto"
              >
                <Share2 className="mr-2 h-5 w-5" />
                Share with Devotees
              </Button>
            </div>
          </div>

          {/* 🕯️ Right Spiritual Quote Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mt-10 sm:mt-0"
          >
            {/* Aura Glow */}
            <div className="absolute -inset-4 sm:-inset-6 bg-gradient-to-br from-yellow-300/40 via-orange-400/30 to-transparent blur-3xl opacity-60 animate-pulse" />

            <div className="relative bg-white/10 backdrop-blur-md border border-yellow-400/30 rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-xl text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-3 sm:mb-4">
                <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-base sm:text-lg font-bold text-amber-900 shadow-inner">
                  🕯️
                </div>
              </div>

              <p className="text-amber-100 italic leading-relaxed text-xs sm:text-sm md:text-base">
                “The Mandala Deeksha is not merely an act of ritual — it is the awakening of inner light, the surrender
                of ego, and the journey toward divine consciousness.”
              </p>

              <div className="mt-4 sm:mt-6 text-yellow-200 font-medium text-xs sm:text-sm md:text-base">
                – Swamiye Saranam Ayyappa
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Footer Quote */}
        <div className="mt-16 sm:mt-20 border-t border-amber-600/30 pt-6 sm:pt-8 text-center">
          <p className="text-yellow-200 text-xs sm:text-sm md:text-base tracking-wide opacity-90 px-4 sm:px-0">
            May the chants of “Swamiye Saranam Ayyappa” resonate in every heart 💫
          </p>
        </div>
      </div>
    </section>
  );
}
