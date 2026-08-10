import React, { useState, useEffect } from 'react';
import { 
  Inbox, 
  Search, 
  Filter, 
  Phone, 
  MessageCircle, 
  FileText, 
  X, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  User,
  Calendar,
  Tag,
  Send,
  Edit3
} from 'lucide-react';
import { getStoredRequests, updateServiceRequestStatus } from '../data/store';
import { ServiceRequest, RequestStatus } from '../types';

interface AdminRequestsProps {
  initialSelectedRequest?: ServiceRequest | null;
}

export const AdminRequests: React.FC<AdminRequestsProps> = ({ initialSelectedRequest }) => {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');

  const [selectedReq, setSelectedReq] = useState<ServiceRequest | null>(initialSelectedRequest || null);
  const [adminNoteInput, setAdminNoteInput] = useState('');

  const reloadRequests = () => {
    const data = getStoredRequests();
    setRequests(data);
  };

  useEffect(() => {
    reloadRequests();
    window.addEventListener('tds_requests_updated', reloadRequests);
    return () => window.removeEventListener('tds_requests_updated', reloadRequests);
  }, []);

  useEffect(() => {
    if (initialSelectedRequest) {
      setSelectedReq(initialSelectedRequest);
      setAdminNoteInput(initialSelectedRequest.adminNote || '');
    }
  }, [initialSelectedRequest]);

  const handleStatusChange = (id: string, newStatus: RequestStatus) => {
    updateServiceRequestStatus(id, newStatus);
    if (selectedReq && selectedReq.id === id) {
      setSelectedReq({ ...selectedReq, status: newStatus });
    }
  };

  const handleSaveNote = () => {
    if (!selectedReq) return;
    updateServiceRequestStatus(selectedReq.id, selectedReq.status, adminNoteInput);
    setSelectedReq({ ...selectedReq, adminNote: adminNoteInput });
  };

  // Filter & Search Logic
  const filteredRequests = requests
    .filter((req) => {
      const matchesSearch = 
        req.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.mobile.includes(searchTerm) ||
        req.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' || req.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || req.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
    });

  const getStatusBadgeClass = (status: RequestStatus) => {
    switch (status) {
      case 'New':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Contacted':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'Processing':
        return 'bg-indigo-100 text-indigo-900 border-indigo-300';
      case 'Completed':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'Cancelled':
        return 'bg-slate-100 text-slate-700 border-slate-300';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <Inbox className="w-6 h-6 text-blue-900" />
            <span>গ্রাহক অনুরোধ তালিকা (Customer Requests)</span>
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            মোট {requests.length} টি অনুরোধ জমা পড়েছে। সার্চ এবং ফিল্টার ব্যবহার করুন।
          </p>
        </div>
      </div>

      {/* Search & Filter Control Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="নাম, মোবাইল বা আইডি সার্চ করুন..."
              className="w-full bg-slate-50 text-slate-900 font-medium text-xs p-3 pl-10 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0F2C59]"
            />
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-slate-50 text-slate-900 font-bold text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0F2C59]"
            >
              <option value="all">সমস্ত স্ট্যাটাস (All Status)</option>
              <option value="New">নতুন (New)</option>
              <option value="Contacted">যোগাযোগ করা হয়েছে (Contacted)</option>
              <option value="Processing">প্রক্রিয়াকরণাধীন (Processing)</option>
              <option value="Completed">সম্পন্ন (Completed)</option>
              <option value="Cancelled">বাতিল (Cancelled)</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full bg-slate-50 text-slate-900 font-bold text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0F2C59]"
            >
              <option value="all">সমস্ত বিভাগ (All Categories)</option>
              <option value="central">কেন্দ্রীয় সরকার</option>
              <option value="wb">পশ্চিমবঙ্গ সরকার</option>
              <option value="other">অন্যান্য ডিজিটাল কাজ</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest')}
              className="w-full bg-slate-50 text-slate-900 font-bold text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0F2C59]"
            >
              <option value="newest">সর্বশেষ আগে (Newest First)</option>
              <option value="oldest">পুরাতন আগে (Oldest First)</option>
            </select>
          </div>

        </div>
      </div>

      {/* Requests Content List */}
      {filteredRequests.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
          <Inbox className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-extrabold text-slate-800 text-base">কোনো অনুরোধ পাওয়া যায়নি</h3>
          <p className="text-slate-500 text-xs">আপনার সার্চ বা ফিল্টার মান পরিবর্তন করে চেষ্টা করুন।</p>
        </div>
      ) : (
        <div className="space-y-3">
          
          {/* Desktop Table View / Mobile Card View */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-slate-200 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider bg-slate-50">
                    <th className="p-4">অনুরোধ আইডি</th>
                    <th className="p-4">গ্রাহক ও মোবাইল</th>
                    <th className="p-4">পরিষেবা</th>
                    <th className="p-4">যোগাযোগ মাধ্যম</th>
                    <th className="p-4">তারিখ</th>
                    <th className="p-4">স্ট্যাটাস</th>
                    <th className="p-4 text-right">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-medium">
                  {filteredRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-black text-[#0F2C59]">{req.id}</td>
                      <td className="p-4">
                        <div className="font-bold text-slate-900">{req.customerName}</div>
                        <div className="text-slate-500 font-semibold">{req.mobile}</div>
                      </td>
                      <td className="p-4 font-bold text-slate-800">{req.serviceName}</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                          req.preferredContact === 'WhatsApp' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                        }`}>
                          {req.preferredContact}
                        </span>
                      </td>
                      <td className="p-4 text-slate-500 font-medium">
                        {new Date(req.createdAt).toLocaleDateString('bn-IN')}
                      </td>
                      <td className="p-4">
                        <select
                          value={req.status}
                          onChange={(e) => handleStatusChange(req.id, e.target.value as RequestStatus)}
                          className={`p-1.5 rounded-lg text-xs font-extrabold border focus:outline-none cursor-pointer ${getStatusBadgeClass(req.status)}`}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Processing">Processing</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="p-4 text-right space-x-1">
                        <button
                          onClick={() => {
                            setSelectedReq(req);
                            setAdminNoteInput(req.adminNote || '');
                          }}
                          className="bg-blue-900 hover:bg-blue-800 text-white font-bold px-3 py-1.5 rounded-xl transition-colors shadow-sm text-[11px]"
                        >
                          বিস্তারিত ও অ্যাকশন
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* REQUEST DETAILS MODAL */}
      {selectedReq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 flex flex-col">
            
            {/* Modal Header */}
            <div className="p-5 bg-[#0F2C59] text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-500/20 px-2.5 py-0.5 rounded-full">
                  আইডি: {selectedReq.id}
                </span>
                <h3 className="text-xl font-black mt-1">
                  অনুরোধ বিস্তারিত (Request Details)
                </h3>
              </div>

              <button
                onClick={() => setSelectedReq(null)}
                className="p-1 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 text-slate-800 text-xs sm:text-sm">
              
              {/* Customer Info Grid */}
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div>
                  <span className="text-[11px] font-bold text-slate-500 block">গ্রাহকের নাম:</span>
                  <span className="font-extrabold text-slate-900 text-base">{selectedReq.customerName}</span>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-slate-500 block">মোবাইল নম্বর:</span>
                  <span className="font-extrabold text-blue-900 text-base">{selectedReq.mobile}</span>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-slate-500 block">অনুরোধের বিষয়:</span>
                  <span className="font-bold text-slate-900">{selectedReq.serviceName}</span>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-slate-500 block">পছন্দের মাধ্যম:</span>
                  <span className="font-bold text-emerald-700">{selectedReq.preferredContact}</span>
                </div>
              </div>

              {/* Requirement Message */}
              <div>
                <span className="text-xs font-bold text-slate-700 block mb-1">
                  গ্রাহকের প্রয়োজনীয়তা / বার্তা (Customer Message):
                </span>
                <p className="bg-slate-100 p-3.5 rounded-xl text-slate-800 font-medium leading-relaxed border">
                  {selectedReq.message || 'কোনো নির্দিষ্ট বক্তব্য প্রদান করা হয়নি।'}
                </p>
              </div>

              {/* Status Selector */}
              <div>
                <span className="text-xs font-bold text-slate-700 block mb-1.5">
                  বর্তমান স্ট্যাটাস পরিবর্তন করুন (Change Status):
                </span>
                <div className="flex flex-wrap gap-2">
                  {(['New', 'Contacted', 'Processing', 'Completed', 'Cancelled'] as RequestStatus[]).map((st) => (
                    <button
                      key={st}
                      onClick={() => handleStatusChange(selectedReq.id, st)}
                      className={`px-3 py-1.5 rounded-xl font-extrabold text-xs border transition-all ${
                        selectedReq.status === st
                          ? 'bg-[#0F2C59] text-white border-blue-900 shadow-md'
                          : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Internal Admin Note */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-700 block">
                  অভ্যন্তরীণ মন্তব্য (Internal Admin Note):
                </span>
                <textarea
                  rows={2}
                  value={adminNoteInput}
                  onChange={(e) => setAdminNoteInput(e.target.value)}
                  placeholder="নথি আপডেট বা কল হিস্ট্রি সম্পর্কে নোটি লিখুন..."
                  className="w-full bg-slate-50 text-slate-900 text-xs font-medium p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0F2C59]"
                />
                <button
                  onClick={handleSaveNote}
                  className="bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs py-1.5 px-3 rounded-lg transition-colors inline-flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>নোট সংরক্ষণ করুন</span>
                </button>
              </div>

            </div>

            {/* Direct Contact Actions Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
              <a
                href={`tel:${selectedReq.mobile}`}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs py-2.5 px-4 rounded-xl shadow-sm transition-colors"
              >
                <Phone className="w-4 h-4 fill-slate-950/20" />
                <span>সরাসরি কল করুন</span>
              </a>

              <a
                href={`https://wa.me/91${selectedReq.mobile.replace(/\D/g, '')}?text=${encodeURIComponent(`নমস্কার ${selectedReq.customerName}, Tamrin Digital Service থেকে যোগাযোগের করা হচ্ছে...`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-md transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-white/20" />
                <span>WhatsApp মেসেজ পাঠান</span>
              </a>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
