import React from 'react';
import { Settings, ChevronLeft, ReceiptText, AlertTriangle, Map, Bell, PhoneCall, ShieldCheck, Car } from 'lucide-react';
import { ScreenType, UserProfile, Violation, IncidentReport } from '../types/traffic';
import { TrafficEmblem } from './TrafficEmblem';

interface HomeScreenProps {
  user: UserProfile;
  violations: Violation[];
  reports: IncidentReport[];
  unreadNotifsCount: number;
  onNavigate: (screen: ScreenType) => void;
  onOpenViolation: (violation: Violation) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  user,
  violations,
  reports,
  unreadNotifsCount,
  onNavigate,
  onOpenViolation,
}) => {
  const unpaidViolations = violations.filter((v) => v.status === 'unpaid');
  const activeReports = reports.filter((r) => r.status === 'قيد المعالجة');

  return (
    <div className="pb-24 animate-fadeIn">
      {/* Top Navy Blue Header */}
      <div className="bg-[#12243d] text-white px-5 pt-7 pb-6 rounded-b-[2.5rem] shadow-md relative overflow-hidden">
        {/* Subtle decorative background circles */}
        <div className="absolute -top-12 -left-12 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl" />
        <div className="absolute top-8 -right-8 w-44 h-44 bg-cyan-400/10 rounded-full blur-2xl" />

        <div className="flex items-center justify-between relative z-10">
          {/* User Profile Info on Right (RTL start) */}
          <button
            onClick={() => onNavigate('profile')}
            className="flex items-center gap-3 text-right group focus:outline-none"
            aria-label="الملف الشخصي"
          >
            <div className="relative">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-white/80 shadow-md group-hover:scale-105 transition-transform"
              />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#12243d] rounded-full" />
            </div>
            <div>
              <div className="text-xs text-slate-300 font-medium">أهلاً بك</div>
              <div className="text-lg font-bold text-white flex items-center gap-1.5">
                <span>مرحباً {user.name.split(' ')[0]}</span>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
          </button>

          {/* Settings / Gear Button on Left (RTL end) */}
          <button
            onClick={() => onNavigate('profile')}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 transition-all text-white backdrop-blur-sm border border-white/10"
            title="الإعدادات والملف الشخصي"
            aria-label="الإعدادات"
          >
            <Settings className="w-5 h-5 stroke-[2]" />
          </button>
        </div>

        {/* Traffic Police Emblem in Center */}
        <div className="mt-4 flex flex-col items-center justify-center relative z-10">
          <div className="p-3 bg-white/95 rounded-full shadow-xl ring-4 ring-white/20 hover:scale-105 transition-transform">
            <TrafficEmblem size={105} />
          </div>
          <div className="text-center mt-3">
            <h2 className="text-base font-extrabold text-white tracking-wide">
              الإدارة العامة للمرور
            </h2>
            <p className="text-xs text-blue-200 mt-0.5">
              منظومة المرور الذكية الخاصة بالسائقين
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="px-4 mt-6">
        {/* Section Title */}
        <div className="flex items-center justify-between mb-4 px-1">
          <h3 className="text-lg font-bold text-slate-900">الخدمات الرئيسية</h3>
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
            خدمات السائقين
          </span>
        </div>

        {/* 2x2 Services Grid (Matching Page 2 Exactly) */}
        <div className="grid grid-cols-2 gap-3.5">
          {/* Card 1: المخالفات (Blue) */}
          <button
            onClick={() => onNavigate('violations')}
            className="group relative bg-[#1b6eed] hover:bg-[#165ecb] text-white rounded-2xl p-4 text-right shadow-md hover:shadow-lg transition-all transform active:scale-98 flex flex-col justify-between min-h-[128px] overflow-hidden"
          >
            <div className="flex items-center justify-between w-full">
              <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-xs">
                <ReceiptText className="w-6 h-6 text-white stroke-[2.2]" />
              </div>
              <ChevronLeft className="w-5 h-5 text-white/80 group-hover:-translate-x-1 transition-transform" />
            </div>
            <div className="mt-3">
              <div className="text-lg font-bold">المخالفات</div>
              <div className="text-[11px] text-blue-100 font-medium mt-0.5">
                عرض ودفع المخالفات
              </div>
            </div>
            {unpaidViolations.length > 0 && (
              <span className="absolute top-3 left-10 bg-amber-400 text-slate-950 font-black text-[10px] px-1.5 py-0.5 rounded-full shadow-sm">
                {unpaidViolations.length}
              </span>
            )}
          </button>

          {/* Card 2: إرسال بلاغ (Coral / Red) */}
          <button
            onClick={() => onNavigate('report_wizard')}
            className="group relative bg-[#eb5151] hover:bg-[#d84040] text-white rounded-2xl p-4 text-right shadow-md hover:shadow-lg transition-all transform active:scale-98 flex flex-col justify-between min-h-[128px] overflow-hidden"
          >
            <div className="flex items-center justify-between w-full">
              <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-xs">
                <AlertTriangle className="w-6 h-6 text-white stroke-[2.2]" />
              </div>
              <ChevronLeft className="w-5 h-5 text-white/80 group-hover:-translate-x-1 transition-transform" />
            </div>
            <div className="mt-3">
              <div className="text-lg font-bold">إرسال بلاغ</div>
              <div className="text-[11px] text-rose-100 font-medium mt-0.5">
                بلاغ عن حادث أو مشكلة
              </div>
            </div>
          </button>

          {/* Card 3: الخريطة (Purple / Violet) */}
          <button
            onClick={() => onNavigate('traffic_map')}
            className="group relative bg-[#7052db] hover:bg-[#6042c8] text-white rounded-2xl p-4 text-right shadow-md hover:shadow-lg transition-all transform active:scale-98 flex flex-col justify-between min-h-[128px] overflow-hidden"
          >
            <div className="flex items-center justify-between w-full">
              <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-xs">
                <Map className="w-6 h-6 text-white stroke-[2.2]" />
              </div>
              <ChevronLeft className="w-5 h-5 text-white/80 group-hover:-translate-x-1 transition-transform" />
            </div>
            <div className="mt-3">
              <div className="text-lg font-bold">الخريطة</div>
              <div className="text-[11px] text-purple-100 font-medium mt-0.5">
                عرض حالة الطرق
              </div>
            </div>
          </button>

          {/* Card 4: الإشعارات (Green / Emerald) */}
          <button
            onClick={() => onNavigate('notifications')}
            className="group relative bg-[#2dbd73] hover:bg-[#25a965] text-white rounded-2xl p-4 text-right shadow-md hover:shadow-lg transition-all transform active:scale-98 flex flex-col justify-between min-h-[128px] overflow-hidden"
          >
            <div className="flex items-center justify-between w-full">
              <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-xs">
                <Bell className="w-6 h-6 text-white stroke-[2.2]" />
              </div>
              <ChevronLeft className="w-5 h-5 text-white/80 group-hover:-translate-x-1 transition-transform" />
            </div>
            <div className="mt-3">
              <div className="text-lg font-bold">الإشعارات</div>
              <div className="text-[11px] text-emerald-100 font-medium mt-0.5">
                التنبيهات والإشعارات
              </div>
            </div>
            {unreadNotifsCount > 0 && (
              <span className="absolute top-3 left-10 bg-red-600 text-white font-black text-[10px] px-1.5 py-0.5 rounded-full shadow-sm animate-pulse">
                {unreadNotifsCount}
              </span>
            )}
          </button>
        </div>

        {/* Quick Driver Status Card */}
        <div className="mt-5 bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-800">حالة السائق والمركبات</h4>
                <p className="text-xs text-slate-500">رخصة قيادة: {user.licenseCategory} (سارية)</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('vehicles')}
              className="text-xs font-bold text-blue-600 hover:text-blue-800"
            >
              المركبات (3) &larr;
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-3">
            <div
              onClick={() => onNavigate('violations')}
              className="bg-slate-50 hover:bg-slate-100 rounded-xl p-3 cursor-pointer transition-colors"
            >
              <div className="text-xs text-slate-500 font-medium">مخالفات غير مسددة</div>
              <div className="text-lg font-extrabold text-red-600 mt-0.5 flex items-center justify-between">
                <span>{unpaidViolations.length} مخالفة</span>
                <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                  {unpaidViolations.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()} ر.ي
                </span>
              </div>
            </div>

            <div
              onClick={() => onNavigate('my_reports')}
              className="bg-slate-50 hover:bg-slate-100 rounded-xl p-3 cursor-pointer transition-colors"
            >
              <div className="text-xs text-slate-500 font-medium">بلاغاتي النشطة</div>
              <div className="text-lg font-extrabold text-amber-600 mt-0.5 flex items-center justify-between">
                <span>{activeReports.length} بلاغ</span>
                <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                  قيد المتابعة
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Assistance Hotline Banner */}
        <div className="mt-4 bg-gradient-to-l from-red-600 to-rose-700 text-white rounded-2xl p-3.5 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-sm animate-pulse">
              <PhoneCall className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-sm font-bold">طوارئ المرور السريع 194</div>
              <div className="text-xs text-rose-100">للحوادث الطارئة وطلب الإسعاف المروري</div>
            </div>
          </div>
          <a
            href="tel:194"
            className="px-3 py-1.5 bg-white text-red-700 font-extrabold text-xs rounded-xl shadow hover:bg-slate-50 active:scale-95 transition-all"
          >
            اتصال فوري
          </a>
        </div>
      </div>
    </div>
  );
};
