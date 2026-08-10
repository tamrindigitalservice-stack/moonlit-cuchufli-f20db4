import React, { useState } from 'react';
import { Image as ImageIcon, X, Check, Phone, MapPin, ExternalLink, ShieldCheck, Zap, Award } from 'lucide-react';
import { BUSINESS_INFO } from '../data/services';

export const PosterReferenceBanner: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Poster Preview Trigger Pill */}
      <button
        onClick={() => setIsOpen(true)}
        id="btn-view-poster"
        className="fixed bottom-20 right-5 z-40 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-medium text-xs py-2.5 px-3.5 rounded-full shadow-lg border border-emerald-300/30 flex items-center gap-2 transition-all hover:scale-105 group"
        title="অরিজিনাল পোস্টার ও ব্র্যান্ড তথ্য দেখুন"
      >
        <ImageIcon className="w-4 h-4 text-emerald-200 group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline">অরিজিনাল পোস্টার দেখুন</span>
        <span className="sm:hidden">পোস্টার</span>
        <span className="bg-emerald-400 text-emerald-950 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
          TDS
        </span>
      </button>

      {/* Modal Dialog for Poster Reference */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-slate-200">
            {/* Modal Header */}
            <div className="bg-[#0F2C59] text-white p-4 px-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400 border border-emerald-500/30">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">Tamrin Digital Service (TDS) - অফিশিয়াল পোস্টার</h3>
                  <p className="text-xs text-emerald-300">মূল ব্র্যান্ডিং পোস্টার ও তথ্যের তুলনা</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                id="btn-close-poster-modal"
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-6">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3 text-xs text-emerald-900">
                <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-sm text-emerald-950 mb-1">
                    পোস্টারের সমস্ত তথ্য ডিজিটাল ওয়েবসাইটে সংযুক্ত করা হয়েছে!
                  </p>
                  <p className="leading-relaxed">
                    আপনার আপলোড করা পোস্টারের লোগো স্টাইল, ব্র্যান্ড কালার (Navy Blue & Green), ট্যাগলাইন (“Easy Service, Better Life” / “সরকারি কাজ এখন অনলাইনে”), বিশেষ শ্লোগান (“আপনার কাজ আমাদের দায়িত্ব”), ব্যাজসমূহ, ১০টি কেন্দ্র ও ১০টি রাজ্য সরকারি পরিষেবা, ঠিকানা ও ফোন নম্বর (9635191520) সম্পূর্ণরূপে ইন্টারেক্টিভ আকারে ডিজাইন করা হয়েছে।
                  </p>
                </div>
              </div>

              {/* Poster Grid Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Brand Identity Card */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Award className="w-4 h-4 text-blue-600" />
                    ব্র্যান্ড আইডেন্টিটি ও মূল শ্লোগান
                  </h4>
                  <ul className="space-y-1.5 text-slate-700">
                    <li><strong>নাম:</strong> {BUSINESS_INFO.name} ({BUSINESS_INFO.shortName})</li>
                    <li><strong>ইংরেজি ট্যাগলাইন:</strong> {BUSINESS_INFO.taglineEnglish}</li>
                    <li><strong>বাংলা ট্যাগলাইন:</strong> {BUSINESS_INFO.taglineBengali}</li>
                    <li className="bg-blue-100 text-blue-900 font-bold p-2 rounded-lg text-center mt-2">
                      “{BUSINESS_INFO.sloganPoster}”
                    </li>
                  </ul>
                </div>

                {/* Contact & Location Card */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    ঠিকানা ও যোগাযোগের তথ্য
                  </h4>
                  <ul className="space-y-1.5 text-slate-700">
                    <li className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-emerald-600" />
                      <strong>ফোন / হোয়াটসঅ্যাপ:</strong> {BUSINESS_INFO.phone}
                    </li>
                    <li className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{BUSINESS_INFO.address}</span>
                    </li>
                    <li className="text-slate-500 italic">
                      সময় বাঁচান, লাইনে দাঁড়ানোর ঝামেলা নেই - ১০০% বিশ্বস্ত সেবা
                    </li>
                  </ul>
                </div>
              </div>

              {/* Three Badges From Poster */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-center">
                  <Zap className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                  <span className="font-bold text-blue-950 text-xs block">FAST SERVICE</span>
                  <span className="text-[10px] text-blue-700">দ্রুত সেবা</span>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-center">
                  <ShieldCheck className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
                  <span className="font-bold text-emerald-950 text-xs block">SECURE SERVICE</span>
                  <span className="text-[10px] text-emerald-700">নিরাপদ সেবা</span>
                </div>
                <div className="bg-teal-50 border border-teal-200 rounded-xl p-3 text-center">
                  <Award className="w-6 h-6 text-teal-600 mx-auto mb-1" />
                  <span className="font-bold text-teal-950 text-xs block">RELIABLE SERVICE</span>
                  <span className="text-[10px] text-teal-700">বিশ্বস্ত সেবা</span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
              <span className="text-xs text-slate-500">
                Natun Bazar, Ramnagar, Paschim Medinipur
              </span>
              <button
                onClick={() => setIsOpen(false)}
                id="btn-close-poster-modal-bottom"
                className="bg-[#0F2C59] text-white hover:bg-[#1E3E62] text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
