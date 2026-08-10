import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, Layers, Landmark, Building2, Star, RefreshCw } from 'lucide-react';
import { ServiceItem } from '../data/services';
import { getStoredServices } from '../data/store';
import { ServiceCard } from './ServiceCard';
import { ServiceDetailModal } from './ServiceDetailModal';

export const ServicesSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'central' | 'wb' | 'popular'>('all');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [allServices, setAllServices] = useState<ServiceItem[]>([]);

  const loadServices = () => {
    const list = getStoredServices().filter((s) => s.isActive !== false);
    setAllServices(list);
  };

  useEffect(() => {
    loadServices();
    window.addEventListener('tds_services_updated', loadServices);
    return () => window.removeEventListener('tds_services_updated', loadServices);
  }, []);

  const filteredServices = useMemo(() => {
    return allServices.filter((service) => {
      // Category filter
      if (activeCategory === 'central' && service.category !== 'central') return false;
      if (activeCategory === 'wb' && service.category !== 'wb') return false;
      if (activeCategory === 'popular' && !service.isPopular) return false;

      // Text Search query
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase().trim();
      return (
        service.titleBengali.toLowerCase().includes(query) ||
        service.titleEnglish.toLowerCase().includes(query) ||
        service.shortDesc.toLowerCase().includes(query) ||
        service.documents.some((doc) => doc.toLowerCase().includes(query))
      );
    });
  }, [allServices, activeCategory, searchQuery]);

  const centralCount = useMemo(() => allServices.filter((s) => s.category === 'central').length, [allServices]);
  const wbCount = useMemo(() => allServices.filter((s) => s.category === 'wb').length, [allServices]);

  return (
    <section id="services" className="py-16 bg-slate-100/70 border-y border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-100/80 px-3.5 py-1.5 rounded-full border border-emerald-300">
            আমাদের ডিজিটাল পরিষেবা
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            কেন্দ্র ও রাজ্য সরকারের সমস্ত অনলাইন পরিষেবা
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            আপনার প্রয়োজনীয় পরিষেবাটি বেছে নিন বা সরাসরি অনুসন্ধান করুন। সহজ নথি জমা দিয়ে ঘরে বসেই কাজ সম্পন্ন করার সুবিধা।
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-md border border-slate-200 max-w-4xl mx-auto mb-10 space-y-4">
          
          {/* Search Input Box */}
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="আপনার প্রয়োজনীয় পরিষেবা খুঁজুন (যেমন: আধার, প্যান, পাসপোর্ট, রেশন কার্ড, খতিয়ান, ইনকাম...)"
              className="w-full bg-slate-50 text-slate-900 placeholder-slate-400 text-sm sm:text-base font-medium pl-12 pr-10 py-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 bg-slate-200 hover:bg-slate-300 rounded-full p-1 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Tabs Filter */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                  activeCategory === 'all'
                    ? 'bg-[#0F2C59] text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>সব পরিষেবা ({allServices.length})</span>
              </button>

              <button
                onClick={() => setActiveCategory('central')}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                  activeCategory === 'central'
                    ? 'bg-blue-800 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Landmark className="w-4 h-4 text-blue-400" />
                <span>কেন্দ্র সরকার ({centralCount})</span>
              </button>

              <button
                onClick={() => setActiveCategory('wb')}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                  activeCategory === 'wb'
                    ? 'bg-emerald-700 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Building2 className="w-4 h-4 text-emerald-300" />
                <span>পশ্চিমবঙ্গ রাজ্য ({wbCount})</span>
              </button>

              <button
                onClick={() => setActiveCategory('popular')}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                  activeCategory === 'popular'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Star className="w-4 h-4 text-amber-300" />
                <span>জনপ্রিয় সেবা</span>
              </button>
            </div>

            {(searchQuery || activeCategory !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="text-xs text-slate-500 hover:text-red-600 font-semibold flex items-center gap-1 ml-auto"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>ফিল্টার রিক্লিয়ার করুন</span>
              </button>
            )}
          </div>
        </div>

        {/* Results Counter Banner */}
        <div className="flex items-center justify-between mb-6 px-1">
          <p className="text-xs sm:text-sm text-slate-600 font-semibold">
            {filteredServices.length > 0 ? (
              <span>
                মোট <strong className="text-emerald-700 font-bold">{filteredServices.length}টি</strong> পরিষেবা পাওয়া গেছে
              </span>
            ) : (
              <span className="text-red-600">কোনো পরিষেবা পাওয়া যায়নি</span>
            )}
          </p>
        </div>

        {/* Central Govt Category Heading when viewing all or central */}
        {(activeCategory === 'all' || activeCategory === 'central') && !searchQuery && (
          <div id="central-services" className="mb-6 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-3 bg-blue-900 text-white p-3.5 px-5 rounded-2xl shadow-sm mb-6">
              <Landmark className="w-6 h-6 text-blue-300" />
              <div>
                <h3 className="font-bold text-lg">কেন্দ্র সরকারের পরিষেবা (Central Govt Services)</h3>
                <p className="text-xs text-blue-200">আধার, প্যান, পাসপোর্ট, আইটিআর, পিএম কিষান, আইআরসিটিসি ইত্যাদি</p>
              </div>
            </div>
          </div>
        )}

        {/* Services Grid */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onSelect={(serv) => setSelectedService(serv)}
              />
            ))}
          </div>
        ) : (
          /* Empty Search Fallback */
          <div className="bg-white rounded-3xl p-10 text-center space-y-4 max-w-md mx-auto border border-slate-200 shadow-sm">
            <Search className="w-12 h-12 text-slate-300 mx-auto" />
            <h4 className="font-bold text-slate-800 text-lg">
              “{searchQuery}” নামে কোনো পরিষেবা মেলেনি
            </h4>
            <p className="text-slate-500 text-xs leading-relaxed">
              অনুগ্রহ করে অন্য নাম দিয়ে খুঁজুন অথবা আমাদের সরাসরি কল/হোয়াটসঅ্যাপ করুন। যেকোনো ধরণের বিশেষ অনলাইন পরিষেবার কাজ আমরা করি।
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="bg-[#0F2C59] text-white hover:bg-blue-900 font-bold text-xs px-5 py-2.5 rounded-xl transition-colors"
            >
              সমস্ত পরিষেবা দেখুন
            </button>
          </div>
        )}

        {/* State Govt Category Tag anchor when all */}
        <div id="wb-services" className="pt-10" />

      </div>

      {/* Interactive Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </section>
  );
};
