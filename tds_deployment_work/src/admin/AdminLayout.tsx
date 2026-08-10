import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Inbox, 
  FileText, 
  Megaphone, 
  Settings, 
  BarChart2, 
  LogOut, 
  Menu, 
  X, 
  Globe, 
  ShieldCheck,
  ChevronRight,
  Bell
} from 'lucide-react';
import { setAdminAuthenticated } from '../data/store';
import { logoutAdminFirebase } from '../data/firestoreService';

export type AdminTab = 'dashboard' | 'requests' | 'services' | 'announcements' | 'settings' | 'analytics';

interface AdminLayoutProps {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  onLogout: () => void;
  onViewPublicSite: () => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  activeTab,
  onTabChange,
  onLogout,
  onViewPublicSite,
  children
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleToast = (e: any) => {
      const msg = e.detail?.message || 'নতুন Service Request এসেছে';
      setToastMessage(msg);
      setTimeout(() => {
        setToastMessage(null);
      }, 5000);
    };

    window.addEventListener('tds_new_request_toast', handleToast as EventListener);
    return () => window.removeEventListener('tds_new_request_toast', handleToast as EventListener);
  }, []);

  const navItems: { id: AdminTab; label: string; icon: React.ElementType }[] = [
    { id: 'dashboard', label: 'ড্যাশবোর্ড (Dashboard)', icon: LayoutDashboard },
    { id: 'requests', label: 'গ্রাহক অনুরোধ (Requests)', icon: Inbox },
    { id: 'services', label: 'পরিষেবা ব্যবস্থাপনা (Services)', icon: FileText },
    { id: 'announcements', label: 'ঘোষণা (Announcements)', icon: Megaphone },
    { id: 'settings', label: 'সেন্টার সেটিংস (Settings)', icon: Settings },
    { id: 'analytics', label: 'অ্যানালিটিক্স (Analytics)', icon: BarChart2 },
  ];

  const handleNavClick = (tab: AdminTab) => {
    onTabChange(tab);
    setMobileMenuOpen(false);
  };

  const handleLogoutClick = async () => {
    await logoutAdminFirebase();
    setAdminAuthenticated(false);
    onLogout();
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-['Hind_Siliguri',sans-serif] relative">
      
      {/* Real-time Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-emerald-800 text-white px-4 py-3 rounded-2xl shadow-2xl border border-emerald-500 flex items-center gap-3 animate-bounce">
          <Bell className="w-5 h-5 text-amber-300 flex-shrink-0" />
          <div className="text-xs font-black">{toastMessage}</div>
          <button 
            onClick={() => setToastMessage(null)}
            className="p-1 rounded-lg hover:bg-emerald-700 text-emerald-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Navbar */}
      <header className="bg-[#0F2C59] text-white sticky top-0 z-40 border-b border-blue-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 md:hidden transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center font-black text-white text-sm shadow-md border border-emerald-400/40">
                TDS
              </div>
              <div>
                <h1 className="font-extrabold text-sm sm:text-base leading-tight tracking-tight text-white flex items-center gap-1.5">
                  Tamrin Digital Service
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase hidden sm:inline-block">
                    Admin
                  </span>
                </h1>
                <p className="text-[11px] text-slate-300 hidden sm:block">
                  অ্যাডমিন কন্ট্রোল সেন্টার
                </p>
              </div>
            </div>
          </div>

          {/* Quick Right Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onViewPublicSite}
              className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-bold py-2 px-3.5 rounded-xl border border-white/15 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">পাবলিক ওয়েবসাইট</span>
            </button>

            <button
              onClick={handleLogoutClick}
              className="inline-flex items-center gap-1.5 bg-red-600/80 hover:bg-red-600 text-white text-xs font-bold py-2 px-3 rounded-xl transition-colors shadow-sm"
              title="লগআউট"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">লগআউট</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Content Area with Sidebar */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 flex flex-col md:flex-row gap-6">
        
        {/* Desktop Sidebar Nav */}
        <aside className="w-64 flex-shrink-0 hidden md:block space-y-4">
          <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-sm space-y-1">
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-600 border-b border-slate-100 mb-1">
              প্রধান মেনু (Main Menu)
            </div>

            {navItems.map(({ id, label, icon: Icon }) => {
              const isActive = activeTab === id;
              return (
                <button
                  key={id}
                  onClick={() => handleNavClick(id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl font-bold text-xs transition-all ${
                    isActive
                      ? 'bg-[#0F2C59] text-white shadow-md'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                    <span>{label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4 text-emerald-400" />}
                </button>
              );
            })}
          </div>

          <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl text-xs space-y-2 text-blue-950">
            <div className="flex items-center gap-1.5 font-bold text-blue-900">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>স্বাধীন ডিজিটাল প্ল্যাটফর্ম</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Tamrin Digital Service একটি স্বাধীন সহায়তা কেন্দ্র। কোনো সরকারি ডেটা বা গোপন তথ্য এখানে জমা করা হয় না।
            </p>
          </div>
        </aside>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex flex-col animate-in fade-in">
            <div className="bg-[#0F2C59] text-white p-4 flex items-center justify-between border-b border-blue-900">
              <span className="font-extrabold text-sm">অ্যাডমিন মেনু</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-1 rounded-lg hover:bg-white/10">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="bg-white flex-1 p-4 space-y-2 overflow-y-auto">
              {navItems.map(({ id, label, icon: Icon }) => {
                const isActive = activeTab === id;
                return (
                  <button
                    key={id}
                    onClick={() => handleNavClick(id)}
                    className={`w-full flex items-center justify-between p-3.5 rounded-xl font-bold text-xs transition-all ${
                      isActive
                        ? 'bg-[#0F2C59] text-white shadow-md'
                        : 'text-slate-800 hover:bg-slate-100 border border-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                      <span>{label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Main View Area */}
        <main className="flex-1 min-w-0">
          {children}
        </main>

      </div>

    </div>
  );
};
