import React from 'react';
import { Home, Bell, Plus, FileText, ReceiptText } from 'lucide-react';
import { ScreenType } from '../types/traffic';

interface BottomNavProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  unreadCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  onNavigate,
  unreadCount = 0,
}) => {
  const isNavActive = (screen: ScreenType) => {
    if (screen === 'home' && currentScreen === 'home') return true;
    if (screen === 'notifications' && currentScreen === 'notifications') return true;
    if (screen === 'my_reports' && currentScreen === 'my_reports') return true;
    if (screen === 'violations' && (currentScreen === 'violations' || currentScreen === 'violation_detail')) return true;
    return false;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 max-w-md mx-auto bg-white border-t border-slate-200/80 px-4 py-2 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-between relative">
        {/* Item 1: الرئيسية */}
        <button
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
            isNavActive('home') ? 'text-blue-600 font-bold' : 'text-slate-400 hover:text-slate-600'
          }`}
          aria-label="الرئيسية"
        >
          <Home className={`w-5 h-5 ${isNavActive('home') ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[11px] mt-1 font-medium">الرئيسية</span>
        </button>

        {/* Item 2: الإشعارات */}
        <button
          onClick={() => onNavigate('notifications')}
          className={`flex flex-col items-center justify-center flex-1 py-1 relative transition-colors ${
            isNavActive('notifications') ? 'text-blue-600 font-bold' : 'text-slate-400 hover:text-slate-600'
          }`}
          aria-label="الإشعارات"
        >
          <div className="relative">
            <Bell className={`w-5 h-5 ${isNavActive('notifications') ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white animate-pulse" />
            )}
          </div>
          <span className="text-[11px] mt-1 font-medium">الإشعارات</span>
        </button>

        {/* Center Item: Floating Plus Button for Report Incident */}
        <div className="flex-1 flex justify-center -mt-6">
          <button
            onClick={() => onNavigate('report_wizard')}
            className={`w-13 h-13 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg shadow-blue-500/40 transition-all transform active:scale-95 border-4 border-slate-50 hover:scale-105 ${
              currentScreen === 'report_wizard' ? 'ring-4 ring-blue-300' : ''
            }`}
            title="إرسال بلاغ جديد"
            aria-label="إرسال بلاغ"
          >
            <Plus className="w-7 h-7 stroke-[3]" />
          </button>
        </div>

        {/* Item 4: بلاغاتي */}
        <button
          onClick={() => onNavigate('my_reports')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
            isNavActive('my_reports') ? 'text-blue-600 font-bold' : 'text-slate-400 hover:text-slate-600'
          }`}
          aria-label="بلاغاتي"
        >
          <FileText className={`w-5 h-5 ${isNavActive('my_reports') ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[11px] mt-1 font-medium">بلاغاتي</span>
        </button>

        {/* Item 5: المخالفات */}
        <button
          onClick={() => onNavigate('violations')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
            isNavActive('violations') ? 'text-blue-600 font-bold' : 'text-slate-400 hover:text-slate-600'
          }`}
          aria-label="المخالفات"
        >
          <ReceiptText className={`w-5 h-5 ${isNavActive('violations') ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[11px] mt-1 font-medium">المخالفات</span>
        </button>
      </div>
    </div>
  );
};
