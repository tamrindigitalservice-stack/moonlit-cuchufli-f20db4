import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, FileText, AlertTriangle, Check, PhoneCall, MessageCircle } from 'lucide-react';
import { DOCUMENT_REQUIREMENTS_FAQ, BUSINESS_INFO } from '../data/services';

export const DocumentHelper: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent('নমস্কার, Tamrin Digital Service! কোন পরিষেবায় কী কী ডকুমেন্ট লাগবে জানতে চাই।')}`;

  return (
    <section id="document-helper" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-10 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-800 bg-blue-100 px-3.5 py-1.5 rounded-full border border-blue-200">
            নথি নির্দেশিকা
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            কোন পরিষেবার জন্য কী কী ডকুমেন্ট লাগবে?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
            আবেদন করার আগে প্রয়োজনীয় ডকুমেন্টের তালিকা দেখে নিন যাতে আপনার কাজ প্রথমবারেই সফল হয়।
          </p>
        </div>

        {/* Important Warning Notice */}
        <div className="bg-amber-50 border-2 border-amber-300 p-4 rounded-2xl mb-8 flex items-start gap-3.5 text-amber-950 text-xs sm:text-sm">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold text-amber-900 text-sm block mb-1">
              গুরুত্বপূর্ণ বার্তা:
            </strong>
            <p className="leading-relaxed">
              “প্রয়োজনীয় নথি পরিষেবা ও আবেদনকারীর অবস্থা অনুযায়ী পরিবর্তিত হতে পারে। আবেদন করার পূর্বে সঠিক তালিকার জন্য সরাসরি আমাদের সাথে যোগাযোগ করুন।”
            </p>
          </div>
        </div>

        {/* Expandable Accordion List */}
        <div className="space-y-3">
          {DOCUMENT_REQUIREMENTS_FAQ.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-200"
              >
                {/* Accordion Toggle Header */}
                <button
                  onClick={() => toggleAccordion(idx)}
                  id={`faq-toggle-${idx}`}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-base hover:bg-slate-50 transition-colors focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl text-xs ${isOpen ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-700'}`}>
                      <FileText className="w-5 h-5" />
                    </div>
                    <span>{faq.service}</span>
                  </div>

                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  )}
                </button>

                {/* Accordion Content Body */}
                {isOpen && (
                  <div className="p-5 pt-0 border-t border-slate-100 bg-slate-50/50 space-y-3 text-xs sm:text-sm animate-in fade-in duration-150">
                    <div className="pt-3">
                      <span className="font-bold text-slate-800 text-xs uppercase tracking-wider block mb-2 text-[#0F2C59]">
                        প্রয়োজনীয় নথিপত্রসমূহ:
                      </span>
                      <ul className="space-y-2">
                        {faq.bengaliDocs.map((doc, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2.5 text-slate-700 bg-white p-3 rounded-xl border border-slate-200">
                            <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span>{doc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {faq.note && (
                      <div className="p-3 bg-blue-50/80 rounded-xl border border-blue-200 text-blue-900 font-medium text-xs">
                        <strong>পরামর্শ:</strong> {faq.note}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Contact Prompt */}
        <div className="mt-8 bg-gradient-to-r from-[#0F2C59] to-[#1E3E62] text-white p-6 rounded-3xl text-center space-y-4">
          <h3 className="text-xl font-bold">
            অন্যান্য পরিষেবার ডকুমেন্ট জানতে আমাদের সাথে কথা বলুন
          </h3>
          <p className="text-xs sm:text-sm text-slate-200 max-w-xl mx-auto">
            আপনার কাছে নির্দিষ্ট ডকুমেন্ট না থাকলে বিকল্প কোনো উপায়ে কাজ করা সম্ভব কি না তা জানতে আমাদের অভিজ্ঞ টিমের সাথে পরামর্শ করুন।
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="inline-flex items-center gap-2 bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs py-2.5 px-5 rounded-xl transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-blue-600" />
              <span>কল করুন ({BUSINESS_INFO.phone})</span>
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-5 rounded-xl transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp এ জিজ্ঞেস করুন</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
