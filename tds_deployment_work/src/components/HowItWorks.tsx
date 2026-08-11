import React from 'react';
import { MousePointerClick, PhoneCall, FileCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { HOW_IT_WORKS_STEPS } from '../data/services';

const STEP_ICONS: Record<string, React.FC<{ className?: string }>> = {
  MousePointerClick,
  PhoneCall,
  FileCheck,
  CheckCircle2
};

export const HowItWorks: React.FC = () => {
  return (
    <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-950 px-3.5 py-1.5 rounded-full border border-emerald-800">
            সহজ ৪টি ধাপ
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            কিভাবে আমাদের পরিষেবা নেবেন?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            আপনার অনলাইন সরকারি কাজের প্রক্রিয়া অত্যন্ত সহজ ও ঝামেলামুক্ত।
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {HOW_IT_WORKS_STEPS.map((stepItem, idx) => {
            const IconComp = STEP_ICONS[stepItem.icon] || FileCheck;

            return (
              <div
                key={idx}
                className="bg-slate-800/80 border border-slate-700/80 p-6 rounded-3xl relative flex flex-col justify-between hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-1 group"
              >
                {/* Step Number Circle */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-lg group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-black font-mono text-slate-500 group-hover:text-emerald-400">
                    {stepItem.step}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-300">
                    {stepItem.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {stepItem.desc}
                  </p>
                </div>

                {idx < HOW_IT_WORKS_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-slate-600">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
