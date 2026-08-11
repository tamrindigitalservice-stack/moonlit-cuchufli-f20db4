import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Mail, Clock, ShieldCheck, Heart, ArrowUp } from 'lucide-react';
import { TDSLogo } from './TDSLogo';
import { BUSINESS_INFO } from '../data/services';
import { getStoredSettings } from '../data/store';
import { BusinessSettings } from '../types';

export const Footer: React.FC = () => {
  const [settings, setSettings] = useState<BusinessSettings>(getStoredSettings());

  useEffect(() => {
    const update = () => setSettings(getStoredSettings());
    update();
    window.addEventListener('tds_settings_updated', update);
    return () => window.removeEventListener('tds_settings_updated', update);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#081A2B] text-[#C9D7E5] pt-16 pb-20 sm:pb-12 border-t border-[#1E3A52] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Column 1: Brand & Taglines (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <TDSLogo className="h-12" variant="light" showTagline={true} />

            <p className="text-[#C9D7E5] text-xs sm:text-sm leading-relaxed pt-2">
              {settings.businessName} (TDS) — কেন্দ্র ও রাজ্য সরকারের বিভিন্ন অনলাইন কাজের একটি সহজ, দ্রুত ও নিরাপদ সহায়তা কেন্দ্র।
            </p>

            <div className="bg-[#0B1F33] p-3.5 rounded-2xl border border-[#1E3A52] text-xs text-[#2DD4BF] font-semibold space-y-1">
              <span>“{BUSINESS_INFO.sloganPoster}”</span>
              <p className="text-[11px] text-[#C9D7E5] font-normal">
                সময় বাঁচান, হয়রানি কমান, কাজ করুন ঘরে বসেই।
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3 text-xs sm:text-sm">
            <h4 className="font-bold text-white text-base tracking-wide uppercase">
              নেভিগেশন
            </h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-white hover:text-[#2DD4BF] transition-colors">হোম (Home)</a></li>
              <li><a href="#services" className="text-white hover:text-[#2DD4BF] transition-colors">আমাদের পরিষেবা</a></li>
              <li><a href="#central-services" className="text-white hover:text-[#2DD4BF] transition-colors">কেন্দ্র সরকার</a></li>
              <li><a href="#wb-services" className="text-white hover:text-[#2DD4BF] transition-colors">পশ্চিমবঙ্গ রাজ্য</a></li>
              <li><a href="#document-helper" className="text-white hover:text-[#2DD4BF] transition-colors">ডকুমেন্ট গাইড</a></li>
              <li><a href="#about" className="text-white hover:text-[#2DD4BF] transition-colors">আমাদের সম্পর্কে</a></li>
              <li><a href="#contact" className="text-white hover:text-[#2DD4BF] transition-colors">যোগাযোগ</a></li>
            </ul>
          </div>

          {/* Column 3: Services Highlights (3 cols) */}
          <div className="lg:col-span-3 space-y-3 text-xs sm:text-sm">
            <h4 className="font-bold text-white text-base tracking-wide uppercase">
              জনপ্রিয় পরিষেবা
            </h4>
            <ul className="space-y-2 text-white">
              <li><a href="#central-services" className="text-white hover:text-[#2DD4BF] transition-colors">• আধার কার্ড (Aadhaar Card)</a></li>
              <li><a href="#central-services" className="text-white hover:text-[#2DD4BF] transition-colors">• প্যান কার্ড (PAN Card)</a></li>
              <li><a href="#central-services" className="text-white hover:text-[#2DD4BF] transition-colors">• পাসপোর্ট আবেদন (Passport)</a></li>
              <li><a href="#central-services" className="text-white hover:text-[#2DD4BF] transition-colors">• আইটিআর ফাইল (Income Tax)</a></li>
              <li><a href="#wb-services" className="text-white hover:text-[#2DD4BF] transition-colors">• বাংলারভূমি (Banglarbhumi)</a></li>
              <li><a href="#wb-services" className="text-white hover:text-[#2DD4BF] transition-colors">• রেশন কার্ড (Ration Card)</a></li>
              <li><a href="#wb-services" className="text-white hover:text-[#2DD4BF] transition-colors">• ইনকাম ও কাষ্ট সার্টিফিকেট</a></li>
            </ul>
          </div>

          {/* Column 4: Contact Details (3 cols) */}
          <div className="lg:col-span-3 space-y-3 text-xs sm:text-sm">
            <h4 className="font-bold text-white text-base tracking-wide uppercase">
              যোগাযোগ
            </h4>
            <ul className="space-y-3 text-[#C9D7E5]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#2DD4BF] flex-shrink-0 mt-0.5" />
                <span className="text-[#C9D7E5]">{settings.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#2DD4BF] flex-shrink-0" />
                <a href={`tel:${settings.phone}`} className="text-white hover:text-[#2DD4BF] font-bold">
                  {settings.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#2DD4BF] flex-shrink-0" />
                <span className="text-[#C9D7E5]">{settings.hours}</span>
              </li>
            </ul>

            <button
              onClick={scrollToTop}
              className="mt-4 inline-flex items-center gap-2 bg-[#1E3A52] hover:bg-[#152E43] text-white font-bold text-xs py-2 px-3.5 rounded-xl border border-[#1E3A52] transition-colors"
            >
              <ArrowUp className="w-4 h-4 text-[#2DD4BF]" />
              <span>উপরে যান</span>
            </button>
          </div>

        </div>

        {/* Mandatory Independent Center Disclaimer */}
        <div className="p-4 bg-[#0B1F33] rounded-2xl border border-[#1E3A52] text-[#C9D7E5] text-xs leading-relaxed space-y-1">
          <div className="flex items-center gap-2 font-bold text-[#2DD4BF]">
            <ShieldCheck className="w-4 h-4 text-[#2DD4BF]" />
            <span>সতর্কবার্তা ও ডিসক্লেমার (Disclaimer):</span>
          </div>
          <p className="text-[#C9D7E5]">
            “Tamrin Digital Service একটি স্বাধীন ডিজিটাল পরিষেবা সহায়তা কেন্দ্র। এটি কোনো সরকারি দপ্তর বা সরকারি সংস্থা নয়। আমরা কেবলমাত্র অনলাইন পোর্টাল ব্যবহারে সাধারণ মানুষকে সাহায্য প্রদান করি।”
          </p>
        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-6 border-t border-[#1E3A52] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#C9D7E5]">
          <p>© 2026 {settings.businessName}. All Rights Reserved.</p>
          <div className="flex items-center gap-4 text-[#C9D7E5]">
            <span>Designed for <strong className="text-white">{settings.businessName} • Ramnagar</strong></span>
            <span className="text-[#1E3A52]">•</span>
            <a 
              href="#admin" 
              id="footer-admin-login-link"
              className="text-[#C9D7E5] hover:text-[#2DD4BF] font-bold transition-colors underline"
            >
              অ্যাডমিন লগইন
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
