import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Plus, 
  Edit2, 
  Trash2, 
  Check, 
  X, 
  Sparkles, 
  Search, 
  Star,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { getStoredServices, saveStoredServices } from '../data/store';
import { ServiceItem } from '../data/services';

export const AdminServices: React.FC = () => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'central' | 'wb' | 'other'>('all');

  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // Form State
  const [titleBengali, setTitleBengali] = useState('');
  const [titleEnglish, setTitleEnglish] = useState('');
  const [category, setCategory] = useState<'central' | 'wb' | 'other'>('central');
  const [shortDesc, setShortDesc] = useState('');
  const [fullDesc, setFullDesc] = useState('');
  const [turnaroundTime, setTurnaroundTime] = useState('');
  const [documentsText, setDocumentsText] = useState('');
  const [isPopular, setIsPopular] = useState(false);
  const [isActive, setIsActive] = useState(true);

  const loadServices = () => {
    setServices(getStoredServices());
  };

  useEffect(() => {
    loadServices();
    window.addEventListener('tds_services_updated', loadServices);
    return () => window.removeEventListener('tds_services_updated', loadServices);
  }, []);

  const openCreateModal = () => {
    setIsCreatingNew(true);
    setEditingService(null);
    setTitleBengali('');
    setTitleEnglish('');
    setCategory('central');
    setShortDesc('');
    setFullDesc('');
    setTurnaroundTime('১ - ৩ কর্মদিবস');
    setDocumentsText('আধার কার্ড\nভোটার কার্ড\nমোবাইল নম্বর');
    setIsPopular(false);
    setIsActive(true);
  };

  const openEditModal = (s: ServiceItem) => {
    setIsCreatingNew(false);
    setEditingService(s);
    setTitleBengali(s.titleBengali);
    setTitleEnglish(s.titleEnglish);
    setCategory(s.category);
    setShortDesc(s.shortDesc);
    setFullDesc(s.fullDesc);
    setTurnaroundTime(s.turnaroundTime);
    setDocumentsText(s.documents.join('\n'));
    setIsPopular(!!s.isPopular);
    setIsActive(s.isActive !== false);
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleBengali.trim() || !titleEnglish.trim()) {
      alert('অনুগ্রহ করে পরিষেবার নাম প্রদান করুন।');
      return;
    }

    const docList = documentsText
      .split('\n')
      .map((d) => d.trim())
      .filter((d) => d.length > 0);

    let updatedList: ServiceItem[] = [];

    if (isCreatingNew) {
      const newService: ServiceItem = {
        id: 'custom-' + Date.now(),
        titleBengali,
        titleEnglish,
        category,
        iconName: 'FileText',
        shortDesc,
        fullDesc,
        turnaroundTime,
        documents: docList.length > 0 ? docList : ['যোগাযোগের পর জানানো হবে'],
        isPopular,
        isActive,
      };
      updatedList = [newService, ...services];
    } else if (editingService) {
      updatedList = services.map((s) => {
        if (s.id === editingService.id) {
          return {
            ...s,
            titleBengali,
            titleEnglish,
            category,
            shortDesc,
            fullDesc,
            turnaroundTime,
            documents: docList,
            isPopular,
            isActive,
          };
        }
        return s;
      });
    }

    saveStoredServices(updatedList);
    setEditingService(null);
    setIsCreatingNew(false);
  };

  const handleTogglePopular = (id: string) => {
    const updated = services.map((s) => (s.id === id ? { ...s, isPopular: !s.isPopular } : s));
    saveStoredServices(updated);
  };

  const handleToggleActive = (id: string) => {
    const updated = services.map((s) => (s.id === id ? { ...s, isActive: s.isActive === false } : s));
    saveStoredServices(updated);
  };

  const filteredServices = services.filter((s) => {
    const matchesSearch = 
      s.titleBengali.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.titleEnglish.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || s.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      
      {/* Title & Add Button */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-900" />
            <span>পরিষেবা ব্যবস্থাপনা (Service Management)</span>
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            মোট {services.length} টি পরিষেবা অন্তর্ভুক্ত রয়েছে। নতুন পরিষেবা যোগ বা আপডেট করুন।
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 px-5 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন পরিষেবা যোগ করুন</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="পরিষেবার নাম সার্চ করুন..."
            className="w-full bg-slate-50 text-slate-900 font-medium text-xs p-3 pl-10 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0F2C59]"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value as any)}
          className="bg-slate-50 text-slate-900 font-bold text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0F2C59]"
        >
          <option value="all">সমস্ত বিভাগ</option>
          <option value="central">কেন্দ্রীয় সরকার</option>
          <option value="wb">পশ্চিমবঙ্গ সরকার</option>
          <option value="other">অন্যান্য ডিজিটাল পরিষেবা</option>
        </select>
      </div>

      {/* Services List Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider bg-slate-50">
                <th className="p-4">পরিষেবার নাম</th>
                <th className="p-4">বিভাগ</th>
                <th className="p-4">সময়সীমা</th>
                <th className="p-4">জনপ্রিয়?</th>
                <th className="p-4">সক্রিয়?</th>
                <th className="p-4 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium">
              {filteredServices.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4">
                    <div className="font-extrabold text-slate-900">{s.titleBengali}</div>
                    <div className="text-slate-500 text-[11px] font-semibold">{s.titleEnglish}</div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-0.5 rounded-md font-bold text-[10px] border ${
                      s.category === 'central'
                        ? 'bg-blue-50 text-blue-900 border-blue-200'
                        : 'bg-emerald-50 text-emerald-900 border-emerald-200'
                    }`}>
                      {s.category === 'central' ? 'কেন্দ্রীয়' : s.category === 'wb' ? 'পশ্চিমবঙ্গ' : 'অন্যান্য'}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-slate-700">{s.turnaroundTime}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleTogglePopular(s.id)}
                      className={`p-1.5 rounded-lg border transition-all ${
                        s.isPopular ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-slate-100 text-slate-400 border-slate-200'
                      }`}
                      title="জনপ্রিয় স্টেটাস টগল করুন"
                    >
                      <Star className={`w-4 h-4 ${s.isPopular ? 'fill-amber-500' : ''}`} />
                    </button>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleToggleActive(s.id)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${
                        s.isActive !== false ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-red-100 text-red-800 border-red-300'
                      }`}
                    >
                      {s.isActive !== false ? 'সক্রিয় (Active)' : 'নিষ্ক্রিয় (Disabled)'}
                    </button>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => openEditModal(s)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-3 py-1.5 rounded-xl border border-slate-200 transition-colors inline-flex items-center gap-1"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-blue-600" />
                      <span>সম্পাদনা</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE / EDIT MODAL */}
      {(isCreatingNew || editingService) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 flex flex-col">
            
            <div className="p-5 bg-[#0F2C59] text-white flex items-center justify-between">
              <h3 className="text-xl font-black">
                {isCreatingNew ? 'নতুন পরিষেবা যুক্ত করুন' : 'পরিষেবা সম্পাদনা (Edit Service)'}
              </h3>
              <button
                onClick={() => {
                  setIsCreatingNew(false);
                  setEditingService(null);
                }}
                className="p-1 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="p-6 space-y-4 text-slate-800 text-xs sm:text-sm">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    বাংলা নাম (Bengali Title): *
                  </label>
                  <input
                    type="text"
                    required
                    value={titleBengali}
                    onChange={(e) => setTitleBengali(e.target.value)}
                    placeholder="যেমন: আধার কার্ড পরিষেবা"
                    className="w-full bg-slate-50 text-slate-900 font-medium text-xs p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#0F2C59]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    ইংরেজি নাম (English Title): *
                  </label>
                  <input
                    type="text"
                    required
                    value={titleEnglish}
                    onChange={(e) => setTitleEnglish(e.target.value)}
                    placeholder="e.g., Aadhaar Card Service"
                    className="w-full bg-slate-50 text-slate-900 font-medium text-xs p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#0F2C59]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    বিভাগ (Category):
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-slate-50 text-slate-900 font-bold text-xs p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#0F2C59]"
                  >
                    <option value="central">Central Government (কেন্দ্রীয়)</option>
                    <option value="wb">West Bengal Govt (পশ্চিমবঙ্গ)</option>
                    <option value="other">Other Services (অন্যান্য)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    সময়সীমা (Turnaround Time):
                  </label>
                  <input
                    type="text"
                    value={turnaroundTime}
                    onChange={(e) => setTurnaroundTime(e.target.value)}
                    placeholder="যেমন: ১-৩ কর্মদিবস"
                    className="w-full bg-slate-50 text-slate-900 font-medium text-xs p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#0F2C59]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  সংক্ষিপ্ত বিবরণ (Short Description):
                </label>
                <textarea
                  rows={2}
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  placeholder="কার্ডের সংক্ষিপ্ত সারসংক্ষেপ..."
                  className="w-full bg-slate-50 text-slate-900 font-medium text-xs p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#0F2C59]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  বিস্তারিত বিবরণ (Full Description):
                </label>
                <textarea
                  rows={3}
                  value={fullDesc}
                  onChange={(e) => setFullDesc(e.target.value)}
                  placeholder="মোডালে দেখানোর জন্য পূর্ণাঙ্গ বিবরণ..."
                  className="w-full bg-slate-50 text-slate-900 font-medium text-xs p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#0F2C59]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  প্রয়োজনীয় নথিপত্র (প্রতি লাইনে একটি করে নথি লিখুন):
                </label>
                <textarea
                  rows={3}
                  value={documentsText}
                  onChange={(e) => setDocumentsText(e.target.value)}
                  placeholder="আধার কার্ড&#10;ভোটার কার্ড&#10;মোবাইল নম্বর"
                  className="w-full bg-slate-50 text-slate-900 font-medium text-xs p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#0F2C59]"
                />
              </div>

              <div className="flex flex-wrap gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={isPopular}
                    onChange={(e) => setIsPopular(e.target.checked)}
                    className="w-4 h-4 text-[#0F2C59] rounded"
                  />
                  <span>জনপ্রিয় তালিকায় রাখুন (Popular Service)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                  <span>ওয়েবসাইটে দেখান (Active Status)</span>
                </label>
              </div>

              <div className="pt-4 border-t flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreatingNew(false);
                    setEditingService(null);
                  }}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs py-2.5 px-5 rounded-xl transition-colors"
                >
                  বাতিল করুন
                </button>

                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs py-2.5 px-6 rounded-xl shadow-md transition-colors"
                >
                  সংরক্ষণ করুন (Save)
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
