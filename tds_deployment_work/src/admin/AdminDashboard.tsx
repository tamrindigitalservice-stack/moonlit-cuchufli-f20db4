import React, { useState, useEffect } from 'react';
import { 
  Inbox, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  FileText, 
  ArrowRight, 
  Phone, 
  MessageCircle, 
  Search,
  Users
} from 'lucide-react';
import { getStoredRequests, getStoredServices } from '../data/store';
import { ServiceRequest, RequestStatus } from '../types';

interface AdminDashboardProps {
  onNavigateToRequests: () => void;
  onNavigateToServices: () => void;
  onSelectRequestDetails: (req: ServiceRequest) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onNavigateToRequests,
  onNavigateToServices,
  onSelectRequestDetails,
}) => {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [totalServicesCount, setTotalServicesCount] = useState(0);

  useEffect(() => {
    const loadData = () => {
      const reqs = getStoredRequests();
      setRequests(reqs);
      const servs = getStoredServices();
      setTotalServicesCount(servs.length);
    };

    loadData();
    window.addEventListener('tds_requests_updated', loadData);
    window.addEventListener('tds_services_updated', loadData);
    return () => {
      window.removeEventListener('tds_requests_updated', loadData);
      window.removeEventListener('tds_services_updated', loadData);
    };
  }, []);

  const totalRequests = requests.length;
  const newRequests = requests.filter((r) => r.status === 'New').length;
  const pendingRequests = requests.filter((r) => r.status === 'Contacted' || r.status === 'Processing').length;
  const completedRequests = requests.filter((r) => r.status === 'Completed').length;

  const getStatusBadge = (status: RequestStatus) => {
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
      
      {/* Title & Welcome */}
      <div className="bg-gradient-to-r from-[#0F2C59] via-blue-900 to-[#0F2C59] text-white p-6 rounded-3xl shadow-lg border border-blue-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">
            Tamrin Digital Service
          </span>
          <h2 className="text-2xl sm:text-3xl font-black mt-2">
            অ্যাডমিন ড্যাশবোর্ড (Admin Dashboard)
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 mt-1">
            ডিজিটাল সেবা সেন্টারের সমস্ত অনুরোধ, পরিসংখ্যান এবং তথ্য পরিচালনা করুন।
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onNavigateToRequests}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-md transition-all flex items-center gap-1.5"
          >
            <Inbox className="w-4 h-4" />
            <span>সমস্ত অনুরোধ ({totalRequests})</span>
          </button>
        </div>
      </div>

      {/* 5 Core Dashboard Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* 1. Total Requests */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-600">
            <span className="text-xs font-bold">মোট অনুরোধ</span>
            <div className="p-2 bg-blue-50 text-blue-900 rounded-xl">
              <Inbox className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            {totalRequests}
          </div>
          <p className="text-[11px] text-slate-600 font-medium">Total Service Requests</p>
        </div>

        {/* 2. New Requests */}
        <div className="bg-white p-5 rounded-2xl border border-amber-200 bg-amber-50/30 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-amber-900">
            <span className="text-xs font-bold">নতুন অনুরোধ</span>
            <div className="p-2 bg-amber-100 text-amber-900 rounded-xl">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-950">
            {newRequests}
          </div>
          <p className="text-[11px] text-amber-800 font-medium">New Unprocessed</p>
        </div>

        {/* 3. Pending Requests */}
        <div className="bg-white p-5 rounded-2xl border border-blue-200 bg-blue-50/30 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-blue-900">
            <span className="text-xs font-bold">প্রক্রিয়াকরণাধীন</span>
            <div className="p-2 bg-blue-100 text-blue-900 rounded-xl">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-blue-950">
            {pendingRequests}
          </div>
          <p className="text-[11px] text-blue-800 font-medium">Pending Requests</p>
        </div>

        {/* 4. Completed Requests */}
        <div className="bg-white p-5 rounded-2xl border border-emerald-200 bg-emerald-50/30 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-emerald-900">
            <span className="text-xs font-bold">সম্পন্ন অনুরোধ</span>
            <div className="p-2 bg-emerald-100 text-emerald-900 rounded-xl">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-950">
            {completedRequests}
          </div>
          <p className="text-[11px] text-emerald-800 font-medium">Completed Requests</p>
        </div>

        {/* 5. Total Services */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2 col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-slate-600">
            <span className="text-xs font-bold">মোট পরিষেবা</span>
            <div className="p-2 bg-slate-100 text-slate-800 rounded-xl">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            {totalServicesCount}
          </div>
          <p className="text-[11px] text-slate-600 font-medium">Active Services List</p>
        </div>

      </div>

      {/* Recent Requests Table Section */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="font-extrabold text-slate-900 text-lg">
              সাম্প্রতিক গ্রাহক অনুরোধ (Recent Requests)
            </h3>
            <p className="text-xs text-slate-600">
              ওয়েবসাইট থেকে সরাসরি পাঠানো নতুন পরিষেবা অনুরোধসমূহ
            </p>
          </div>

          <button
            onClick={onNavigateToRequests}
            className="text-xs font-bold text-blue-900 hover:text-emerald-600 inline-flex items-center gap-1 transition-colors"
          >
            <span>সব দেখুন</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {requests.length === 0 ? (
          <div className="text-center py-12 space-y-3 bg-slate-50 rounded-2xl border border-slate-200/60">
            <Users className="w-10 h-10 text-slate-400 mx-auto" />
            <p className="text-slate-600 text-sm font-bold">এখনও কোনো অনুরোধ জমা পড়েনি</p>
            <p className="text-slate-600 text-xs">
              গ্রাহকরা ওয়েবসাইট থেকে অনুরোধ ফর্ম জমা দিলে এখানে স্বয়ংক্রিয়ভাবে দেখাবে।
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-200 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider bg-slate-50">
                  <th className="p-3">আইডি (ID)</th>
                  <th className="p-3">গ্রাহকের নাম</th>
                  <th className="p-3">মোবাইল</th>
                  <th className="p-3">পরিষেবা</th>
                  <th className="p-3">স্ট্যাটাস</th>
                  <th className="p-3 text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-medium">
                {requests.slice(0, 5).map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3 font-bold text-slate-900">{req.id}</td>
                    <td className="p-3 font-bold text-slate-800">{req.customerName}</td>
                    <td className="p-3 text-slate-600 font-bold">{req.mobile}</td>
                    <td className="p-3 text-slate-800">{req.serviceName}</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${getStatusBadge(req.status)}`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => onSelectRequestDetails(req)}
                        className="bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold px-3 py-1.5 rounded-lg transition-colors border border-blue-200 text-[11px]"
                      >
                        বিস্তারিত
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

    </div>
  );
};
