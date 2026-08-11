import React from 'react';
import { Phone, MessageCircle, MapPin, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import { BUSINESS_INFO } from '../data/services';
import { motion } from 'motion/react';

export const ContactCTA: React.FC = () => {
  const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent('নমস্কার, Tamrin Digital Service! একটি সেবা সম্পর্কে জানতে চাই।')}`;

  return (
    <section className="py-14 bg-gradient-to-r from-[#0F2C59] via-[#1E3E62] to-[#0F2C59] text-white relative overflow-hidden">
      {/* Background Subtle Accent Circles */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-6">
        
        <div className="space-y-3 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3.5 py-1.5 rounded-full">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>বিশ্বস্ত ডিজিটাল পরিষেবা সহায়তা কেন্দ্র</span>
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            আপনার অনলাইন কাজ নিয়ে সাহায্য দরকার?
          </h2>

          <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
            পরিষেবাটি খুঁজে পাচ্ছেন না? আমাদের সাথে যোগাযোগ করুন।
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="cta-whatsapp-button"
            className="inline-flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm sm:text-base px-7 py-3.5 rounded-2xl shadow-lg transition-all transform hover:scale-105 active:scale-95"
          >
            <MessageCircle className="w-5 h-5 fill-white/20" />
            <span>WhatsApp করুন</span>
          </a>

          <a
            href={`tel:${BUSINESS_INFO.phone}`}
            id="cta-call-button"
            className="inline-flex items-center gap-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-sm sm:text-base px-7 py-3.5 rounded-2xl shadow-lg transition-all transform hover:scale-105 active:scale-95"
          >
            <Phone className="w-5 h-5 fill-slate-950/20" />
            <span>Call Now ({BUSINESS_INFO.phone})</span>
          </a>
        </div>

        {/* Address Badge Bar */}
        <div className="pt-4 border-t border-white/10 max-w-2xl mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-300 font-medium">
          <span className="flex items-center gap-1.5 text-emerald-300">
            <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            {BUSINESS_INFO.address}
          </span>
          <span className="flex items-center gap-1.5 text-slate-300">
            <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
            {BUSINESS_INFO.hours}
          </span>
        </div>

      </div>
    </section>
  );
};
