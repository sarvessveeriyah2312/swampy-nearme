'use client';
import { motion } from 'framer-motion';

export const PoojaFooter = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.8 }}
    className="text-center mt-8 p-8 bg-gradient-to-r from-amber-800 to-amber-700 rounded-2xl text-white relative overflow-hidden"
  >
    <div className="absolute inset-0 opacity-10">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at 25px 25px, rgba(255,255,255,0.3) 2%, transparent 0%)',
          backgroundSize: '50px 50px',
        }}
      />
    </div>
    <div className="relative z-10">
      <p className="text-2xl md:text-3xl font-serif mb-3 text-yellow-300">
        Swamiye Saranam Ayyappa
      </p>
      <p className="text-amber-200 text-lg">May Lord Ayyappa bless you with divine grace</p>
    </div>
  </motion.div>
);
