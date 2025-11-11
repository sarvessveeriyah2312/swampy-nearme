'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAdminDashboard } from './useAdminDashboard';
import { DashboardHeader } from './DashboardHeader';
import { DashboardStats } from './DashboardStats';
import { PoojaTable } from './PoojaTable';

export default function AdminDashboardPage() {
  const { poojas, stats, loading, handleDelete, handleLogout } = useAdminDashboard();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <DashboardHeader handleLogout={handleLogout} />
          <DashboardStats stats={stats} />
          <Card className="border-2 border-blue-200">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
              <CardTitle className="text-blue-900 text-2xl">All Poojas</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <PoojaTable poojas={poojas} loading={loading} handleDelete={handleDelete} />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
