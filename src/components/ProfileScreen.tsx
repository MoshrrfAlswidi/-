import React from 'react';
import {
  User,
  Car,
  CreditCard,
  Bell,
  Globe,
  Info,
  LogOut,
  ChevronLeft,
  Settings,
  Camera,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { UserProfile, ScreenType } from '../types/traffic';

interface ProfileScreenProps {
  user: UserProfile;
  onNavigate: (screen: ScreenType) => void;
  onOpenAbout: () => void;
  onSignOut: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  user,
  onNavigate,
  onOpenAbout,
  onSignOut,
}) => {
  return (
    <div className="pb-24 animate-fadeIn">
      {/* Top Header & Profile Banner matching Page 11 */}
      <div className="relative bg-gradient-to-b from-[#12243d] to-[#1c3a63] text-white pt-6 pb-8 px-4 rounded-b-[2.5rem] shadow-md text-center">
        {/* Top Action Row */}
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={() => onNavigate('home')}
            className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors"
            aria-label="الرجوع للرئيسية"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
          <h1 className="text-base font-extrabold text-white">الملف الشخصي</h1>
          <button
            onClick={() => onNavigate('notification_settings')}
            className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors"
            title="الإعدادات"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Avatar with Camera Icon */}
        <div className="relative inline-block mt-3">
          <div className="w-24 h-24 rounded-full p-1 bg-white/20 backdrop-blur-xs ring-4 ring-white/30 shadow-xl overflow-hidden mx-auto">
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <button
            onClick={() => onNavigate('personal_info')}
            className="absolute bottom-0 right-0 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md border-2 border-white transition-transform active:scale-95"
            title="تغيير الصورة"
          >
            <Camera className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* User Details */}
        <div className="mt-3">
          <div className="flex items-center justify-center gap-1.5">
            <h2 className="text-lg font-black text-white">{user.name}</h2>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xs text-blue-200 font-mono mt-1" dir="ltr">
            {user.phone}
          </div>
          <div className="text-xs text-blue-300 font-medium mt-0.5" dir="ltr">
            {user.email}
          </div>
        </div>
      </div>

      {/* Profile Menu Items matching Page 11 */}
      <div className="px-4 py-4 space-y-2.5">
        {/* Item 1: المعلومات الشخصية */}
        <button
          onClick={() => onNavigate('personal_info')}
          className="w-full bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between text-right shadow-xs transition-all active:scale-99"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
              <User className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-xs text-slate-800">
              المعلومات الشخصية
            </span>
          </div>
          <ChevronLeft className="w-4 h-4 text-slate-400" />
        </button>

        {/* Item 2: المركبات المسجلة */}
        <button
          onClick={() => onNavigate('vehicles')}
          className="w-full bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between text-right shadow-xs transition-all active:scale-99"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
              <Car className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-xs text-slate-800">
              المركبات المسجلة
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
              3 مركبات
            </span>
            <ChevronLeft className="w-4 h-4 text-slate-400" />
          </div>
        </button>

        {/* Item 3: طرق الدفع */}
        <button
          onClick={() => onNavigate('payment_methods')}
          className="w-full bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between text-right shadow-xs transition-all active:scale-99"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
              <CreditCard className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-xs text-slate-800">
              طرق الدفع
            </span>
          </div>
          <ChevronLeft className="w-4 h-4 text-slate-400" />
        </button>

        {/* Item 4: إعدادات الإشعارات */}
        <button
          onClick={() => onNavigate('notification_settings')}
          className="w-full bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between text-right shadow-xs transition-all active:scale-99"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
              <Bell className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-xs text-slate-800">
              إعدادات الإشعارات
            </span>
          </div>
          <ChevronLeft className="w-4 h-4 text-slate-400" />
        </button>

        {/* Item 5: اللغة */}
        <div className="w-full bg-white border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between text-right shadow-xs">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600">
              <Globe className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-xs text-slate-800">
              اللغة
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-blue-600">العربية</span>
            <ChevronLeft className="w-4 h-4 text-slate-400" />
          </div>
        </div>

        {/* Item 6: عن التطبيق */}
        <button
          onClick={onOpenAbout}
          className="w-full bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between text-right shadow-xs transition-all active:scale-99"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-50 text-cyan-600">
              <Info className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-xs text-slate-800">
              عن التطبيق
            </span>
          </div>
          <ChevronLeft className="w-4 h-4 text-slate-400" />
        </button>

        {/* Item 7: تسجيل الخروج */}
        <button
          onClick={onSignOut}
          className="w-full bg-red-50/70 hover:bg-red-100 border border-red-200 rounded-2xl p-3.5 flex items-center justify-between text-right shadow-xs transition-all active:scale-99 text-red-600 mt-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-red-100 text-red-600">
              <LogOut className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-xs">تسجيل الخروج</span>
          </div>
          <ChevronLeft className="w-4 h-4 text-red-400" />
        </button>
      </div>
    </div>
  );
};
