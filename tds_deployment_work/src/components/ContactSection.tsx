import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, MapPin, Mail, Clock, Send, CheckCircle2, Sparkles, Calendar } from 'lucide-react';
import { BUSINESS_INFO, CENTRAL_SERVICES, WEST_BENGAL_SERVICES } from '../data/services';
import { GoogleMap } from './GoogleMap';
import { getStoredSettings } from '../data/store';
import { BusinessSettings } from '../types';

export const ContactSection: React.FC = () => {
  const [settings, setSettings] = useState<BusinessSettings>(getStoredSettings());

  useEffect(() => {
    const update = () => setSettings(getStoredSettings());
    update();
    window.addEventListener('tds_settings_updated', update);
    return () => window.removeEventListener('tds_settings_updated', update);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    service: 'আধার কার্ড অনলাইন সেবা',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile) {
      alert('অনুগ্রহ করে নাম এবং মোবাইল নম্বর পূরণ করুন।');
      return;
    }

    setSubmitted(true);
  };

  const prefilledWhatsappText = `নমস্কার, ${settings.businessName}!

আমার নাম: ${formData.name || 'আবেদনকারী'}
মোবাইল নম্বর: ${formData.mobile || 'নম্বর প্রদান করা হয়েছে'}
পরিষেবা: ${formData.service}
বার্তা: ${formData.message || 'অনলাইন কাজের বিষয়ে তথ্য চাই'}`;

  const whatsappUrl = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(prefilledWhatsappText)}`;

  return (
    <section id="contact" className="py-16 bg-slate-100/80 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3.5 py-1.5 rounded-full border border-emerald-300">
            যোগাযোগ ও অবস্থান
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            আমাদের সাথে সহজে যোগাযোগ করুন
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            সরাসরি সেন্টারে চলে আসুন, কল করুন অথবা নিচে ফর্মটি পূরণ করে আমাদের বার্তা পাঠান।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Left Column: Direct Contact Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Phone & WhatsApp Card */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                <Phone className="w-5 h-5 text-blue-600" />
                সরাসরি কল বা মেসেজ করুন
              </h3>

              <div className="space-y-3">
                <a
                  href={`tel:${settings.phone}`}
                  className="flex items-center justify-between p-3.5 bg-blue-50/70 hover:bg-blue-100 rounded-2xl border border-blue-200 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-600 text-white rounded-xl">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 font-medium block">মোবাইল নম্বর (Call Now)</span>
                      <strong className="text-slate-900 text-base font-bold">{settings.phone}</strong>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-blue-700 bg-white px-3 py-1 rounded-lg border border-blue-200">
                    কল করুন
                  </span>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 bg-emerald-50/70 hover:bg-emerald-100 rounded-2xl border border-emerald-200 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-emerald-600 text-white rounded-xl">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 font-medium block">হোয়াটসঅ্যাপ সাপোর্ট</span>
                      <strong className="text-slate-900 text-base font-bold">{settings.whatsapp}</strong>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-800 bg-white px-3 py-1 rounded-lg border border-emerald-200">
                    WhatsApp
                  </span>
                </a>
              </div>
            </div>

            {/* Address & Dynamic Business Hours Card */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-red-50 text-red-600 rounded-xl flex-shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">ডিজিটাল সেন্টার ঠিকানা</h4>
                  <p className="text-slate-700 font-medium mt-1 leading-relaxed">
                    {settings.businessName} (TDS)<br />
                    {settings.address}
                  </p>
                </div>
              </div>

              {/* Weekly Business Hours List */}
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-xs">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>সাপ্তাহিক কাজের সময়সূচী (Business Hours):</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
                  {settings.weeklySchedule.map((s) => (
                    <div key={s.day} className="flex items-center justify-between bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <span className="font-bold text-slate-800">{s.dayBengali}:</span>
                      {s.isOpen ? (
                        <span className="text-slate-700 font-semibold">{s.openTime} - {s.closeTime}</span>
                      ) : (
                        <span className="text-red-600 font-bold">বন্ধ (Closed)</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-900">
                অনলাইন যোগাযোগের ফর্ম
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                নিচে আপনার কাজের বিষয় ও মোবাইল নাম নম্বর দিলে আমরা অতি দ্রুত যোগাযোগ করব।
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    আপনার নাম (Name) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="আপনার নাম লিখুন"
                    className="w-full bg-slate-50 text-slate-900 font-medium text-sm p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    মোবাইল নম্বর (Mobile Number) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    placeholder="আপনার মোবাইল নাম্বার"
                    className="w-full bg-slate-50 text-slate-900 font-medium text-sm p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  পরিষেবা নির্বাচন করুন (Select Service)
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full bg-slate-50 text-slate-900 font-bold text-sm p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                >
                  <optgroup label="কেন্দ্র সরকারের পরিষেবা">
                    {CENTRAL_SERVICES.map((s) => (
                      <option key={s.id} value={`${s.titleBengali} (${s.titleEnglish})`}>
                        {s.titleBengali} ({s.titleEnglish})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="পশ্চিমবঙ্গ রাজ্য সরকারের পরিষেবা">
                    {WEST_BENGAL_SERVICES.map((s) => (
                      <option key={s.id} value={`${s.titleBengali} (${s.titleEnglish})`}>
                        {s.titleBengali} ({s.titleEnglish})
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  আপনার বার্তা / প্রশ্ন (Message)
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="আপনার কাজের বিবরণ বা জানতে চাওয়া বার্তা লিখুন..."
                  className="w-full bg-slate-50 text-slate-900 font-medium text-sm p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  id="contact-form-submit"
                  className="flex-1 bg-[#0F2C59] hover:bg-blue-900 text-white font-bold text-sm py-3 px-6 rounded-xl shadow-md flex items-center justify-center gap-2 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>বার্তা জমা দিন</span>
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3 px-6 rounded-xl shadow-md flex items-center justify-center gap-2 transition-colors text-center justify-center"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp এ সরাসরি পাঠান</span>
                </a>
              </div>

              {submitted && (
                <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-900 text-xs sm:text-sm space-y-2 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2 font-bold text-emerald-950">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>ধন্যবাদ, {formData.name}! আপনার বার্তাটি গ্রহণ করা হয়েছে।</span>
                  </div>
                  <p className="text-emerald-800">
                    আমাদের টিম শীঘ্রই আপনার দেওয়া মোবাইল নম্বর ({formData.mobile})-এ যোগাযোগ করবে। দ্রুত উত্তরের জন্য আপনি ১-ক্লিকে হোয়াটসঅ্যাপ ব্যবহার করতে পারেন।
                  </p>
                </div>
              )}

            </form>
          </div>

        </div>

        {/* Google Map Subsection */}
        <GoogleMap />

      </div>
    </section>
  );
};
