import React from 'react';
import {
  Fingerprint,
  CreditCard,
  Globe,
  Receipt,
  Landmark,
  Flame,
  Sprout,
  Lock,
  Briefcase,
  TrainTrack,
  Map,
  FileText,
  Award,
  FileSpreadsheet,
  Home,
  ShoppingBag,
  HeartPulse,
  GraduationCap,
  Car,
  Layers,
  ChevronRight,
  MessageCircle,
  Info
} from 'lucide-react';
import { ServiceItem, BUSINESS_INFO } from '../data/services';

interface ServiceCardProps {
  service: ServiceItem;
  onSelect: (service: ServiceItem) => void;
}

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Fingerprint,
  CreditCard,
  Globe,
  Receipt,
  Landmark,
  Flame,
  Sprout,
  Lock,
  Briefcase,
  TrainTrack,
  Map,
  FileText,
  Award,
  FileSpreadsheet,
  Home,
  ShoppingBag,
  HeartPulse,
  GraduationCap,
  Car,
  Layers
};

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onSelect }) => {
  const IconComponent = ICON_MAP[service.iconName] || FileText;

  const prefilledWhatsappText = `নমস্কার, Tamrin Digital Service! আমি "${service.titleBengali}" অনলাইন পরিষেবা নিয়ে সাহায্য চাই।`;
  const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(prefilledWhatsappText)}`;

  const isCentral = service.category === 'central';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 overflow-hidden relative">
      {/* Top Banner Stripe */}
      <div className={`h-1.5 w-full ${isCentral ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : 'bg-gradient-to-r from-emerald-500 to-teal-600'}`} />

      <div className="p-5 space-y-4">
        {/* Category & Badge Row */}
        <div className="flex items-center justify-between gap-2">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
            isCentral
              ? 'bg-blue-50 text-blue-800 border-blue-200'
              : 'bg-emerald-50 text-emerald-800 border-emerald-200'
          }`}>
            {isCentral ? 'কেন্দ্র সরকার' : 'রাজ্য সরকার'}
          </span>

          {service.isPopular && (
            <span className="text-[10px] font-extrabold bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded-full">
              ★ জনপ্রিয়
            </span>
          )}
        </div>

        {/* Header Icon + Title */}
        <div className="flex items-start gap-3.5">
          <div className={`p-3 rounded-2xl flex-shrink-0 transition-colors group-hover:scale-105 ${
            isCentral
              ? 'bg-blue-50 text-blue-700 group-hover:bg-blue-600 group-hover:text-white'
              : 'bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white'
          }`}>
            <IconComponent className="w-6 h-6" />
          </div>

          <div>
            <h3 className="font-bold text-slate-900 text-lg leading-snug group-hover:text-blue-900 transition-colors">
              {service.titleBengali}
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              {service.titleEnglish}
            </p>
          </div>
        </div>

        {/* Short Description */}
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-2">
          {service.shortDesc}
        </p>

        {/* Key documents preview snippet */}
        <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
          <span className="text-slate-700 font-bold block mb-1">প্রয়োজনীয় নথি:</span>
          <p className="line-clamp-1 italic text-slate-600">
            • {service.documents.join(' • ')}
          </p>
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="p-4 pt-0 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
        <button
          onClick={() => onSelect(service)}
          id={`btn-know-${service.id}`}
          className="flex-1 inline-flex items-center justify-center gap-1.5 bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs py-2 px-3 rounded-xl border border-slate-200 transition-colors shadow-2xl"
        >
          <Info className="w-3.5 h-3.5 text-blue-600" />
          <span>জানুন</span>
        </button>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          id={`btn-apply-${service.id}`}
          className="flex-1 inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2 px-3 rounded-xl transition-colors shadow-sm"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>আবেদন সহায়তা</span>
        </a>
      </div>
    </div>
  );
};
