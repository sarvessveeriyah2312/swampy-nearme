'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

import { usePoojaDetail } from './usePoojaDetail';
import { PoojaHeader } from './PoojaHeader';
import { PoojaDescription } from './PoojaDescription';
import { PoojaVenue } from './PoojaVenue';
import { PoojaActions } from './PoojaActions';
import { PoojaButtons } from './PoojaButtons';
import { PoojaFooter } from './PoojaFooter';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function PoojaDetailPage() {
  const { pooja, loading } = usePoojaDetail();
  const { toast } = useToast();

  if (loading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-amber-50 via-white to-amber-100">
        <div className="w-12 h-12 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin"></div>
        <p className="text-amber-700 mt-4 font-medium">Loading sacred pooja details...</p>
      </div>
    );

  if (!pooja) return null;

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-amber-50 via-white to-amber-50/50 flex flex-col">
      {/* Main content wrapper */}
      <div className="flex-grow w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Back Navigation */}
          <div className="mb-4 sm:mb-6">
            <Link href="/poojas">
              <Button
                variant="ghost"
                className="text-amber-700 hover:text-amber-900 hover:bg-amber-50 rounded-xl flex items-center"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                <span className="text-sm sm:text-base font-medium">Back to Sacred Gatherings</span>
              </Button>
            </Link>
          </div>

          {/* Main Card */}
          <Card className="border-2 border-amber-200 shadow-lg md:shadow-2xl rounded-3xl overflow-hidden">
            <PoojaHeader pooja={pooja} />

            <CardContent className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
              {/* Description */}
              {pooja.description && (
                <PoojaDescription description={pooja.description} />
              )}

              {/* Responsive grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <PoojaVenue pooja={pooja} />
                <PoojaActions pooja={pooja} toast={toast} />
              </div>

              <PoojaButtons pooja={pooja} toast={toast} params={{ id: pooja.id }} />
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Footer - Always sticks to bottom */}
      <footer className="mt-auto w-full">
        <PoojaFooter />
      </footer>
    </div>
  );
}
