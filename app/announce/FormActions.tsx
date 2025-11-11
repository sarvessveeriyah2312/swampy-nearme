'use client';

import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

export function FormActions({ router, loading }: any) {
  return (
    <div className="flex gap-4 pt-4">
      <Button
        type="button"
        variant="outline"
        onClick={() => router.back()}
        className="flex-1"
        disabled={loading}
      >
        Cancel
      </Button>
      <Button
        type="submit"
        className="flex-1 bg-amber-600 hover:bg-amber-700"
        disabled={loading}
      >
        {loading ? 'Publishing...' : <>
          <Send className="mr-2 h-4 w-4" /> Announce Pooja
        </>}
      </Button>
    </div>
  );
}
