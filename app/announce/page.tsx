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
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-amber-900 mb-4 font-serif">
              Announce Your Pooja
            </h1>
            <p className="text-gray-600">
              Share your Ayyappa Pooja or Bhajan details with nearby devotees
            </p>
          </div>

          <Card className="border-2 border-amber-200 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50">
              <CardTitle className="text-2xl text-amber-900">Pooja Details</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <PoojaDetailsSection formData={formData} handleChange={handleChange} />
                <LocationSection
                  formData={formData}
                  handleChange={handleChange}
                  handleGetLocation={handleGetLocation}
                />
                <FormActions router={router} loading={loading} />
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
