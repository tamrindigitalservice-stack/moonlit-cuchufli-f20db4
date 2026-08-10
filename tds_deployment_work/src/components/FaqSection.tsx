import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, MessageCircle, Phone, ArrowRight } from 'lucide-react';
import { BUSINESS_INFO } from '../data/services';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "কীভাবে পরিষেবা নেব?",
    answer: "আপনি আমাদের ওয়েবসাইটের মাধ্যমে পছন্দের পরিষেবা নির্বাচন করে সরাসরি 'WhatsApp করুন' বাটনে ক্লিক করতে পারেন অথবা সার্ভিস রিকোয়েস্ট ফর্ম পূরণ করে আমাদের জানাতে পারেন। চাইলে সরাসরি আমাদের কেন্দ্রে (Natun Bazar, Ramnagar) এসেও পরিষেবা নিতে পারেন।"
  },
  {
    question: "কোন কোন পরিষেবা পাওয়া যায়?",
    answer: "আমরা কেন্দ্র ও রাজ্য সরকারের বিভিন্ন গুরুত্বপূর্ণ অনলাইন কাজের সহায়তা প্রদান করি—যেমন আধার সংশোধন, নতুন প্যান কার্ড ও সংশোধন, পাসপোর্ট আবেদন, ইনকাম ট্যাক্স (ITR), ভোটার কার্ড, বাংলারভূমি পরচা ও খতিয়ান, ইনকাম ও কাষ্ট সার্টিফিকেট, রেশন কার্ড ডিজিটাল কাজ, পিএম কিষান, স্বাস্থ্য সাথী ইত্যাদি।"
  },
  {
    question: "কীভাবে WhatsApp-এ যোগাযোগ করব?",
    answer: "আমাদের ওয়েবসাইটে থাকা যেকোনো 'WhatsApp করুন' বাটনে ক্লিক করলে আপনার মোবাইলে সরাসরি হোয়াটসঅ্যাপ খুলে যাবে এবং স্বয়ংক্রিয় বার্তা তৈরি হবে। সেখান থেকে আপনি ১-ক্লিকে আমাদের সাথে কথা বলতে পারবেন। আমাদের অফিসিয়াল হোয়াটসঅ্যাপ নম্বর হলো: +91 9635191520।"
  },
  {
    question: "কী কী document লাগবে?",
    answer: "পরিষেবার ধরন অনুযায়ী প্রয়োজনীয় নথিপত্র পরিবর্তিত হয়। যেমন আধারের জন্য সাধারণত ভোটার/মাধ্যমিক অ্যাডমিট/ব্যাংক বই, প্যান কার্ডের জন্য আধার কার্ড ও ফটো প্রয়োজন হয়। ওয়েবসাইটের 'প্রয়োজনীয় নথি হেলপার' সেকশন থেকে যেকোনো কাজের নির্দিষ্ট নথির তালিকা দেখে নিতে পারেন।"
  },
  {
    question: "অনলাইন আবেদন করতে কত সময় লাগে?",
    answer: "আমাদের সেন্টারে ফর্ম পূরণের কাজ তাৎক্ষণিকভাবে সম্পন্ন করা হয়। তবে সরকারি পোর্টাল ভেরিফিকেশন ও ডিজিটাল সার্টিফিকেট ইস্যুর সময়সীমা সরকারি দপ্তরের নিয়মানুযায়ী নির্ধারিত হয় (সাধারণত ১ থেকে ১৫ কার্যদিবসের মধ্যে)।"
  },
  {
    question: "দোকানে আসা কি প্রয়োজন?",
    answer: "অনেক কাজ আপনি ঘরে বসেই হোয়াটসঅ্যাপের মাধ্যমে প্রয়োজনীয় নথি পাঠিয়ে সম্পন্ন করতে পারেন। তবে যেসমস্ত কাজের ক্ষেত্রে সরাসরি বায়োমেট্রিক (আঙুলের ছাপ/আইরিস) বা ফিজিক্যাল ভেরিফিকেশন প্রয়োজন, সেগুলির ক্ষেত্রে আমাদের কেন্দ্রে আসা সুবিধাজনক।"
  }
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent('নমস্কার, Tamrin Digital Service! আমার একটি বিশেষ প্রশ্ন রয়েছে।')}`;

  return (
    <section id="faq" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 border border-blue-200 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-4 h-4 text-blue-700" />
            সাধারণ জিজ্ঞাসিত প্রশ্নাবলী (FAQ)
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            আপনার প্রশ্নের উত্তর জানুন
          </h2>

          <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto">
            আমাদের ডিজিটাল পরিষেবা সম্পর্কে গ্রাহকদের সাধারণ কিছু জিজ্ঞাসার উত্তর নিচে দেওয়া হলো।
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-extrabold text-slate-900 text-sm sm:text-base hover:text-blue-900 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 border border-blue-100 flex items-center justify-center text-xs font-mono font-black flex-shrink-0">
                      Q{idx + 1}
                    </span>
                    <span>{faq.question}</span>
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-slate-700 text-xs sm:text-sm leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    <p className="font-medium text-slate-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Help Prompt Footer */}
        <div className="mt-8 bg-gradient-to-r from-[#0F2C59] to-blue-900 text-white p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div>
            <h4 className="font-bold text-sm sm:text-base text-white">
              অন্য কোনো প্রশ্ন আছে?
            </h4>
            <p className="text-xs text-slate-300">
              আমাদের টিম আপনাকে সাহায্য করার জন্য সর্বদা প্রস্তুত।
            </p>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-all shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-white/20" />
              <span>WhatsApp-এ জিজ্ঞাসা করুন</span>
            </a>

            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs py-2.5 px-4 rounded-xl border border-white/20 transition-all"
            >
              <Phone className="w-4 h-4 text-amber-300" />
              <span>কল করুন</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
