'use client';
import { Button } from '@/components/ui/button';
import { Share2, Bell } from 'lucide-react';

export const PoojaButtons = ({ pooja, toast, params }: any) => {
  const handleShare = async () => {
    const shareData = {
      title: pooja.title,
      text: `Join me for ${pooja.title}`,
      url: window.location.href,
    };

    if (navigator.share) await navigator.share(shareData);
    else {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: 'Link copied to clipboard',
        description: 'Share this sacred gathering link with devotees',
      });
    }
  };

  const handleEnableReminder = () => {
    if ('Notification' in window)
      Notification.requestPermission().then((perm) => {
        if (perm === 'granted') {
          toast({ title: 'Reminder enabled 🙏', description: 'You will receive notifications' });
          localStorage.setItem(`reminder-${params.id}`, 'true');
        }
      });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-amber-200">
      <Button
        onClick={handleShare}
        className="bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl py-6"
      >
        <Share2 className="mr-3 h-5 w-5" /> Share with Devotees
      </Button>
      <Button
        onClick={handleEnableReminder}
        variant="outline"
        className="border-green-300 text-green-700 hover:bg-green-50 font-semibold rounded-xl py-6"
      >
        <Bell className="mr-3 h-5 w-5" /> Enable Reminder
      </Button>
    </div>
  );
};
