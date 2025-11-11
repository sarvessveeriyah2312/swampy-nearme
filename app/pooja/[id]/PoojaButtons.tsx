'use client';
import { Button } from '@/components/ui/button';
import { Share2, Bell } from 'lucide-react';

export const PoojaButtons = ({ pooja, toast, params }: any) => {
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

  // --- REMINDER HANDLER ---
  const handleEnableReminder = async () => {
    if (!('Notification' in window)) {
      toast({
        title: 'Not supported',
        description: 'Your browser does not support notifications',
      });
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      // Save reminder state
      localStorage.setItem(`reminder-${params.id}`, 'true');

      // Optionally schedule a simple reminder (e.g., 5 minutes before event)
      const poojaDate = new Date(pooja.dateTime); // ensure pooja.dateTime is a valid ISO string
      const now = new Date();
      const timeUntilReminder = poojaDate.getTime() - now.getTime() - 5 * 60 * 1000; // 5 mins before

      if (timeUntilReminder > 0) {
        setTimeout(() => {
          new Notification(`⏰ Reminder: ${pooja.title}`, {
            body: `Your pooja "${pooja.title}" will begin soon.`,
            icon: '/temple-icon.png', // optional custom icon
          });
        }, timeUntilReminder);
      }

      toast({
        title: 'Reminder enabled 🙏',
        description: 'You will receive a notification before the pooja begins',
      });
    } else {
      toast({
        title: 'Permission denied',
        description: 'Notifications were not enabled for this browser',
      });
    }
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
