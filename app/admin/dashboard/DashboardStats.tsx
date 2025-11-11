'use client';

import { StatCard } from './StatCard';

export function DashboardStats({
  stats,
}: {
  stats: { total: number; today: number; upcoming: number };
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatCard
        title="Total Poojas"
        value={stats.total}
        borderColor="border-blue-200"
        gradient="from-blue-50 to-blue-100"
        textColor="text-blue-900"
        numberColor="text-blue-600"
      />
      <StatCard
        title="Today"
        value={stats.today}
        borderColor="border-green-200"
        gradient="from-green-50 to-green-100"
        textColor="text-green-900"
        numberColor="text-green-600"
      />
      <StatCard
        title="Upcoming"
        value={stats.upcoming}
        borderColor="border-amber-200"
        gradient="from-amber-50 to-amber-100"
        textColor="text-amber-900"
        numberColor="text-amber-600"
      />
    </div>
  );
}
