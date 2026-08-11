import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, Eye, EyeOff, AlertCircle, ArrowLeft, KeyRound, Database, CheckCircle2, Info } from 'lucide-react';
import { setAdminAuthenticated } from '../data/store';
import { isFirebaseConfigured } from '../lib/firebase';
import { loginAdminFirebase } from '../data/firestoreService';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onGoBack: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onGoBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim() || !password.trim()) {
      setErrorMsg('ইমেইল এবং পাসওয়ার্ড পূরণ করুন (Fill Email & Password)');
      return;
    }

    setIsLoading(true);

    if (isFirebaseConfigured) {
      // 1. REAL FIREBASE AUTHENTICATION & FIRESTORE AUTHORIZATION
      const result = await loginAdminFirebase(email, password);
      setIsLoading(false);

      if (result.success) {
        setAdminAuthenticated(true, result.user?.email);
        onLoginSuccess();
      } else {
        setErrorMsg(result.error || 'লগইন ব্যর্থ হয়েছে।');
      }
    } else {
      // 2. FALLBACK TRIAL MODE (Firebase env vars not injected)
      setTimeout(() => {
        setIsLoading(false);
        if ((email.trim().toLowerCase() === 'admin' || email.includes('@')) && password.length >= 4) {
          setAdminAuthenticated(true, email);
          onLoginSuccess();
        } else {
          setErrorMsg('আপনার লগইন তথ্য সঠিক নয়।');
        }
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F2C59] via-[#1E3E62] to-slate-900 flex items-center justify-center p-4 relative overflow-hidden font-['Hind_Siliguri',sans-serif]">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full relative z-10 space-y-5">
        
        {/* Back Button */}
        <button
          onClick={onGoBack}
          className="inline-flex items-center gap-2 text-slate-300 hover:text-white text-xs font-bold transition-colors bg-white/10 hover:bg-white/20 px-3.5 py-2 rounded-xl border border-white/10"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>ওয়েবসাইটে ফিরে যান (Back to Website)</span>
        </button>

        {/* Login Box */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-7 shadow-2xl border border-white/20 space-y-5">
          
          {/* Branding Header */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-[#0F2C59] rounded-2xl mx-auto flex items-center justify-center shadow-lg border border-blue-400/30">
              <ShieldCheck className="w-8 h-8 text-emerald-400" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Tamrin Digital Service
            </h1>
            <p className="text-xs text-slate-600 font-bold uppercase tracking-wider bg-slate-100 py-1 px-3 rounded-full inline-block">
              অ্যাডমিন প্যানেল লগইন (Firebase Authenticated)
            </p>
          </div>

          {/* Firebase Connection Status Notice */}
          {!isFirebaseConfigured && (
            <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-2xl text-xs space-y-2">
              <div className="flex items-center justify-between text-amber-900 font-bold">
                <span className="flex items-center gap-1.5">
                  <Database className="w-4 h-4 text-amber-600" />
                  <span>Firebase Mode: Client Storage Active</span>
                </span>
                <button 
                  onClick={() => setShowChecklist(!showChecklist)}
                  className="text-[11px] underline text-blue-900 hover:text-blue-700 font-extrabold"
                >
                  {showChecklist ? 'বন্ধ করুন' : 'Setup Checklist'}
                </button>
              </div>
              <p className="text-amber-800 text-[11px] leading-relaxed">
                Firebase পরিবেশের পরিবর্তনশীল পরিবেশ ভেরিয়েবল (VITE_FIREBASE_*) এখনও কনফিগার করা হয়নি। ট্রায়াল লগইনের জন্য ইমেইলে <strong>admin@tamrindigital.com</strong> এবং যেকোনো ৪+ অক্ষরের পাসওয়ার্ড ব্যবহার করতে পারেন।
              </p>
            </div>
          )}

          {/* Setup Checklist Drawer */}
          {showChecklist && (
            <div className="bg-slate-900 text-slate-200 p-4 rounded-2xl text-xs space-y-2 border border-slate-700 animate-in fade-in">
              <h4 className="font-extrabold text-amber-400 flex items-center gap-1.5">
                <Info className="w-4 h-4" />
                Firebase Console Setup Checklist:
              </h4>
              <ol className="list-decimal list-inside space-y-1 text-[11px] text-slate-300">
                <li>Create Firebase Project in Firebase Console.</li>
                <li>Enable Firebase Authentication (Email/Password).</li>
                <li>Create Firestore Database in Production Mode.</li>
                <li>Add Admin User UID inside <code className="text-emerald-400 font-mono">admins/&#123;uid&#125;</code> collection.</li>
                <li>Paste credentials into <code className="text-emerald-400 font-mono">.env.example</code> or Environment Variables.</li>
              </ol>
            </div>
          )}

          {/* Error Banner */}
          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-800 text-xs font-bold p-3.5 rounded-2xl flex items-center gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                ইমেইল ঠিকানা (Email Address):
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@tamrindigital.com"
                  className="w-full bg-slate-50 text-slate-900 font-medium text-xs p-3.5 pl-10 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0F2C59]"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                পাসওয়ার্ড (Password):
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 text-slate-900 font-medium text-xs p-3.5 pl-10 pr-10 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0F2C59]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Checkbox */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-[#0F2C59] rounded border-slate-300 focus:ring-[#0F2C59]"
                />
                <span>লগইন মনে রাখুন (Remember me)</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#0F2C59] via-blue-900 to-[#0F2C59] hover:from-blue-900 hover:to-[#0F2C59] text-white font-extrabold text-xs sm:text-sm py-3.5 px-6 rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01] active:scale-[0.99]"
            >
              <KeyRound className="w-4 h-4 text-emerald-400" />
              <span>{isLoading ? 'যাচাই করা হচ্ছে (Authenticating...)' : 'নিরাপদ লগইন (Secure Login)'}</span>
            </button>
          </form>

          {/* Privacy & Security Disclaimer */}
          <div className="pt-3 border-t border-slate-200 text-[11px] text-slate-500 space-y-1">
            <p className="font-bold text-slate-700 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              নিরাপত্তা নীতি (Security Policy):
            </p>
            <p className="leading-relaxed">
              Firebase Auth & Firestore Rules দ্বারা সুরক্ষিত। কোনো পাসওয়ার্ড বা সংবেদনশীল গ্রাহক তথ্য প্লেইন টেক্সটে সংরক্ষিত হয় না।
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
