import React from 'react';
import { MapPin, Navigation, MessageCircle, Phone } from 'lucide-react';
import { BUSINESS_INFO } from '../data/services';

export const GoogleMap: React.FC = () => {
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${BUSINESS_INFO.name}, Natun Bazar, Ramnagar, Paschim Medinipur, 721305`)}`;
  const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent('নমস্কার, Tamrin Digital Service-এর অবস্থান সংক্রান্ত তথ্য জানতে চাই।')}`;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-md space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-50 text-red-600 rounded-2xl border border-red-200">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-lg">আমাদের ঠিকানা</h3>
            <p className="text-sm font-bold text-slate-800">{BUSINESS_INFO.name}</p>
            <p className="text-xs text-slate-600 font-medium">Natun Bazar, Ramnagar, Paschim Medinipur, West Bengal - 721305</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="btn-get-directions"
            className="inline-flex items-center justify-center gap-1.5 bg-[#0F2C59] hover:bg-blue-900 text-white font-bold text-xs py-2.5 px-3.5 rounded-xl transition-colors shadow-sm"
          >
            <Navigation className="w-4 h-4 text-emerald-400" />
            <span>Google Maps-এ দেখুন</span>
          </a>

          <a
            href={`tel:${BUSINESS_INFO.phone}`}
            id="btn-location-call"
            className="inline-flex items-center justify-center gap-1.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs py-2.5 px-3.5 rounded-xl transition-colors shadow-sm"
          >
            <Phone className="w-4 h-4 fill-slate-950/20" />
            <span>Call Now</span>
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="btn-location-whatsapp"
            className="inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-3.5 rounded-xl transition-colors shadow-sm"
          >
            <MessageCircle className="w-4 h-4 fill-white/20" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Embedded Map Visual Frame */}
      <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center">
        <iframe
          title="Tamrin Digital Service Location Map"
          src={`https://maps.google.com/maps?q=${encodeURIComponent('Ramnagar Paschim Medinipur 721305 West Bengal')}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
          className="w-full h-full border-0"
          loading="lazy"
          allowFullScreen
        />

        {/* Floating Address Overlay Card on Map */}
        <div className="absolute bottom-3 left-3 right-3 sm:right-auto bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-lg border border-slate-200 text-xs space-y-1">
          <div className="font-bold text-slate-900 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Tamrin Digital Service (TDS)
          </div>
          <p className="text-slate-600 font-medium">
            নতুন বাজার, রামনগর, পশ্চিম মেদিনীপুর - ৭২১৩০৫
          </p>
          <p className="text-emerald-700 font-bold text-[11px] pt-0.5">
            মোবাইল: {BUSINESS_INFO.phone}
          </p>
        </div>
      </div>
    </div>
  );
};
