'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? '';

  useEffect(() => {
    if (typeof window === 'undefined' || !GA_ID) return;
    const url = pathname + (searchParams.toString() ? `?${searchParams}` : '');
    if (typeof window.gtag === 'function') {
      window.gtag('config', GA_ID, { page_path: url });
    }
  }, [pathname, searchParams, GA_ID]);

  return null;
}
