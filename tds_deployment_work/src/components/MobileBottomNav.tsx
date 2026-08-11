import React from 'react';
import { Phone, MessageCircle, FileEdit } from 'lucide-react';
import { BUSINESS_INFO } from '../data/services';

interface MobileBottomNavProps {
  onRequestClick: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onRequestClick }) => {
  const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent('নমস্কার, Tamrin Digital Service! একটি পরিষেবা সম্পর্কে জানতে চাই।')}`;

  return (
    <>
      {/* Mobile Fixed Bottom Navigation Bar (Shown on screens < sm) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0B1F33]/95 backdrop-blur-md border-t border-[#1E3A52] p-2 sm:hidden shadow-2xl">
        <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
          
          {/* 1. Call Now */}
          <a
            href={`tel:${BUSINESS_INFO.phone}`}
            id="mobile-nav-call-btn"
            className="flex flex-col items-center justify-center py-2 px-1 bg-[#1E3A52] active:bg-[#152E43] text-white rounded-xl font-bold text-[11px] shadow-sm transition-all border border-[#1E3A52]"
          >
            <Phone className="w-4 h-4 mb-0.5 text-[#2DD4BF]" />
            <span>Call Now</span>
          </a>

          {/* 2. WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="mobile-nav-whatsapp-btn"
            className="flex flex-col items-center justify-center py-2 px-1 bg-[#2DD4BF] active:bg-[#22B8A5] text-[#081A2B] rounded-xl font-extrabold text-[11px] shadow-sm transition-all"
          >
            <MessageCircle className="w-4 h-4 mb-0.5" />
            <span>WhatsApp</span>
          </a>

          {/* 3. Service Request */}
          <button
            onClick={onRequestClick}
            id="mobile-nav-request-btn"
            className="flex flex-col items-center justify-center py-2 px-1 bg-blue-600 active:bg-blue-700 text-white rounded-xl font-extrabold text-[11px] shadow-sm transition-all"
          >
            <FileEdit className="w-4 h-4 mb-0.5" />
            <span>Request</span>
          </button>

        </div>
      </div>

      {/* Desktop Floating Quick Service Request Trigger (Shown on screens >= sm) */}
      <div className="hidden sm:block fixed bottom-24 right-6 z-40">
        <button
          onClick={onRequestClick}
          id="desktop-quick-request-btn"
          className="bg-gradient-to-r from-[#0F2C59] to-blue-900 hover:from-blue-900 hover:to-[#0F2C59] text-white font-extrabold text-xs py-3 px-5 rounded-full shadow-2xl border border-blue-400/40 flex items-center gap-2 group transition-all transform hover:scale-105 active:scale-95"
        >
          <FileEdit className="w-4 h-4 text-emerald-400 group-hover:rotate-12 transition-transform" />
          <span>পরিষেবা অনুরোধ (Request)</span>
        </button>
      </div>
    </>
  );
};
