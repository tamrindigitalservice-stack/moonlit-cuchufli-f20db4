import React, { useEffect } from 'react';
import {
  X,
  CheckCircle,
  Clock,
  FileText,
  Phone,
  MessageCircle,
  AlertCircle,
  ShieldCheck,
  Users,
  Info,
} from 'lucide-react';
import { ServiceItem, BUSINESS_INFO } from '../data/services';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
}) => {
  if (!service) return null;

  const prefilledWhatsappText = `নমস্কার, Tamrin Digital Service! আমি "${service.titleBengali} (${service.titleEnglish})" পরিষেবাটি নিতে চাই। অনুগ্রহ করে প্রক্রিয়াটি জানাবেন।`;

  const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(
    prefilledWhatsappText
  )}`;

  // Close modal with Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9999] bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label={`${service.titleBengali} পরিষেবার বিস্তারিত তথ্য`}
    >
      {/* Close Button - Always Visible */}
      <button
        type="button"
        onClick={onClose}
        id="close-modal-btn"
        aria-label="Close modal"
        title="বন্ধ করুন"
        className="absolute top-4 right-4 z-[10000] w-12 h-12 rounded-full bg-white text-slate-900 border-2 border-slate-300 shadow-2xl flex items-center justify-center hover:bg-slate-100 hover:scale-105 active:scale-95 transition-all duration-150 cursor-pointer"
      >
        <X className="w-7 h-7" strokeWidth={3} />
      </button>

      {/* Modal */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl shadow-2xl w-[calc(100%-24px)] sm:w-[calc(100%-32px)] max-w-2xl max-h-[92vh] overflow-hidden flex flex-col border border-slate-200">
        {/* Modal Header */}
        <div
          className={`p-5 px-6 pr-16 flex-shrink-0 flex items-start justify-between gap-4 ${
            service.category === 'central'
              ? 'bg-gradient-to-r from-[#0F2C59] via-blue-900 to-[#0F2C59] text-white'
              : 'bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 text-white'
          }`}
        >
          <div className="min-w-0 flex-1">
            <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase mb-2 bg-white/20 text-white border border-white/30 backdrop-blur-sm">
              {service.category === 'central'
                ? 'কেন্দ্রীয় সরকারের পরিষেবা'
                : 'পশ্চিমবঙ্গ সরকারের পরিষেবা'}
            </div>

            <h3 className="text-2xl font-extrabold text-white tracking-tight break-words">
              {service.titleBengali}
            </h3>

            <p className="text-xs text-slate-200 font-semibold break-words">
              {service.titleEnglish}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 min-h-0 flex-1 overflow-y-auto space-y-5 text-slate-700 text-sm">
          {/* General Information */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-600 flex-shrink-0" />
              সাধারণ তথ্য (General Information):
            </h4>

            <p className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-slate-800 text-xs sm:text-sm leading-relaxed font-medium">
              {service.shortDesc}
            </p>
          </div>

          {/* Service Details */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600 flex-shrink-0" />
              কাজের বিবরণ (Service Details):
            </h4>

            <p className="bg-blue-50/50 p-3.5 rounded-2xl border border-blue-100 text-slate-700 text-xs sm:text-sm leading-relaxed">
              {service.fullDesc}
            </p>
          </div>

          {/* Who Can Use */}
          <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-3.5 space-y-1 text-xs text-emerald-950">
            <h5 className="font-bold text-emerald-900 flex items-center gap-2 text-xs sm:text-sm">
              <Users className="w-4 h-4 text-emerald-700 flex-shrink-0" />
              কারা আবেদন করতে পারবেন (Who can use):
            </h5>

            <p className="text-slate-700 leading-relaxed font-medium">
              {service.category === 'central'
                ? 'ভারতের যেকোনো নাগরিক উপযুক্ত প্রমাণপত্রসহ এই পরিষেবার জন্য আবেদন বা সহায়তা পেতে পারেন।'
                : 'পশ্চিমবঙ্গের স্থায়ী বাসিন্দা এবং উপযুক্ত পরিচয়পত্রধারী যেকোনো নাগরিক আবেদন করতে পারবেন।'}
            </p>
          </div>

          {/* Turnaround Time */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 flex items-center gap-3 text-amber-950 text-xs sm:text-sm">
            <Clock className="w-5 h-5 text-amber-600 flex-shrink-0" />

            <div>
              <span className="font-bold block">আনুমানিক সময়সীমা:</span>

              <span className="font-semibold text-amber-900">
                {service.turnaroundTime}
              </span>
            </div>
          </div>

          {/* Required Documents */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm sm:text-base mb-2.5 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              প্রয়োজনীয় নথি (Required Documents):
            </h4>

            <div className="space-y-2">
              {service.documents.map((doc, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />

                  <span className="text-slate-800 font-medium">
                    {doc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-amber-50/80 border border-amber-300 p-3.5 rounded-2xl text-xs text-amber-950 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />

            <p className="leading-relaxed">
              <strong>বিশেষ দ্রষ্টব্য:</strong> প্রয়োজনীয় নথি পরিষেবা অনুযায়ী
              পরিবর্তিত হতে পারে। আবেদন করার আগে আমাদের সাথে যোগাযোগ করুন।
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 px-6 flex-shrink-0 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[11px] text-slate-500 font-semibold text-center sm:text-left">
            Tamrin Digital Service • স্বাধীন ডিজিটাল পরিষেবা কেন্দ্র
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {/* Call Button */}
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs py-2.5 px-4 rounded-xl transition-colors shadow-sm"
            >
              <Phone className="w-4 h-4 fill-slate-950/20" />

              <span>Call Now ({BUSINESS_INFO.phone})</span>
            </a>

            {/* WhatsApp Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-colors shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-white/20" />

              <span>WhatsApp করুন</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
