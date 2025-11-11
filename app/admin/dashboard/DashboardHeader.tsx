'use client';

import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

export function DashboardHeader({ handleLogout }: { handleLogout: () => void }) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-4xl font-bold text-blue-900 mb-2 font-serif">Admin Dashboard</h1>
        <p className="text-gray-600">Manage Swamiye NearMe poojas and announcements</p>
      </div>
      <Button onClick={handleLogout} variant="outline" className="border-red-300 text-red-700">
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
    </div>
  );
}
