'use client';
import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';

export const PoojaButtons = ({ pooja, toast }: any) => {
  // --- SHARE HANDLER ---
  const handleShare = async () => {
    const shareData = {
      title: pooja.title,
      text: `Join me for ${pooja.title}`,
      url: window.location.href,
    };

    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: 'Link copied to clipboard',
        description: 'Share this sacred gathering link with devotees',
      });
    }
  };

  return (
    <div className="pt-6 border-t border-amber-200">
      <Button
        onClick={handleShare}
        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl py-6"
      >
        <Share2 className="mr-3 h-5 w-5" /> Share with Devotees
      </Button>
    </div>
  );
};
