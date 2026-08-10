import React from 'react';
import { X, CheckCircle, Clock, FileText, Phone, MessageCircle, AlertCircle, ShieldCheck, Users, Info } from 'lucide-react';
import { ServiceItem, BUSINESS_INFO } from '../data/services';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ service, onClose }) => {
  if (!service) return null;

  const prefilledWhatsappText = `নমস্কার, Tamrin Digital Service! আমি "${service.titleBengali} (${service.titleEnglish})" পরিষেবাটি নিতে চাই। অনুগ্রহ করে প্রক্রিয়াটি জানাবেন।`;
  const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(prefilledWhatsappText)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[92vh] overflow-hidden flex flex-col border border-slate-200">
        
        {/* Modal Header */}
        <div className={`p-5 px-6 flex items-start justify-between ${
          service.category === 'central'
            ? 'bg-gradient-to-r from-[#0F2C59] via-blue-900 to-[#0F2C59] text-white'
            : 'bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 text-white'
        }`}>
          <div>
            <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase mb-2 bg-white/20 text-white border border-white/30 backdrop-blur-sm">
              {service.category === 'central' ? 'কেন্দ্রীয় সরকারের পরিষেবা' : 'পশ্চিমবঙ্গ সরকারের পরিষেবা'}
            </div>
            <h3 className="text-2xl font-extrabold text-white tracking-tight">
              {service.titleBengali}
            </h3>
            <p className="text-xs text-slate-200 font-semibold">
              {service.titleEnglish}
            </p>
          </div>

          <button
            onClick={onClose}
            id="close-modal-btn"
            className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-slate-700 text-sm">
          
          {/* 1. Short Description & General Information */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-600" />
              সাধারণ তথ্য (General Information):
            </h4>
            <p className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-slate-800 text-xs sm:text-sm leading-relaxed font-medium">
              {service.shortDesc}
            </p>
          </div>

          {/* Detailed Process Information */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              কাজের বিবরণ (Service Details):
            </h4>
            <p className="bg-blue-50/50 p-3.5 rounded-2xl border border-blue-100 text-slate-700 text-xs sm:text-sm leading-relaxed">
              {service.fullDesc}
            </p>
          </div>

          {/* 2. Who Can Use The Service */}
          <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-3.5 space-y-1 text-xs text-emerald-950">
            <h5 className="font-bold text-emerald-900 flex items-center gap-2 text-xs sm:text-sm">
              <Users className="w-4 h-4 text-emerald-700" />
              কারা আবেদন করতে পারবেন (Who can use):
            </h5>
            <p className="text-slate-700 leading-relaxed font-medium">
              {service.category === 'central'
                ? 'ভারতের যেকোনো নাগরিক উপযুক্ত প্রমাণপত্রসহ এই পরিষেবার জন্য আবেদন বা সহায়তা পেতে পারেন।'
                : 'পশ্চিমবঙ্গের স্থায়ী বাসিন্দা এবং উপযুক্ত পরিচয়পত্রধারী যেকোনো নাগরিক আবেদন করতে পারবেন।'}
            </p>
          </div>

          {/* 3. Turnaround Time */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 flex items-center gap-3 text-amber-950 text-xs sm:text-sm">
            <Clock className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <div>
              <span className="font-bold block">আনুমানিক সময়সীমা:</span>
              <span className="font-semibold text-amber-900">{service.turnaroundTime}</span>
            </div>
          </div>

          {/* 4. Required Documents */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm sm:text-base mb-2.5 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              প্রয়োজনীয় নথি (Required Documents):
            </h4>
            <div className="space-y-2">
              {service.documents.map((doc, idx) => (
                <div key={idx} className="flex items-start gap-2.5 bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-800 font-medium">{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Important Disclaimer Notice */}
          <div className="bg-amber-50/80 border border-amber-300 p-3.5 rounded-2xl text-xs text-amber-950 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>বিশেষ দ্রষ্টব্য:</strong> প্রয়োজনীয় নথি পরিষেবা অনুযায়ী পরিবর্তিত হতে পারে। আবেদন করার আগে আমাদের সাথে যোগাযোগ করুন।
            </p>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 px-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[11px] text-slate-500 font-semibold text-center sm:text-left">
            Tamrin Digital Service • স্বাধীন ডিজিটাল পরিষেবা কেন্দ্র
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs py-2.5 px-4 rounded-xl transition-colors shadow-sm"
            >
              <Phone className="w-4 h-4 fill-slate-950/20" />
              <span>Call Now ({BUSINESS_INFO.phone})</span>
            </a>

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

