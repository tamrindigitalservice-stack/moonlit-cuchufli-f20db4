import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { BUSINESS_INFO } from '../data/services';

export const WhatsAppButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const prefilledText = `নমস্কার, আমি Tamrin Digital Service থেকে একটি পরিষেবা সম্পর্কে জানতে চাই।

আমার নাম: 
আমার প্রয়োজনীয় পরিষেবা: 
আমার প্রয়োজনীয়তা: `;
  const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(prefilledText)}`;

  return (
    <div className="fixed bottom-16 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end group">
      
      {/* Pre-filled Tooltip Bubble */}
      {showTooltip && (
        <div className="mb-3 bg-white text-slate-800 p-3.5 rounded-2xl shadow-xl border border-slate-200 text-xs max-w-xs relative animate-in fade-in slide-in-from-bottom-2 duration-300">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute -top-2 -left-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-full p-1 transition-colors"
            title="বন্ধ করুন"
          >
            <X className="w-3 h-3" />
          </button>
          
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold text-slate-900 text-xs">Tamrin Digital Service</span>
          </div>
          <p className="text-slate-600 font-medium text-[11px] leading-snug">
            নমস্কার! যেকোনো সরকারি বা অনলাইন কাজের জন্য সরাসরি হোয়াটসঅ্যাপ করুন।
          </p>
        </div>
      )}

      {/* Floating Action WhatsApp Circle Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        id="floating-whatsapp-btn"
        className="relative bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 sm:p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center group"
        aria-label="WhatsApp Us"
      >
        {/* Pulsing ring */}
        <span className="absolute inset-0 rounded-full bg-emerald-500 opacity-75 animate-ping pointer-events-none" />

        <MessageCircle className="w-7 h-7 relative z-10 fill-white/20" />
      </a>
    </div>
  );
};
