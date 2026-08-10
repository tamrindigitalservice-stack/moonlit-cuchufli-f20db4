import React from 'react';
import { ShieldCheck, Zap, Award, ArrowRight, MessageCircle, Phone, CheckCircle2, Search, MapPin, Sparkles } from 'lucide-react';
import { BUSINESS_INFO } from '../data/services';

interface HeroProps {
  onSearchFocus?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearchFocus }) => {
  const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent('নমস্কার, Tamrin Digital Service থেকে একটি অনলাইন পরিষেবা সম্পর্কে জানতে চাই।')}`;

  const quickShortcuts = [
    { label: "আধার কার্ড", href: "#central-services", color: "bg-blue-50 text-blue-900 border-blue-200" },
    { label: "প্যান কার্ড", href: "#central-services", color: "bg-amber-50 text-amber-900 border-amber-200" },
    { label: "পাসপোর্ট", href: "#central-services", color: "bg-emerald-50 text-emerald-900 border-emerald-200" },
    { label: "বাংলারভূমি / দাগ-খতিয়ান", href: "#wb-services", color: "bg-teal-50 text-teal-900 border-teal-200" },
    { label: "রেশন কার্ড", href: "#wb-services", color: "bg-purple-50 text-purple-900 border-purple-200" },
    { label: "ইনকাম ও কাষ্ট সার্টিফিকেট", href: "#wb-services", color: "bg-indigo-50 text-indigo-900 border-indigo-200" },
    { label: "পিএম কিষান", href: "#central-services", color: "bg-lime-50 text-lime-900 border-lime-200" },
  ];

  return (
    <section id="home" className="relative overflow-hidden bg-[#0F2C59] bg-gradient-to-b from-slate-900 via-[#0F2C59] to-[#0B192C] text-white pt-8 pb-16 lg:py-20">
      {/* Subtle Background Pattern Elements */}
      <div className="absolute inset-0 bg-slate-950/20 pointer-events-none" />
      
      {/* Decorative Glow Orbs */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Hero Left Content Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Tagline Badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>{BUSINESS_INFO.taglineEnglish}</span>
              <span className="text-emerald-500">•</span>
              <span className="text-white font-bold">{BUSINESS_INFO.area}</span>
            </div>

            {/* Main Headline from Poster */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              {BUSINESS_INFO.taglineBengali}
            </h1>

            {/* Subheading from Poster */}
            <p className="text-lg sm:text-xl text-emerald-400 font-bold bg-emerald-950/40 border border-emerald-500/20 p-3 rounded-2xl backdrop-blur-sm">
              “সময় বাঁচান, হয়রানি কমান, কাজ করুন ঘরে বসেই”
            </p>

            {/* Supporting Text */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
              কেন্দ্র ও রাজ্য সরকারের বিভিন্ন অনলাইন পরিষেবা এক জায়গায়। আধার, প্যান, পাসপোর্ট, রেশন কার্ড, কাষ্ট সার্টিফিকেট, ইনকাম সার্টিফিকেট ও বাংলারভূমির কাজের জন্য নির্ভরযোগ্য কেন্দ্র।
            </p>

            {/* Prominent Poster Slogan Box */}
            <div className="bg-gradient-to-r from-blue-900/80 via-indigo-900/80 to-blue-950/80 p-4 rounded-2xl border-2 border-amber-400/50 shadow-xl max-w-xl mx-auto lg:mx-0 text-center">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block mb-1">
                টিডিএস বিশেষ প্রতিশ্রুতি
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-amber-300 drop-shadow-sm">
                “{BUSINESS_INFO.sloganPoster}”
              </h3>
              <p className="text-xs text-slate-200 mt-1">
                এক জায়গায় সকল সরকারি পরিষেবা – দ্রুত, সহজ ও নির্ভরযোগ্য!
              </p>
            </div>

            {/* Hero CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <a
                href="#services"
                id="hero-cta-services"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-sm sm:text-base px-5 py-3.5 rounded-xl shadow-lg shadow-emerald-900/30 transition-all hover:scale-105 active:scale-95"
              >
                <span>পরিষেবা দেখুন</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-cta-whatsapp"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base px-5 py-3.5 rounded-xl shadow-lg shadow-emerald-900/30 transition-all hover:scale-105 active:scale-95"
              >
                <MessageCircle className="w-5 h-5 fill-white/20" />
                <span>WhatsApp করুন</span>
              </a>

              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                id="hero-cta-phone"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base px-5 py-3.5 rounded-xl border border-white/20 backdrop-blur-md transition-all hover:scale-105 active:scale-95"
              >
                <Phone className="w-5 h-5 text-amber-300" />
                <span>Call Now</span>
              </a>
            </div>

            {/* Trust Points Checklist */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm text-slate-300 font-medium">
              <span className="flex items-center gap-1.5 text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ১০০% সঠিক পরামর্শ
              </span>
              <span className="flex items-center gap-1.5 text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                কম খরচে সরকারি কাজ
              </span>
              <span className="flex items-center gap-1.5 text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                অভিজ্ঞ অপারেটর
              </span>
            </div>

          </div>

          {/* Hero Right Column - Digital Service Center Visual Card & Poster Badges */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Visual Digital Service Portal Mockup Card */}
            <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 p-6 rounded-3xl border border-slate-700/80 shadow-2xl backdrop-blur-xl relative">
              
              {/* Badge Overlay */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-700/60 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  GOVT ONLINE PORTAL
                </span>
              </div>

              {/* Poster 3 Service Badges (FAST, SECURE, RELIABLE) */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-blue-900/40 border border-blue-500/30 rounded-2xl p-3 text-center transition-transform hover:scale-105">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto mb-1.5">
                    <Zap className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-white block">FAST SERVICE</span>
                  <span className="text-[9px] text-blue-300 block">দ্রুত পরিষেবা</span>
                </div>

                <div className="bg-emerald-900/40 border border-emerald-500/30 rounded-2xl p-3 text-center transition-transform hover:scale-105">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-1.5">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-white block">SECURE SERVICE</span>
                  <span className="text-[9px] text-emerald-300 block">নিরাপদ তথ্য</span>
                </div>

                <div className="bg-amber-900/40 border border-amber-500/30 rounded-2xl p-3 text-center transition-transform hover:scale-105">
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-1.5">
                    <Award className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-white block">RELIABLE</span>
                  <span className="text-[9px] text-amber-300 block">বিশ্বস্ত সেবা</span>
                </div>
              </div>

              {/* Location Banner */}
              <div className="bg-slate-800/80 rounded-2xl p-3.5 border border-slate-700 flex items-center gap-3">
                <div className="p-2.5 bg-red-500/20 text-red-400 rounded-xl border border-red-500/30 flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <span className="text-slate-400 block">আমাদের ডিজিটাল সেন্টার ঠিকানা:</span>
                  <strong className="text-white font-bold text-sm block">
                    {BUSINESS_INFO.address}
                  </strong>
                </div>
              </div>

              {/* Quick Search Shortcut Prompt */}
              <div className="mt-4 pt-3 border-t border-slate-700/60">
                <span className="text-xs text-slate-400 font-medium block mb-2">
                  জনপ্রিয় কাজের সংক্ষিপ্ত তালিকা:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {quickShortcuts.map((sc, idx) => (
                    <a
                      key={idx}
                      href={sc.href}
                      className={`text-xs px-2.5 py-1 rounded-lg border font-semibold hover:opacity-90 transition-opacity ${sc.color}`}
                    >
                      {sc.label}
                    </a>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
