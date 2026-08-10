import React, { useState, useEffect } from 'react';
import { Megaphone, Plus, Edit2, Trash2, CheckCircle2, AlertCircle, Calendar } from 'lucide-react';
import { getStoredAnnouncements, saveStoredAnnouncements } from '../data/store';
import { Announcement } from '../types';

export const AdminAnnouncements: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [editingAnn, setEditingAnn] = useState<Announcement | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // Form States
  const [title, setTitle] = useState('');
  const [descriptionBengali, setDescriptionBengali] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isActive, setIsActive] = useState(true);

  const loadData = () => {
    setAnnouncements(getStoredAnnouncements());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('tds_announcements_updated', loadData);
    return () => window.removeEventListener('tds_announcements_updated', loadData);
  }, []);

  const openCreateModal = () => {
    setIsCreatingNew(true);
    setEditingAnn(null);
    setTitle('গুরুত্বপূর্ণ ঘোষণা');
    setDescriptionBengali('');
    setStartDate(new Date().toISOString().split('T')[0]);
    setEndDate('2026-12-31');
    setIsActive(true);
  };

  const openEditModal = (a: Announcement) => {
    setIsCreatingNew(false);
    setEditingAnn(a);
    setTitle(a.title);
    setDescriptionBengali(a.descriptionBengali);
    setStartDate(a.startDate);
    setEndDate(a.endDate);
    setIsActive(a.isActive);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!descriptionBengali.trim()) {
      alert('ঘোষণাসমূহ বাংলায় সংক্ষেপে লিখুন।');
      return;
    }

    let updated: Announcement[] = [];

    if (isCreatingNew) {
      const newAnn: Announcement = {
        id: 'ann-' + Date.now(),
        title,
        descriptionBengali,
        startDate,
        endDate,
        isActive,
      };
      updated = [newAnn, ...announcements];
    } else if (editingAnn) {
      updated = announcements.map((a) => {
        if (a.id === editingAnn.id) {
          return {
            ...a,
            title,
            descriptionBengali,
            startDate,
            endDate,
            isActive,
          };
        }
        return a;
      });
    }

    saveStoredAnnouncements(updated);
    setIsCreatingNew(false);
    setEditingAnn(null);
  };

  const handleToggleActive = (id: string) => {
    const updated = announcements.map((a) => (a.id === id ? { ...a, isActive: !a.isActive } : a));
    saveStoredAnnouncements(updated);
  };

  const handleDelete = (id: string) => {
    if (confirm('আপনি কি এই ঘোষণাটি মুছে ফেলতে চান?')) {
      const updated = announcements.filter((a) => a.id !== id);
      saveStoredAnnouncements(updated);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <Megaphone className="w-6 h-6 text-amber-600" />
            <span>ঘোষণা ব্যবস্থাপনা (Announcement Management)</span>
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            ওয়েবসাইটের শীর্ষে বিশেষ নোটিশ দেখানোর জন্য নতুন ঘোষণা তৈরি করুন।
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs py-3 px-5 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন ঘোষণা তৈরি করুন</span>
        </button>
      </div>

      {/* Announcement List */}
      <div className="space-y-4">
        {announcements.map((a) => (
          <div
            key={a.id}
            className={`p-5 rounded-3xl border transition-all ${
              a.isActive ? 'bg-amber-50/50 border-amber-300 shadow-sm' : 'bg-slate-50 border-slate-200 opacity-60'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-amber-200/60">
              <div className="flex items-center gap-2">
                <span className="bg-slate-900 text-amber-300 font-extrabold text-[10px] px-2.5 py-1 rounded-full uppercase">
                  {a.title}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  a.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                }`}>
                  {a.isActive ? 'সক্রিয় (Active)' : 'নিষ্ক্রিয় (Inactive)'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleActive(a.id)}
                  className="text-xs font-bold px-3 py-1 bg-white border rounded-xl hover:bg-slate-100"
                >
                  {a.isActive ? 'নিষ্ক্রিয় করুন' : 'সক্রিয় করুন'}
                </button>
                <button
                  onClick={() => openEditModal(a)}
                  className="p-1.5 bg-blue-50 text-blue-900 rounded-xl hover:bg-blue-100"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(a.id)}
                  className="p-1.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="pt-3 text-slate-900 font-extrabold text-sm sm:text-base leading-relaxed">
              {a.descriptionBengali}
            </p>

            <div className="mt-3 text-[11px] text-slate-500 font-medium flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>মেয়াদ: {a.startDate} থেকে {a.endDate}</span>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE / EDIT MODAL */}
      {(isCreatingNew || editingAnn) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 border border-slate-200 space-y-4 text-xs sm:text-sm">
            
            <h3 className="text-xl font-black text-slate-900">
              {isCreatingNew ? 'নতুন ঘোষণা যোগ করুন' : 'ঘোষণা সম্পাদনা করুন'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  ঘোষণার শিরোনাম (Headline Badge):
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="যেমন: গুরুত্বপূর্ণ ঘোষণা"
                  className="w-full bg-slate-50 text-slate-900 font-bold p-3 rounded-xl border"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  বাংলা বার্তা বিবরণী (Bengali Description): *
                </label>
                <textarea
                  rows={3}
                  required
                  value={descriptionBengali}
                  onChange={(e) => setDescriptionBengali(e.target.value)}
                  placeholder="যেমন: কিছু পরিষেবার ক্ষেত্রে অতিরিক্ত সময় লাগতে পারে।"
                  className="w-full bg-slate-50 text-slate-900 font-medium p-3 rounded-xl border"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">শুরু তারিখ:</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-slate-50 text-slate-900 font-medium p-2.5 rounded-xl border"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">শেষ তারিখ:</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-slate-50 text-slate-900 font-medium p-2.5 rounded-xl border"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700 pt-1">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-4 h-4 text-amber-500 rounded"
                />
                <span>ওয়েবসাইটের টপ বারে অবিলম্বে দেখান (Active)</span>
              </label>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreatingNew(false);
                    setEditingAnn(null);
                  }}
                  className="bg-slate-200 text-slate-800 font-bold py-2 px-4 rounded-xl"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="bg-amber-500 text-slate-950 font-extrabold py-2 px-5 rounded-xl shadow-md"
                >
                  সংরক্ষণ করুন
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
