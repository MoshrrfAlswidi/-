import React, { useState } from 'react';
import {
  ArrowRight,
  Bell,
  ReceiptText,
  FileBadge,
  FileSpreadsheet,
  Gift,
  Volume2,
  Vibrate,
  Music,
  Moon,
  CheckCircle2,
  ChevronLeft,
} from 'lucide-react';
import { NotificationSettingsData, ScreenType } from '../types/traffic';

interface NotificationSettingsScreenProps {
  settings: NotificationSettingsData;
  onNavigate: (screen: ScreenType) => void;
  onSaveSettings: (settings: NotificationSettingsData) => void;
}

export const NotificationSettingsScreen: React.FC<NotificationSettingsScreenProps> = ({
  settings,
  onNavigate,
  onSaveSettings,
}) => {
  const [data, setData] = useState<NotificationSettingsData>(settings);
  const [showSavedToast, setShowSavedToast] = useState(false);

  const handleSave = () => {
    onSaveSettings(data);
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 2500);
  };

  return (
    <div className="pb-24 animate-fadeIn">
      {/* Top Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-3.5 sticky top-0 z-20 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('profile')}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
            aria-label="رجوع"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
          <h1 className="text-base font-extrabold text-slate-800">
            إعدادات الإشعارات
          </h1>
        </div>
      </div>

      {/* Toast Notification */}
      {showSavedToast && (
        <div className="mx-4 mt-3 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>تم حفظ إعدادات الإشعارات بنجاح!</span>
        </div>
      )}

      {/* Main Settings List Matching Page 15 */}
      <div className="px-4 py-4 space-y-2.5">
        <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 shadow-xs overflow-hidden">
          {/* 1. الإشعارات العامة */}
          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                <Bell className="w-4 h-4" />
              </div>
              <div className="text-right">
                <div className="text-xs font-extrabold text-slate-800">
                  الإشعارات العامة
                </div>
                <div className="text-[11px] text-slate-400">
                  تفعيل/إيقاف جميع الإشعارات
                </div>
              </div>
            </div>

            <button
              onClick={() =>
                setData({ ...data, generalNotifications: !data.generalNotifications })
              }
              className={`w-12 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
                data.generalNotifications ? 'bg-blue-600' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                  data.generalNotifications ? '-translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* 2. المخالفات الجديدة */}
          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-red-50 text-red-600">
                <ReceiptText className="w-4 h-4" />
              </div>
              <div className="text-right">
                <div className="text-xs font-extrabold text-slate-800">
                  المخالفات الجديدة
                </div>
                <div className="text-[11px] text-slate-400">
                  إشعار عند تسجيل مخالفة جديدة
                </div>
              </div>
            </div>

            <button
              onClick={() =>
                setData({ ...data, newViolations: !data.newViolations })
              }
              className={`w-12 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
                data.newViolations ? 'bg-blue-600' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                  data.newViolations ? '-translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* 3. تذكير انتهاء الرخصة */}
          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                <FileBadge className="w-4 h-4" />
              </div>
              <div className="text-right">
                <div className="text-xs font-extrabold text-slate-800">
                  تذكير انتهاء الرخصة
                </div>
                <div className="text-[11px] text-slate-400">
                  إشعار قبل انتهاء الرخصة
                </div>
              </div>
            </div>

            <button
              onClick={() =>
                setData({ ...data, licenseReminder: !data.licenseReminder })
              }
              className={`w-12 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
                data.licenseReminder ? 'bg-blue-600' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                  data.licenseReminder ? '-translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* 4. انتهاء استمارة المركبة */}
          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
                <FileSpreadsheet className="w-4 h-4" />
              </div>
              <div className="text-right">
                <div className="text-xs font-extrabold text-slate-800">
                  انتهاء استمارة المركبة
                </div>
                <div className="text-[11px] text-slate-400">
                  إشعار قبل انتهاء الاستمارة
                </div>
              </div>
            </div>

            <button
              onClick={() =>
                setData({
                  ...data,
                  vehicleRegistrationExpiry: !data.vehicleRegistrationExpiry,
                })
              }
              className={`w-12 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
                data.vehicleRegistrationExpiry ? 'bg-blue-600' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                  data.vehicleRegistrationExpiry ? '-translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* 5. العروض والخدمات */}
          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-pink-50 text-pink-600">
                <Gift className="w-4 h-4" />
              </div>
              <div className="text-right">
                <div className="text-xs font-extrabold text-slate-800">
                  العروض والخدمات
                </div>
                <div className="text-[11px] text-slate-400">
                  إشعارات العروض والخدمات
                </div>
              </div>
            </div>

            <button
              onClick={() =>
                setData({ ...data, offersAndServices: !data.offersAndServices })
              }
              className={`w-12 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
                data.offersAndServices ? 'bg-blue-600' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                  data.offersAndServices ? '-translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* 6. تشغيل الصوت */}
          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-cyan-50 text-cyan-600">
                <Volume2 className="w-4 h-4" />
              </div>
              <div className="text-right">
                <div className="text-xs font-extrabold text-slate-800">
                  تشغيل الصوت
                </div>
                <div className="text-[11px] text-slate-400">
                  تشغيل صوت الإشعارات
                </div>
              </div>
            </div>

            <button
              onClick={() =>
                setData({ ...data, soundEnabled: !data.soundEnabled })
              }
              className={`w-12 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
                data.soundEnabled ? 'bg-blue-600' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                  data.soundEnabled ? '-translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* 7. تشغيل الاهتزاز */}
          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                <Vibrate className="w-4 h-4" />
              </div>
              <div className="text-right">
                <div className="text-xs font-extrabold text-slate-800">
                  تشغيل الاهتزاز
                </div>
                <div className="text-[11px] text-slate-400">
                  الاهتزاز عند وصول الإشعارات
                </div>
              </div>
            </div>

            <button
              onClick={() =>
                setData({ ...data, vibrationEnabled: !data.vibrationEnabled })
              }
              className={`w-12 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
                data.vibrationEnabled ? 'bg-blue-600' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                  data.vibrationEnabled ? '-translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* 8. النغمة */}
          <div className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                <Music className="w-4 h-4" />
              </div>
              <div className="text-right">
                <div className="text-xs font-extrabold text-slate-800">
                  النغمة
                </div>
                <div className="text-[11px] text-slate-400">النغمة الحالية</div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-600 font-bold">
              <span>{data.ringtone}</span>
              <ChevronLeft className="w-4 h-4 text-slate-400" />
            </div>
          </div>

          {/* 9. وقت عدم الإزعاج */}
          <div className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-slate-100 text-slate-700">
                <Moon className="w-4 h-4" />
              </div>
              <div className="text-right">
                <div className="text-xs font-extrabold text-slate-800">
                  وقت عدم الإزعاج
                </div>
                <div className="text-[11px] text-slate-400">
                  {data.dndTimeRange}
                </div>
              </div>
            </div>

            <ChevronLeft className="w-4 h-4 text-slate-400" />
          </div>
        </div>

        {/* Save Button Matching Page 15 */}
        <div className="pt-4">
          <button
            onClick={handleSave}
            className="w-full py-3.5 bg-[#1b6eed] hover:bg-blue-700 active:scale-98 text-white font-extrabold text-sm rounded-xl shadow-md transition-all"
          >
            حفظ الإعدادات
          </button>
        </div>
      </div>
    </div>
  );
};
