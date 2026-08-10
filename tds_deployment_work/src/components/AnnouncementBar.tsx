import React, { useState, useEffect } from 'react';
import { Megaphone, X } from 'lucide-react';
import { getStoredAnnouncements } from '../data/store';
import { Announcement } from '../types';

export const AnnouncementBar: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const updateAnnouncements = () => {
      const all = getStoredAnnouncements();
      const active = all.filter((a) => a.isActive);
      setAnnouncements(active);
    };

    updateAnnouncements();
    window.addEventListener('tds_announcements_updated', updateAnnouncements);
    return () => window.removeEventListener('tds_announcements_updated', updateAnnouncements);
  }, []);

  if (isDismissed || announcements.length === 0) return null;

  const currentAnnouncement = announcements[0];

  return (
    <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-bold text-xs py-2 px-4 border-b border-amber-600/30 flex items-center justify-between gap-3 shadow-sm z-50">
      <div className="flex items-center gap-2 max-w-7xl mx-auto overflow-hidden">
        <span className="bg-slate-950 text-amber-300 px-2 py-0.5 rounded-full text-[10px] uppercase font-extrabold flex items-center gap-1 flex-shrink-0">
          <Megaphone className="w-3 h-3 text-amber-400" />
          {currentAnnouncement.title || 'ঘোষণা'}
        </span>
        <p className="truncate text-slate-900 font-extrabold">
          {currentAnnouncement.descriptionBengali}
        </p>
      </div>

      <button
        onClick={() => setIsDismissed(true)}
        className="p-1 hover:bg-black/10 rounded-lg text-slate-900 transition-colors flex-shrink-0"
        title="বন্ধ করুন"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
