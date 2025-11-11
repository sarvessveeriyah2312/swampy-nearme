'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Plus, MapPin, Menu, X } from 'lucide-react';

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 shadow-lg border-b border-amber-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-xl md:text-2xl font-bold text-white font-serif">
              🙏 Swamiye NearMe
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/poojas">
              <Button variant="ghost" className="text-white hover:bg-amber-700">
                <MapPin className="mr-2 h-4 w-4" />
                Find Poojas
              </Button>
            </Link>
            <Link href="/announce">
              <Button className="bg-yellow-400 text-amber-900 hover:bg-yellow-300 font-semibold">
                <Plus className="mr-2 h-4 w-4" />
                Announce Pooja
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-gradient-to-br from-amber-700 via-orange-700 to-amber-800 border-t border-amber-900"
          >
            <div className="flex flex-col items-start p-4 space-y-3">
              <Link href="/poojas" className="w-full">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white hover:bg-amber-600"
                  onClick={() => setMenuOpen(false)}
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  Find Poojas
                </Button>
              </Link>
              <Link href="/announce" className="w-full">
                <Button
                  className="w-full justify-start bg-yellow-400 text-amber-900 hover:bg-yellow-300 font-semibold"
                  onClick={() => setMenuOpen(false)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Announce Pooja
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
