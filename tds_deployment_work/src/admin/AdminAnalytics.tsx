import React, { useState, useEffect } from 'react';
import { BarChart2, Calendar, TrendingUp, CheckCircle2, Clock, Inbox } from 'lucide-react';
import { getStoredRequests } from '../data/store';
import { ServiceRequest, RequestStatus } from '../types';

export const AdminAnalytics: React.FC = () => {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);

  useEffect(() => {
    setRequests(getStoredRequests());
  }, []);

  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(now.getDate() - 7);

  const oneMonthAgo = new Date();
  oneMonthAgo.setDate(now.getDate() - 30);

  const requestsToday = requests.filter((r) => r.createdAt.startsWith(todayStr)).length;
  const requestsThisWeek = requests.filter((r) => new Date(r.createdAt) >= oneWeekAgo).length;
  const requestsThisMonth = requests.filter((r) => new Date(r.createdAt) >= oneMonthAgo).length;

  // Status Distribution
  const statusCounts: Record<RequestStatus, number> = {
    New: 0,
    Contacted: 0,
    Processing: 0,
    Completed: 0,
    Cancelled: 0,
  };

  requests.forEach((r) => {
    if (statusCounts[r.status] !== undefined) {
      statusCounts[r.status]++;
    }
  });

  // Most requested services
  const serviceCounts: Record<string, number> = {};
  requests.forEach((r) => {
    serviceCounts[r.serviceName] = (serviceCounts[r.serviceName] || 0) + 1;
  });

  const sortedServices = Object.entries(serviceCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const total = requests.length || 1;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
          <BarChart2 className="w-6 h-6 text-blue-900" />
          <span>ড্যাশবোর্ড অ্যানালিটিক্স (Dashboard Analytics)</span>
        </h2>
        <p className="text-xs text-slate-600 mt-1">
          রিয়েল স্টোর করা ডেটার ভিত্তিতে পরিষেবা অনুরোধের পরিসংখ্যান ও কাজের রিপোর্ট।
        </p>
      </div>

      {/* Time-based Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>আজকের অনুরোধ (Today)</span>
            <Calendar className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">{requestsToday}</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>এই সপ্তাহের অনুরোধ (This Week)</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">{requestsThisWeek}</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>এই মাসের অনুরোধ (This Month)</span>
            <Inbox className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">{requestsThisMonth}</div>
        </div>

      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Status Distribution Visual Bars */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-extrabold text-slate-900 text-base border-b pb-3">
            অনুরোধ স্ট্যাটাস বিভাজন (Status Distribution)
          </h3>

          <div className="space-y-3 text-xs font-bold">
            {(['New', 'Contacted', 'Processing', 'Completed', 'Cancelled'] as RequestStatus[]).map((st) => {
              const count = statusCounts[st];
              const percentage = Math.round((count / total) * 100);

              let barColor = 'bg-slate-400';
              if (st === 'New') barColor = 'bg-amber-500';
              if (st === 'Contacted') barColor = 'bg-blue-600';
              if (st === 'Processing') barColor = 'bg-indigo-600';
              if (st === 'Completed') barColor = 'bg-emerald-600';

              return (
                <div key={st} className="space-y-1">
                  <div className="flex justify-between text-slate-700">
                    <span>{st}</span>
                    <span>{count} টি ({percentage}%)</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${barColor} transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Most Requested Services List */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-extrabold text-slate-900 text-base border-b pb-3">
            সর্বাধিক অনুরোধকৃত শীর্ষ পরিষেবা (Most Requested Services)
          </h3>

          {sortedServices.length === 0 ? (
            <p className="text-slate-500 text-xs text-center py-8">
              এখনও কোনো পরিষেবা নির্দিষ্ট অনুরোধ পাওয়া যায়নি।
            </p>
          ) : (
            <div className="space-y-3 text-xs font-bold">
              {sortedServices.map(([sName, count]) => {
                const pct = Math.round((count / total) * 100);
                return (
                  <div key={sName} className="space-y-1">
                    <div className="flex justify-between text-slate-800">
                      <span>{sName}</span>
                      <span className="text-blue-900">{count} টি</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#0F2C59] transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
