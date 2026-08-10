import React, { useState, useEffect } from 'react';
import { Settings, Save, Phone, MessageCircle, MapPin, Mail, Clock, Globe, CheckCircle2 } from 'lucide-react';
import { getStoredSettings, saveStoredSettings } from '../data/store';
import { BusinessSettings, DaySchedule } from '../types';

export const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState<BusinessSettings>(getStoredSettings());
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const current = getStoredSettings();
    setSettings(current);
  }, []);

  const handleScheduleChange = (index: number, field: keyof DaySchedule, value: any) => {
    const updatedSchedule = [...settings.weeklySchedule];
    updatedSchedule[index] = {
      ...updatedSchedule[index],
      [field]: value,
    };
    setSettings({ ...settings, weeklySchedule: updatedSchedule });
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    saveStoredSettings(settings);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <Settings className="w-6 h-6 text-blue-900" />
            <span>সেন্টার তথ্য ও সময়সূচী (Contact & Hours Settings)</span>
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            ডিজিটাল সার্ভিস সেন্টারের নাম, ফোন নম্বর, হোয়াটসঅ্যাপ, ঠিকানা ও কাজের সময় আপডেট করুন।
          </p>
        </div>
      </div>

      {saveSuccess && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-4 rounded-2xl font-bold text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>সেন্টারের সমস্ত তথ্য ও কাজের সময়সূচী সফলভাবে আপডেট করা হয়েছে!</span>
        </div>
      )}

      <form onSubmit={handleSaveSettings} className="space-y-6">
        
        {/* Contact Info Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-extrabold text-slate-900 text-base border-b pb-3 flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-600" />
            যোগাযোগের প্রাথমিক বিবরণী (Contact Details)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <label className="block font-bold text-slate-700 mb-1">ব্যবসার নাম (Business Name):</label>
              <input
                type="text"
                required
                value={settings.businessName}
                onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
                className="w-full bg-slate-50 text-slate-900 font-bold p-3 rounded-xl border"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">ফোন নম্বর (Primary Phone):</label>
              <input
                type="text"
                required
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full bg-slate-50 text-slate-900 font-bold p-3 rounded-xl border"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">হোয়াটসঅ্যাপ নম্বর (WhatsApp Number):</label>
              <input
                type="text"
                required
                value={settings.whatsapp}
                onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                className="w-full bg-slate-50 text-slate-900 font-bold p-3 rounded-xl border"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">ইমেইল (Business Email):</label>
              <input
                type="email"
                required
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full bg-slate-50 text-slate-900 font-bold p-3 rounded-xl border"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">ঠিকানা (Full Address):</label>
              <input
                type="text"
                required
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full bg-slate-50 text-slate-900 font-bold p-3 rounded-xl border"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">গুগল ম্যাপ লিঙ্ক (Google Maps Embed URL):</label>
              <input
                type="text"
                value={settings.mapUrl}
                onChange={(e) => setSettings({ ...settings, mapUrl: e.target.value })}
                className="w-full bg-slate-50 text-slate-900 font-medium p-3 rounded-xl border"
              />
            </div>
          </div>
        </div>

        {/* Business Hours Management Table Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-extrabold text-slate-900 text-base border-b pb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-600" />
            সাপ্তাহিক কাজের সময়সূচী (Business Hours Management)
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b text-slate-500 font-bold uppercase bg-slate-50">
                  <th className="p-3">দিন (Day)</th>
                  <th className="p-3">খোলা / বন্ধ?</th>
                  <th className="p-3">খোলার সময় (Open)</th>
                  <th className="p-3">বন্ধের সময় (Close)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {settings.weeklySchedule.map((sched, idx) => (
                  <tr key={sched.day} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">
                      {sched.dayBengali} ({sched.day})
                    </td>
                    <td className="p-3">
                      <label className="inline-flex items-center gap-2 cursor-pointer font-bold">
                        <input
                          type="checkbox"
                          checked={sched.isOpen}
                          onChange={(e) => handleScheduleChange(idx, 'isOpen', e.target.checked)}
                          className="w-4 h-4 text-emerald-600 rounded"
                        />
                        <span className={sched.isOpen ? 'text-emerald-700' : 'text-red-600'}>
                          {sched.isOpen ? 'খোলা (Open)' : 'বন্ধ (Closed)'}
                        </span>
                      </label>
                    </td>
                    <td className="p-3">
                      <input
                        type="time"
                        disabled={!sched.isOpen}
                        value={sched.openTime}
                        onChange={(e) => handleScheduleChange(idx, 'openTime', e.target.value)}
                        className="bg-slate-50 border p-2 rounded-lg font-bold"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="time"
                        disabled={!sched.isOpen}
                        value={sched.closeTime}
                        onChange={(e) => handleScheduleChange(idx, 'closeTime', e.target.value)}
                        className="bg-slate-50 border p-2 rounded-lg font-bold"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-gradient-to-r from-[#0F2C59] to-blue-900 hover:from-blue-900 hover:to-[#0F2C59] text-white font-extrabold text-sm py-3.5 px-8 rounded-2xl shadow-xl flex items-center gap-2"
          >
            <Save className="w-4 h-4 text-emerald-400" />
            <span>সমস্ত তথ্য সংরক্ষণ করুন (Save Settings)</span>
          </button>
        </div>

      </form>

    </div>
  );
};
