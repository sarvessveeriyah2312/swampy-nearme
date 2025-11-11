'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAnnounceForm } from './useAnnounceForm';
import { PoojaDetailsSection } from './PoojaDetailsSection';
import { LocationSection } from './LocationSection';
import { FormActions } from './FormActions';

export default function AnnouncePage() {
  const { formData, handleChange, handleGetLocation, handleSubmit, loading, router } =
    useAnnounceForm();

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-amber-50/50 py-8 sm:py-12 px-3 sm:px-6">
      <div className="max-w-2xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 sm:space-y-8"
        >
          {/* 🌸 Header */}
          <div className="text-center mb-6 sm:mb-8 px-2">
            <h1 className="text-3xl sm:text-4xl font-bold text-amber-900 mb-3 font-serif leading-tight">
              Announce Your Pooja
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Share your Ayyappa Pooja or Bhajan details with nearby devotees 🙏
            </p>
          </div>

          {/* 🕉️ Form Card */}
          <Card className="border-2 border-amber-200 shadow-lg sm:shadow-xl rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 py-3 sm:py-4">
              <CardTitle className="text-xl sm:text-2xl text-amber-900 font-semibold text-center sm:text-left">
                Pooja Details
              </CardTitle>
            </CardHeader>

            <CardContent className="pt-5 sm:pt-6 pb-8 sm:pb-10 px-3 sm:px-6">
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                {/* 🪔 Pooja Info */}
                <PoojaDetailsSection formData={formData} handleChange={handleChange} />

                {/* 📍 Location */}
                <div className="pt-2">
                  <LocationSection
                    formData={formData}
                    handleChange={handleChange}
                    handleGetLocation={handleGetLocation}
                  />
                </div>

                {/* ⚙️ Actions */}
                <div className="pt-4 sm:pt-6">
                  <FormActions router={router} loading={loading} />
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Optional bottom note */}
          <div className="text-center text-xs sm:text-sm text-gray-500 mt-4 sm:mt-6">
            Your submission helps devotees discover nearby sacred gatherings
          </div>
        </motion.div>
      </div>
    </div>
  );
}
