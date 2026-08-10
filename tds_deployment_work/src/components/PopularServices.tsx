import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Star, MessageCircle, Info, Fingerprint, CreditCard, Globe, Landmark, Map, Award, FileSpreadsheet, HeartPulse, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { ServiceItem, BUSINESS_INFO } from '../data/services';
import { getStoredServices } from '../data/store';
import { motion } from 'motion/react';

interface PopularServicesProps {
  onSelectService: (service: ServiceItem) => void;
}

export const PopularServices: React.FC<PopularServicesProps> = ({ onSelectService }) => {
  const [allServices, setAllServices] = useState<ServiceItem[]>([]);

  const loadServices = () => {
    setAllServices(getStoredServices().filter((s) => s.isActive !== false));
  };

  useEffect(() => {
    loadServices();
    window.addEventListener('tds_services_updated', loadServices);
    return () => window.removeEventListener('tds_services_updated', loadServices);
  }, []);

  // Specific popular items requested by user
  const popularKeywords = [
    { key: 'aadhaar', icon: Fingerprint },
    { key: 'pan', icon: CreditCard },
    { key: 'passport', icon: Globe },
    { key: 'itr', icon: Landmark },
    { key: 'banglarbhumi', icon: Map },
    { key: 'caste', icon: Award },
    { key: 'income', icon: FileSpreadsheet },
    { key: 'ration', icon: ShieldCheck },
    { key: 'pm-kisan', icon: CheckCircle2 },
    { key: 'swasthya', icon: HeartPulse }
  ];

  const popularList: { service: ServiceItem; Icon: React.ElementType }[] = [];

  popularKeywords.forEach(({ key, icon }) => {
    const found = allServices.find((s) => s.id === key || s.id.includes(key) || (key === 'pm-kisan' && s.id.includes('pmkisan')));
    if (found) {
      popularList.push({ service: found, Icon: icon });
    }
  });

  if (popularList.length === 0) {
    allServices.slice(0, 10).forEach((srv) => {
      popularList.push({ service: srv, Icon: Star });
    });
  }

  return (
    <section id="popular-services" className="py-14 bg-white relative overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-900 border border-amber-200 px-3.5 py-1 rounded-full text-xs font-bold mb-2.5">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>জনপ্রিয় সেবা সমুহ</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              জনপ্রিয় ডিজিটাল পরিষেবা (Popular Services)
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1.5">
              আমাদের কেন্দ্র থেকে সবচেয়ে বেশি গ্রাহক দ্বারা আবেদনকৃত প্রধান সরকারি কাজসমূহ
            </p>
          </div>

          <a
            href="#services"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#0F2C59] hover:text-emerald-600 transition-colors self-start md:self-auto group"
          >
            <span>সমস্ত পরিষেবা দেখুন ({allServices.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* 10 Popular Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {popularList.map(({ service, Icon }) => {
            const prefilledWhatsappText = `নমস্কার, Tamrin Digital Service! আমি "${service.titleBengali}" পরিষেবাটির আবেদন সাহায্য নিতে চাই।`;
            const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(prefilledWhatsappText)}`;
            const isCentral = service.category === 'central';

            return (
              <div
                key={service.id}
                className="bg-slate-50/90 hover:bg-white rounded-2xl p-4 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 relative"
              >
                <div className="space-y-3">
                  
                  {/* Category Badge & Icon */}
                  <div className="flex items-center justify-between gap-2">
                    <div className={`p-2.5 rounded-xl ${
                      isCentral ? 'bg-blue-100 text-blue-900' : 'bg-emerald-100 text-emerald-900'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    
                    <span className={`text-[10px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded-md border ${
                      isCentral
                        ? 'bg-blue-50 text-blue-900 border-blue-200'
                        : 'bg-emerald-50 text-emerald-900 border-emerald-200'
                    }`}>
                      {isCentral ? 'কেন্দ্রীয়' : 'পশ্চিমবঙ্গ'}
                    </span>
                  </div>

                  {/* Title */}
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base group-hover:text-[#0F2C59] transition-colors leading-snug">
                      {service.titleBengali}
                    </h3>
                    <p className="text-[11px] text-slate-500 font-semibold">{service.titleEnglish}</p>
                  </div>

                  {/* Short Desc */}
                  <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed">
                    {service.shortDesc}
                  </p>
                </div>

                {/* Bottom Buttons */}
                <div className="pt-3 mt-3 border-t border-slate-200/80 flex flex-col gap-2">
                  <button
                    onClick={() => onSelectService(service)}
                    className="w-full inline-flex items-center justify-center gap-1.5 bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs py-2 px-3 rounded-xl border border-slate-200 shadow-sm transition-colors"
                  >
                    <Info className="w-3.5 h-3.5 text-blue-600" />
                    <span>বিস্তারিত</span>
                  </button>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2 px-3 rounded-xl transition-all shadow-sm hover:shadow-md"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp করুন</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

