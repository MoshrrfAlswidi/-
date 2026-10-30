import React, { useState } from 'react';
import { AlertTriangle, RefreshCw, Info, AlertCircle, ArrowRight, CheckCheck, Trash2 } from 'lucide-react';
import { TrafficNotification, ScreenType, NotificationType } from '../types/traffic';

interface NotificationsScreenProps {
  notifications: TrafficNotification[];
  onNavigate: (screen: ScreenType) => void;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
}

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({
  notifications,
  onNavigate,
  onMarkAsRead,
  onMarkAllAsRead,
  onClearAll,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | NotificationType>('all');

  const filteredNotifs = notifications.filter((notif) => {
    if (activeFilter === 'all') return true;
    return notif.type === activeFilter;
  });

  const getIconAndStyle = (type: NotificationType) => {
    switch (type) {
      case 'تحذير':
        return {
          icon: <AlertTriangle className="w-5 h-5 text-red-500 fill-red-100" />,
          bgColor: 'bg-red-50',
          textColor: 'text-red-600',
        };
      case 'تحديث':
        return {
          icon: <RefreshCw className="w-5 h-5 text-cyan-600" />,
          bgColor: 'bg-cyan-50',
          textColor: 'text-cyan-600',
        };
      case 'ازدحام':
        return {
          icon: <AlertCircle className="w-5 h-5 text-amber-500" />,
          bgColor: 'bg-amber-50',
          textColor: 'text-amber-600',
        };
      case 'عام':
      default:
        return {
          icon: <Info className="w-5 h-5 text-slate-500" />,
          bgColor: 'bg-slate-100',
          textColor: 'text-slate-600',
        };
    }
  };

  return (
    <div className="pb-24 animate-fadeIn">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-4 sticky top-0 z-20 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('home')}
              className="p-1.5 rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
              aria-label="الرجوع للرئيسية"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-extrabold text-slate-900">الإشعارات</h1>
          </div>

          <div className="flex items-center gap-2">
            {notifications.some((n) => !n.read) && (
              <button
                onClick={onMarkAllAsRead}
                className="text-xs text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1 bg-blue-50 px-2.5 py-1 rounded-lg"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>قراءة الكل</span>
              </button>
            )}
            {notifications.length > 0 && (
              <button
                onClick={onClearAll}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                title="مسح الإشعارات"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
              activeFilter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            الكل ({notifications.length})
          </button>
          <button
            onClick={() => setActiveFilter('تحذير')}
            className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
              activeFilter === 'تحذير'
                ? 'bg-red-500 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            تحذيرات
          </button>
          <button
            onClick={() => setActiveFilter('تحديث')}
            className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
              activeFilter === 'تحديث'
                ? 'bg-cyan-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            تحديثات البلاغات
          </button>
          <button
            onClick={() => setActiveFilter('عام')}
            className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
              activeFilter === 'عام'
                ? 'bg-slate-700 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            عام وتوعوي
          </button>
        </div>
      </div>

      {/* Notifications List matching Page 3 */}
      <div className="px-4 py-4 space-y-3">
        {filteredNotifs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
            <div className="w-16 h-16 mx-auto mb-3 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
              <Info className="w-8 h-8" />
            </div>
            <p className="text-slate-600 font-bold text-base">لا توجد إشعارات حالياً</p>
            <p className="text-xs text-slate-400 mt-1">
              ستصلك هنا تنبيهات إغلاق الطرق، تحديثات بلاغاتك، والمخالفات المسجلة.
            </p>
          </div>
        ) : (
          filteredNotifs.map((notif) => {
            const style = getIconAndStyle(notif.type);
            return (
              <div
                key={notif.id}
                onClick={() => {
                  onMarkAsRead(notif.id);
                  if (notif.actionUrl) {
                    onNavigate(notif.actionUrl);
                  }
                }}
                className={`bg-white rounded-xl p-4 border transition-all cursor-pointer hover:shadow-md flex items-center justify-between ${
                  notif.read ? 'border-slate-200 opacity-90' : 'border-blue-200 ring-1 ring-blue-100 shadow-xs'
                }`}
              >
                {/* Right side in RTL: Title, description, icon */}
                <div className="flex items-center gap-3.5">
                  <div className={`p-2.5 rounded-full ${style.bgColor} flex-shrink-0`}>
                    {style.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-extrabold ${style.textColor}`}>
                        {notif.title}
                      </span>
                      {!notif.read && (
                        <span className="w-2 h-2 rounded-full bg-blue-600" />
                      )}
                    </div>
                    <p className="text-xs font-medium text-slate-700 mt-0.5 leading-snug">
                      {notif.message}
                    </p>
                  </div>
                </div>

                {/* Left side in RTL: time e.g. "منذ 10 دقائق" */}
                <div className="text-[11px] text-slate-400 font-medium whitespace-nowrap pl-1">
                  {notif.timeAgo}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
