import React from 'react';
import { ShieldCheck, CheckCircle2, Award, Clock, Users, HeartHandshake, HelpCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../data/services';

export const AboutUs: React.FC = () => {
  return (
    <section id="about" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Highlight Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-gradient-to-br from-[#0F2C59] via-blue-900 to-[#0B192C] text-white p-8 rounded-3xl border border-blue-800 shadow-xl relative overflow-hidden">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 mb-6 font-black text-2xl">
                TDS
              </div>

              <span className="text-amber-400 font-bold text-xs uppercase tracking-widest block mb-1">
                ডিজিটাল পরিষেবা কেন্দ্র
              </span>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                Tamrin Digital Service
              </h3>

              <p className="text-slate-200 text-sm leading-relaxed mb-6 italic">
                “{BUSINESS_INFO.sloganPoster}”
              </p>

              <div className="space-y-2.5 pt-4 border-t border-slate-700/80 text-xs">
                <div className="flex items-center gap-2 text-emerald-300 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>দ্রুত ও সহজ অনলাইন আবেদন প্রযুক্তি</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-300 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>স্বচ্ছ ফি ও সঠিক সরকারি পরামর্শ</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-300 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>রামনগর, পশ্চিম মেদিনীপুর অঞ্চলে ১০০% সুনাম</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Text Description */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3.5 py-1.5 rounded-full border border-emerald-300">
              আমাদের পরিচিতি
            </span>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-snug">
              সহজ পরিষেবা, উন্নত জীবন — আপনার বিশ্বস্ত ডিজিটাল সাথী
            </h2>

            {/* Official Prompt Statement */}
            <p className="text-slate-700 text-base leading-relaxed bg-blue-50/70 p-5 rounded-2xl border-l-4 border-blue-800 font-medium">
              “Tamrin Digital Service একটি ডিজিটাল পরিষেবা কেন্দ্র, যেখানে বিভিন্ন সরকারি ও অনলাইন পরিষেভার জন্য সাধারণ মানুষকে আবেদন, সংশোধন, ডাউনলোড এবং অন্যান্য ডিজিটাল কাজের ক্ষেত্রে সহায়তা প্রদান করা হয়।”
            </p>

            <p className="text-slate-600 text-sm leading-relaxed">
              রামনগর ও পশ্চিম মেদিনীপুর এলাকার সাধারণ নাগরিকরা যেন সরকারি প্রকল্পের সুবিধা পেতে অযথা হয়রানির শিকার না হন, সেই লক্ষ্যে আমাদের পথচলা। আমরা আধার, প্যান, পাসপোর্ট, বাংলারভূমি পরচা, রেশন কার্ড, কাষ্ট ও ইনকাম সার্টিফিকেট সহ সমস্ত গুরুত্বপূর্ণ ডিজিটাল কাজে সুনির্দিষ্ট ও দক্ষ সাহায্য প্রদান করি।
            </p>

            {/* Core Values 4 Grid */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <Clock className="w-5 h-5 text-blue-600 mb-2" />
                <h4 className="font-bold text-slate-900 text-sm">দ্রুত পরিষেবা</h4>
                <p className="text-xs text-slate-600 mt-1">সময় নষ্ট না করে নির্দিষ্ট সময়ের মধ্যে নির্ভুল ডেলিভারি।</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <HeartHandshake className="w-5 h-5 text-emerald-600 mb-2" />
                <h4 className="font-bold text-slate-900 text-sm">গ্রাহক সহায়তা</h4>
                <p className="text-xs text-slate-600 mt-1">কাজের আগে ও পরে যেকোনো প্রশ্নের আন্তরিক উত্তর।</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <Users className="w-5 h-5 text-purple-600 mb-2" />
                <h4 className="font-bold text-slate-900 text-sm">দক্ষ ডিজিটাল টিম</h4>
                <p className="text-xs text-slate-600 mt-1">পেশাদার ও অভিজ্ঞ কম্পিউটার অপারেটরদের দ্বারা কাজ।</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <ShieldCheck className="w-5 h-5 text-amber-600 mb-2" />
                <h4 className="font-bold text-slate-900 text-sm">স্বচ্ছ ও নিরাপদ</h4>
                <p className="text-xs text-slate-600 mt-1">গোপনীয়তা বজায় রেখে সঠিক সরকারি ফি-তে সেবা।</p>
              </div>
            </div>

            {/* Independent Service Center Disclaimer */}
            <div className="p-4 bg-slate-100 rounded-2xl border border-slate-300 text-xs text-slate-600 space-y-1">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <HelpCircle className="w-4 h-4 text-slate-500" />
                <span>স্বতন্ত্র ডিজিটাল সহায়তা কেন্দ্র সম্পর্কিত সতর্কবার্তা:</span>
              </div>
              <p className="leading-relaxed">
                Tamrin Digital Service একটি স্বাধীন নাগরিক অনলাইন সহায়তা কেন্দ্র। এটি কোনো সরাসরি সরকারি দপ্তর বা সরকারি সংস্থা নয়। আমরা সরকারি অনলাইন পোর্টাল ব্যবহারে নাগরিকদের প্রযুক্তিগত সাহায্য প্রদান করি।
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
