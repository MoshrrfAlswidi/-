import React, { useState } from 'react';
import {
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Home,
  FileBadge,
  Calendar,
  ShieldCheck,
  Camera,
  CheckCircle2,
  Car,
} from 'lucide-react';
import { UserProfile, ScreenType } from '../types/traffic';

interface PersonalInfoScreenProps {
  user: UserProfile;
  onNavigate: (screen: ScreenType) => void;
  onUpdateUser: (updatedUser: UserProfile) => void;
}

export const PersonalInfoScreen: React.FC<PersonalInfoScreenProps> = ({
  user,
  onNavigate,
  onUpdateUser,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserProfile>(user);
  const [showSaveAlert, setShowSaveAlert] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser(formData);
    setIsEditing(false);
    setShowSaveAlert(true);
    setTimeout(() => setShowSaveAlert(false), 3000);
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
            المعلومات الشخصية
          </h1>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
        >
          {isEditing ? 'إلغاء' : 'تعديل'}
        </button>
      </div>

      {/* Save Success Alert */}
      {showSaveAlert && (
        <div className="mx-4 mt-3 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>تم حفظ التعديلات بنجاح!</span>
        </div>
      )}

      {/* Header Profile Card matching Page 12 */}
      <div className="px-4 pt-4">
        <div className="bg-gradient-to-b from-blue-600 to-[#1b50ba] text-white rounded-3xl p-5 text-center shadow-md relative overflow-hidden">
          {/* Subtle background motif */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />

          {/* Avatar with camera */}
          <div className="relative inline-block">
            <div className="w-20 h-20 rounded-full p-1 bg-white ring-4 ring-white/30 shadow-lg overflow-hidden mx-auto">
              <img
                src={formData.avatarUrl}
                alt={formData.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            {isEditing && (
              <button
                type="button"
                className="absolute bottom-0 right-0 p-1.5 bg-blue-700 text-white rounded-full shadow-md border-2 border-white"
                title="تغيير الصورة"
              >
                <Camera className="w-3 h-3" />
              </button>
            )}
          </div>

          <h2 className="text-lg font-black text-white mt-2">{formData.name}</h2>
          <div className="text-xs text-blue-100 font-mono mt-0.5">
            رقم الهوية: {formData.nationalId}
          </div>

          {/* Verified Badge */}
          <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 rounded-full text-[11px] font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>الحساب موثق</span>
          </div>
        </div>
      </div>

      {/* Information Form matching Page 12 */}
      <form onSubmit={handleSave} className="px-4 py-4 space-y-4">
        {/* Section 1: معلومات الاتصال */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <h3 className="text-xs font-extrabold text-slate-800 pb-2.5 mb-3 border-b border-slate-100">
            معلومات الاتصال
          </h3>

          <div className="space-y-3 text-xs">
            {/* الهاتف */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-500">
                <Phone className="w-4 h-4 text-blue-600" />
                <span>الهاتف</span>
              </div>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="border border-blue-300 rounded px-2 py-1 text-xs text-left font-mono w-40"
                  dir="ltr"
                />
              ) : (
                <span className="font-bold text-slate-800 font-mono" dir="ltr">
                  {formData.phone}
                </span>
              )}
            </div>

            {/* البريد الإلكتروني */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-500">
                <Mail className="w-4 h-4 text-blue-600" />
                <span>البريد الإلكتروني</span>
              </div>
              {isEditing ? (
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="border border-blue-300 rounded px-2 py-1 text-xs text-left font-mono w-48"
                  dir="ltr"
                />
              ) : (
                <span className="font-bold text-slate-800 font-mono" dir="ltr">
                  {formData.email}
                </span>
              )}
            </div>

            {/* المحافظة */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-500">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>المحافظة</span>
              </div>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.governorate}
                  onChange={(e) =>
                    setFormData({ ...formData, governorate: e.target.value })
                  }
                  className="border border-blue-300 rounded px-2 py-1 text-xs w-36"
                />
              ) : (
                <span className="font-bold text-slate-800">
                  {formData.governorate}
                </span>
              )}
            </div>

            {/* العنوان */}
            <div className="pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2 text-slate-500 mb-1">
                <Home className="w-4 h-4 text-blue-600" />
                <span>العنوان</span>
              </div>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full border border-blue-300 rounded px-2 py-1 text-xs font-medium"
                />
              ) : (
                <p className="text-slate-800 font-medium text-[11px] leading-snug">
                  {formData.address}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Section 2: معلومات الرخصة */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <h3 className="text-xs font-extrabold text-slate-800 pb-2.5 mb-3 border-b border-slate-100">
            معلومات الرخصة
          </h3>

          <div className="space-y-3 text-xs">
            {/* رقم الرخصة */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-500">
                <FileBadge className="w-4 h-4 text-blue-600" />
                <span>رقم الرخصة</span>
              </div>
              <span className="font-bold text-slate-800 font-mono tracking-wider bg-slate-100 px-2 py-0.5 rounded">
                {formData.licenseNumber}
              </span>
            </div>

            {/* تاريخ الإصدار */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-500">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span>تاريخ الإصدار</span>
              </div>
              <span className="font-semibold text-slate-800 font-mono">
                {formData.licenseIssueDate}
              </span>
            </div>

            {/* تاريخ الانتهاء */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-500">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span>تاريخ الانتهاء</span>
              </div>
              <span className="font-semibold text-emerald-600 font-mono">
                {formData.licenseExpiryDate}
              </span>
            </div>

            {/* فئة الرخصة */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-500">
                <Car className="w-4 h-4 text-blue-600" />
                <span>فئة الرخصة</span>
              </div>
              <span className="font-bold text-slate-800">
                {formData.licenseCategory}
              </span>
            </div>
          </div>
        </div>

        {/* Save Button Matching Page 12 */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-3.5 bg-[#1b6eed] hover:bg-blue-700 active:scale-98 text-white font-extrabold text-sm rounded-xl shadow-md transition-all"
          >
            حفظ التعديلات
          </button>
        </div>
      </form>
    </div>
  );
};
