import React from 'react';
import {
  ArrowRight,
  Share2,
  Calendar,
  MapPin,
  CreditCard,
  ShieldAlert,
  FileText,
  Camera,
  Gauge,
  CheckCircle2,
  Clock,
  Printer,
} from 'lucide-react';
import { Violation } from '../types/traffic';

interface ViolationDetailModalProps {
  violation: Violation | null;
  onClose: () => void;
  onPay: (violation: Violation) => void;
}

export const ViolationDetailModal: React.FC<ViolationDetailModalProps> = ({
  violation,
  onClose,
  onPay,
}) => {
  if (!violation) return null;

  const isUnpaid = violation.status === 'unpaid';

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex justify-center items-end sm:items-center p-0 sm:p-4 overflow-y-auto">
      <div className="bg-[#f8fafc] w-full max-w-md h-[92vh] sm:h-[88vh] rounded-t-3xl sm:rounded-3xl flex flex-col shadow-2xl overflow-hidden animate-slideUp">
        {/* Top Header */}
        <div className="bg-white px-4 py-4 border-b border-slate-200 flex items-center justify-between sticky top-0 z-10">
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
            aria-label="رجوع"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-extrabold text-slate-800">تفاصيل المخالفة</h2>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: `مخالفة مرورية ${violation.code}`,
                  text: `${violation.type} - رقم اللوحة ${violation.plateNumber}`,
                }).catch(() => {});
              }
            }}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
            title="مشاركة تفاصيل المخالفة"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Top Card: Violation Code and Status */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center justify-between">
            <div className="text-right">
              <span className="text-xs text-slate-400 font-medium block">رقم المخالفة</span>
              <span className="text-lg font-black text-slate-800 font-mono tracking-wider">
                {violation.code.replace('VIO-', '2024-')}
              </span>
            </div>
            <div>
              <span
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold ${
                  isUnpaid
                    ? 'bg-red-50 text-red-600 border border-red-200'
                    : 'bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center gap-1'
                }`}
              >
                {!isUnpaid && <CheckCircle2 className="w-3.5 h-3.5" />}
                {isUnpaid ? 'غير مدفوعة' : 'مدفوعة'}
              </span>
            </div>
          </div>

          {/* Main Info Card (معلومات المخالفة) */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100">
              <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-black">
                i
              </div>
              <h3 className="font-extrabold text-sm text-slate-800">معلومات المخالفة</h3>
            </div>

            <div className="space-y-3.5 text-xs">
              {/* نوع المخالفة */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-500">
                  <Gauge className="w-4 h-4 text-blue-600" />
                  <span>نوع المخالفة</span>
                </div>
                <span className="font-bold text-slate-800">{violation.type}</span>
              </div>

              {/* تاريخ ووقت المخالفة */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-500">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>تاريخ ووقت المخالفة</span>
                </div>
                <span className="font-semibold text-slate-800 font-mono">
                  {violation.date} - {violation.time}
                </span>
              </div>

              {/* الموقع */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-500">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span>الموقع</span>
                </div>
                <span className="font-bold text-slate-800">{violation.location}</span>
              </div>

              {/* رقم اللوحة */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-500">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>رقم اللوحة</span>
                </div>
                <span className="font-bold px-2.5 py-0.5 bg-slate-100 border border-slate-300 rounded text-slate-900 tracking-wider">
                  {violation.plateNumber}
                </span>
              </div>

              {/* قيمة الغرامة */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-500">
                  <CreditCard className="w-4 h-4 text-blue-600" />
                  <span>قيمة الغرامة</span>
                </div>
                <span className="font-extrabold text-blue-600 text-sm">
                  {violation.amount.toLocaleString()} ريال
                </span>
              </div>

              {/* النقاط المرورية */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-500">
                  <ShieldAlert className="w-4 h-4 text-blue-600" />
                  <span>النقاط المرورية</span>
                </div>
                <span className="font-bold text-slate-800">
                  {violation.points} {violation.points === 1 ? 'نقطة' : 'نقاط'}
                </span>
              </div>

              {/* الحالة */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-500">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>الحالة</span>
                </div>
                <span
                  className={`font-bold ${
                    isUnpaid ? 'text-red-500' : 'text-emerald-600'
                  }`}
                >
                  {isUnpaid ? 'غير مدفوعة' : 'مدفوعة'}
                </span>
              </div>

              {/* تفاصيل إضافية */}
              <div className="pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2 text-slate-500 mb-1">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>تفاصيل إضافية</span>
                </div>
                <p className="text-slate-700 bg-slate-50 p-2.5 rounded-xl leading-relaxed text-[11px] border border-slate-100">
                  {violation.details}
                </p>
              </div>
            </div>
          </div>

          {/* Card: صور المخالفة (Radar Camera Image) */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2 pb-3 mb-2 border-b border-slate-100">
              <Camera className="w-4 h-4 text-blue-600" />
              <h3 className="font-extrabold text-sm text-slate-800">صور المخالفة</h3>
            </div>

            <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-900 group">
              <img
                src={violation.imageUrl || 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=700&q=80'}
                alt="رصد المخالفة"
                className="w-full h-44 object-cover object-center group-hover:scale-102 transition-transform duration-300"
              />
              {/* Radar HUD overlay */}
              <div className="absolute top-2 right-2 bg-black/75 text-emerald-400 font-mono text-[10px] px-2 py-1 rounded backdrop-blur-xs flex items-center gap-1.5 border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span>RADAR AI CAMERA #04</span>
              </div>
              <div className="absolute bottom-2 left-2 right-2 bg-black/75 text-white p-2 rounded-lg text-[10px] backdrop-blur-xs flex items-center justify-between">
                <span>الموقع: {violation.location}</span>
                <span className="font-mono text-amber-300 font-bold">{violation.time}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sticky Action Bar */}
        <div className="bg-white p-4 border-t border-slate-200 shadow-md">
          {isUnpaid ? (
            <button
              onClick={() => onPay(violation)}
              className="w-full py-3.5 bg-[#1b6eed] hover:bg-blue-700 active:scale-98 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition-all"
            >
              <CreditCard className="w-5 h-5" />
              <span>دفع الآن ({violation.amount.toLocaleString()} ريال)</span>
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => {
                  window.print();
                }}
                className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>طباعة الإيصال</span>
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>تم السداد بالكامل</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
