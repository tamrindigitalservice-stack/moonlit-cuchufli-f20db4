import React from 'react';
import { Users, Zap, ShieldCheck, PiggyBank, Handshake, CheckCircle, Award } from 'lucide-react';
import { WHY_CHOOSE_US_ITEMS, BUSINESS_INFO } from '../data/services';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Users,
  Zap,
  ShieldCheck,
  PiggyBank,
  Handshake
};

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-16 bg-white border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column - Poster Quote Box & Highlights */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-900 border border-blue-200 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <Award className="w-4 h-4 text-blue-600" />
              আমাদের বিশেষত্ব
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              কেন Tamrin Digital Service বেছে নেবেন?
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              আমরা শুধু ফর্ম পূরণ করি না, সঠিক সরকারি নিয়মাবলী মেনে নির্ভুলভাবে আপনার কাজ সম্পন্ন নিশ্চিত করি। যাতে আপনাকে বারবার লাইনে দাঁড়াতে বা হয়রান হতে না হয়।
            </p>

            {/* Poster Feature Box: "আপনার কাজ আমাদের দায়িত্ব" */}
            <div className="bg-gradient-to-br from-[#0F2C59] to-[#0B192C] text-white p-6 rounded-3xl border-2 border-amber-400/60 shadow-xl relative overflow-hidden">
              <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-amber-400/10 rounded-full blur-xl pointer-events-none" />
              
              <span className="text-amber-400 font-extrabold text-xs uppercase tracking-widest block mb-2">
                আমাদের মূল্যবোধ ও অঙ্গীকার
              </span>
              
              <h3 className="text-2xl sm:text-3xl font-extrabold text-amber-300 mb-2">
                “{BUSINESS_INFO.sloganPoster}”
              </h3>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-4">
                রামনগর ও পশ্চিম মেদিনীপুর অঞ্চলের প্রতিটি সাধারণ মানুষের জন্য বিশ্বস্ত, দ্রুত ও সৎ ডিজিটাল সহায়তা কেন্দ্র।
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs font-semibold pt-3 border-t border-slate-700/80">
                <div className="flex items-center gap-1.5 text-emerald-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>১০০% গোপনীয়তা</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>দ্রুত অনলাইন আপডেট</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - 5 Feature Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {WHY_CHOOSE_US_ITEMS.map((item, idx) => {
              const IconComp = ICON_MAP[item.icon] || ShieldCheck;
              const isLast = idx === WHY_CHOOSE_US_ITEMS.length - 1;

              return (
                <div
                  key={idx}
                  className={`bg-slate-50 hover:bg-blue-50/50 p-5 rounded-2xl border border-slate-200/80 transition-all duration-300 hover:shadow-md space-y-3 group ${
                    isLast ? 'sm:col-span-2 bg-gradient-to-r from-slate-50 via-emerald-50/40 to-slate-50' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 group-hover:bg-blue-600 group-hover:text-white transition-colors flex items-center justify-center">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-extrabold font-mono text-slate-400 group-hover:text-blue-600">
                      {item.number}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-base group-hover:text-blue-900">
                    {item.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
