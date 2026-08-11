import React, { useState, useEffect } from 'react';
import { Sparkles, MessageCircle, PhoneCall, ShieldAlert, CheckCircle, ArrowRight, User, Phone, Layers } from 'lucide-react';
import { CENTRAL_SERVICES, WEST_BENGAL_SERVICES, ServiceItem, BUSINESS_INFO } from '../data/services';
import { addServiceRequest, getStoredServices, getStoredSettings } from '../data/store';

export const ServiceAssistant: React.FC = () => {
  const [servicesList, setServicesList] = useState<ServiceItem[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [contactMethod, setContactMethod] = useState<'WhatsApp' | 'Phone'>('WhatsApp');
  const [messageReq, setMessageReq] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState(BUSINESS_INFO.whatsapp);

  const [errors, setErrors] = useState<{ name?: string; phone?: string; service?: string }>({});
  const [successMessage, setSuccessMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadServicesAndSettings = () => {
    const list = getStoredServices().filter((s) => s.isActive !== false);
    setServicesList(list);
    if (list.length > 0 && !selectedServiceId) {
      setSelectedServiceId(list[0].id);
    }
    const settings = getStoredSettings();
    if (settings.whatsapp) {
      setWhatsappNumber(settings.whatsapp);
    }
  };

  useEffect(() => {
    loadServicesAndSettings();
    window.addEventListener('tds_services_updated', loadServicesAndSettings);
    window.addEventListener('tds_settings_updated', loadServicesAndSettings);
    return () => {
      window.removeEventListener('tds_services_updated', loadServicesAndSettings);
      window.removeEventListener('tds_settings_updated', loadServicesAndSettings);
    };
  }, []);

  const activeService = servicesList.find((s) => s.id === selectedServiceId) || servicesList[0] || {
    id: 'gen-1',
    titleBengali: 'সাধারণ অনুসন্ধান',
    titleEnglish: 'General Query',
    category: 'wb'
  };

  const validateForm = () => {
    const newErrors: { name?: string; phone?: string; service?: string } = {};

    if (!userName.trim()) {
      newErrors.name = 'আপনার নাম লিখুন';
    }

    // Validate 10-digit Indian phone number
    const phoneRegex = /^[6-9]\d{9}$/;
    const cleanedPhone = userPhone.replace(/\D/g, '');
    if (!cleanedPhone || !phoneRegex.test(cleanedPhone)) {
      newErrors.phone = 'সঠিক ১০ সংখ্যার মোবাইল নম্বর দিন';
    }

    if (!selectedServiceId) {
      newErrors.service = 'একটি পরিষেবা নির্বাচন করুন';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getCategoryLabel = (cat: string) => {
    if (cat === 'central') return 'কেন্দ্রীয় সরকার (Central Govt)';
    if (cat === 'wb' || cat === 'west_bengal') return 'পশ্চিমবঙ্গ সরকার (West Bengal Govt)';
    return 'অন্যান্য ডিজিটাল সার্ভিস (Other Services)';
  };

  const handleWhatsAppSend = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Store request to Firestore + Local Store
      await addServiceRequest({
        customerName: userName.trim(),
        mobile: userPhone.trim(),
        serviceId: activeService.id,
        serviceName: activeService.titleBengali,
        category: activeService.category === 'west_bengal' ? 'wb' : activeService.category,
        preferredContact: contactMethod,
        message: messageReq.trim(),
      });
    } catch (err) {
      console.error('Error submitting service request:', err);
    }

    setIsSubmitting(false);

    const categoryText = getCategoryLabel(activeService.category);
    const formattedMessage = `নমস্কার,
আমি Tamrin Digital Service-এর একটি পরিষেবা নিতে চাই।

নাম: ${userName.trim()}
মোবাইল: ${userPhone.trim()}
পরিষেবা: ${activeService.titleBengali} (${activeService.titleEnglish})
বিভাগ: ${categoryText}
যোগাযোগের মাধ্যম: ${contactMethod === 'WhatsApp' ? 'হোয়াটসঅ্যাপ (WhatsApp)' : 'ফোন কল (Phone Call)'}
প্রয়োজনীয়তা: ${messageReq.trim() || 'কোনো বাড়তি বক্তব্য নেই'}

দয়া করে আমাকে পরিষেবাটি সম্পর্কে জানাবেন।`;

    const cleanNum = whatsappNumber.replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/${cleanNum}?text=${encodeURIComponent(formattedMessage)}`;

    setSuccessMessage(true);
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 400);
  };

  return (
    <section id="service-request-form" className="py-16 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-white/20 shadow-2xl">
          
          {/* Header */}
          <div className="text-center space-y-3 mb-8">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              ইনস্ট্যান্ট অনলাইন পরিষেবা সহায়তা
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white">
              আপনার কাজের জন্য আমাদের সাথে যোগাযোগ করুন
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              নিচের ফর্মটি পূরণ করে ১-ক্লিকে আমাদের হোয়াটসঅ্যাপে রিকোয়েস্ট পাঠান। আমাদের সেন্টার থেকে সরাসরি উত্তর দেওয়া হবে।
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleWhatsAppSend} className="space-y-5">
            
            {/* 1. Name Input */}
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1.5 flex items-center gap-1.5">
                <User className="w-4 h-4 text-emerald-400" />
                <span>আপনার নাম (Your Name): *</span>
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="উদাহরণ: রহিম মোল্লা / সুমিতা রায়"
                className={`w-full bg-white text-slate-900 font-medium text-sm p-3.5 rounded-xl border focus:outline-none focus:ring-2 ${
                  errors.name ? 'border-red-400 focus:ring-red-400' : 'border-slate-300 focus:ring-emerald-500'
                }`}
              />
              {errors.name && <p className="text-red-400 text-xs font-bold mt-1">{errors.name}</p>}
            </div>

            {/* 2. Phone Input */}
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1.5 flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>মোবাইল নম্বর (10-Digit Mobile Number): *</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3.5 text-slate-500 font-bold text-sm">+91</span>
                <input
                  type="tel"
                  maxLength={10}
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  placeholder="9876543210"
                  className={`w-full bg-white text-slate-900 font-bold text-sm p-3.5 pl-12 rounded-xl border focus:outline-none focus:ring-2 ${
                    errors.phone ? 'border-red-400 focus:ring-red-400' : 'border-slate-300 focus:ring-emerald-500'
                  }`}
                />
              </div>
              {errors.phone && <p className="text-red-400 text-xs font-bold mt-1">{errors.phone}</p>}
            </div>

            {/* 3. Service Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1.5 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>প্রয়োজনীয় পরিষেবা নির্বাচন করুন (Select Service): *</span>
              </label>
              <select
                value={selectedServiceId}
                onChange={(e) => setSelectedServiceId(e.target.value)}
                className={`w-full bg-white text-slate-900 font-bold text-xs sm:text-sm p-3.5 rounded-xl border focus:outline-none focus:ring-2 ${
                  errors.service ? 'border-red-400 focus:ring-red-400' : 'border-slate-300 focus:ring-emerald-500'
                }`}
              >
                {servicesList.map((srv) => (
                  <option key={srv.id} value={srv.id}>
                    {srv.titleBengali} ({srv.category === 'central' ? 'কেন্দ্রীয়' : srv.category === 'wb' ? 'পশ্চিমবঙ্গ' : 'অন্যান্য'})
                  </option>
                ))}
              </select>
              {errors.service && <p className="text-red-400 text-xs font-bold mt-1">{errors.service}</p>}
            </div>

            {/* 4. Preferred Contact Method */}
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1.5">
                যোগাযোগের পছন্দের মাধ্যম (Preferred Contact Method):
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setContactMethod('WhatsApp')}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    contactMethod === 'WhatsApp'
                      ? 'bg-emerald-600 text-white border-emerald-400 shadow-md'
                      : 'bg-white/10 text-slate-200 border-white/10 hover:bg-white/20'
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>হোয়াটসঅ্যাপ (WhatsApp)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setContactMethod('Phone')}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    contactMethod === 'Phone'
                      ? 'bg-blue-600 text-white border-blue-400 shadow-md'
                      : 'bg-white/10 text-slate-200 border-white/10 hover:bg-white/20'
                  }`}
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>ফোন কল (Phone Call)</span>
                </button>
              </div>
            </div>

            {/* 5. Message / Requirements */}
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1.5">
                আপনার বার্তা / প্রয়োজনীয়তা (Message / Requirements - optional):
              </label>
              <textarea
                rows={2}
                value={messageReq}
                onChange={(e) => setMessageReq(e.target.value)}
                placeholder="যেমন: আধারে মোবাইল নম্বর লিঙ্ক, অথবা নতুন প্যান কার্ড বা সংশোধনের বিবরণ..."
                className="w-full bg-white text-slate-900 font-medium text-sm p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Security Warning Notice */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-3.5 text-xs text-amber-200 flex items-start gap-2.5">
              <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>নিরাপত্তা সতর্কবার্তা:</strong> আপনার ব্যক্তিগত বা গোপন তথ্য যেমন OTP, Password, ATM PIN বা UPI PIN এখানে লিখবেন না।
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              id="assistant-submit-btn"
              className="w-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-base py-4 px-6 rounded-2xl shadow-xl flex items-center justify-center gap-2.5 transition-all transform hover:scale-[1.01] active:scale-[0.99] border border-emerald-400/30 disabled:opacity-50"
            >
              <MessageCircle className="w-5 h-5 fill-white/20" />
              <span>{isSubmitting ? 'প্রসেস করা হচ্ছে...' : 'WhatsApp-এ Request পাঠান'}</span>
            </button>

            {/* Success Status Alert */}
            {successMessage && (
              <div className="p-4 bg-emerald-500/20 border border-emerald-400 text-emerald-300 rounded-2xl text-center text-xs sm:text-sm font-bold flex items-center justify-center gap-2 animate-in fade-in">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span>আপনার সার্ভিস রিকোয়েস্ট সফলভাবে জমা নেওয়া হয়েছে! WhatsApp খুলে মেসেজটি পাঠান।</span>
              </div>
            )}

          </form>

        </div>

      </div>
    </section>
  );
};
