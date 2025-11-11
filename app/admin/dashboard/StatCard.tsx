'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: number;
  borderColor: string;
  gradient: string;
  textColor: string;
  numberColor: string;
}

export function StatCard({
  title,
  value,
  borderColor,
  gradient,
  textColor,
  numberColor,
}: StatCardProps) {
  return (
    <Card className={`border-2 ${borderColor}`}>
      <CardHeader className={`bg-gradient-to-r ${gradient}`}>
        <CardTitle className={textColor}>{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <p className={`text-4xl font-bold ${numberColor}`}>{value}</p>
      </CardContent>
    </Card>
  );
}
