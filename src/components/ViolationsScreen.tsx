import React, { useState } from 'react';
import { CheckCircle2, ChevronLeft, ArrowRight, Search, CreditCard, AlertCircle } from 'lucide-react';
import { Violation, ScreenType } from '../types/traffic';

interface ViolationsScreenProps {
  violations: Violation[];
  onNavigate: (screen: ScreenType) => void;
  onSelectViolation: (violation: Violation) => void;
  onPayViolation: (violation: Violation) => void;
}

export const ViolationsScreen: React.FC<ViolationsScreenProps> = ({
  violations,
  onNavigate,
  onSelectViolation,
  onPayViolation,
}) => {
  const [filter, setFilter] = useState<'all' | 'unpaid' | 'paid'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredViolations = violations.filter((v) => {
    if (filter === 'unpaid' && v.status !== 'unpaid') return false;
    if (filter === 'paid' && v.status !== 'paid') return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        v.code.toLowerCase().includes(q) ||
        v.type.toLowerCase().includes(q) ||
        v.plateNumber.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const unpaidCount = violations.filter((v) => v.status === 'unpaid').length;
  const unpaidTotal = violations
    .filter((v) => v.status === 'unpaid')
    .reduce((sum, v) => sum + v.amount, 0);

  return (
    <div className="pb-24 animate-fadeIn">
      {/* Top Header */}
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
            <h1 className="text-xl font-extrabold text-slate-900">المخالفات</h1>
          </div>
          <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
            {violations.length} سجلات
          </span>
        </div>

        {/* Search bar */}
        <div className="relative mt-3">
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="ابحث برقم المخالفة أو نوعها أو اللوحة..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-9 pl-3 py-2 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mt-3">
          <button
            onClick={() => setFilter('all')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filter === 'all'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            الكل
          </button>
          <button
            onClick={() => setFilter('unpaid')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all relative ${
              filter === 'unpaid'
                ? 'bg-red-500 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            غير مدفوعة ({unpaidCount})
          </button>
          <button
            onClick={() => setFilter('paid')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filter === 'paid'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            مدفوعة
          </button>
        </div>
      </div>

      {/* Unpaid Warning Banner if any */}
      {unpaidCount > 0 && filter !== 'paid' && (
        <div className="mx-4 mt-3 bg-red-50 border border-red-200 rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <div>
              <div className="text-xs font-bold text-red-800">
                لديك {unpaidCount} مخالفات غير مدفوعة
              </div>
              <div className="text-[11px] text-red-600">
                إجمالي المبالغ المستحقة: {unpaidTotal.toLocaleString()} ريال
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              const firstUnpaid = violations.find((v) => v.status === 'unpaid');
              if (firstUnpaid) onPayViolation(firstUnpaid);
            }}
            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg shadow-xs"
          >
            سداد الآن
          </button>
        </div>
      )}

      {/* Cards List matching Page 4 of PDF */}
      <div className="px-4 py-4 space-y-3.5">
        {filteredViolations.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6">
            <p className="text-slate-600 font-bold text-sm">لا توجد مخالفات مطابقة</p>
            <p className="text-xs text-slate-400 mt-1">
              جميع سجلات المخالفات مسددة أو لا تطابق معايير البحث.
            </p>
          </div>
        ) : (
          filteredViolations.map((violation) => {
            const isUnpaid = violation.status === 'unpaid';

            return (
              <div
                key={violation.id}
                onClick={() => onSelectViolation(violation)}
                className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs hover:shadow-md transition-all cursor-pointer relative"
              >
                {/* Top Row: Status on right/left and Code */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span
                    className={`text-xs font-bold ${
                      isUnpaid ? 'text-red-500' : 'text-emerald-600'
                    }`}
                  >
                    {isUnpaid ? 'غير مدفوعة' : 'مدفوعة'}
                  </span>
                  <span className="text-xs font-mono text-slate-400 tracking-wider">
                    {violation.code}
                  </span>
                </div>

                {/* Middle Row: Violation Type and Date */}
                <div className="mt-3 text-right">
                  <h3 className="text-base font-bold text-slate-800">
                    {violation.type}
                  </h3>
                  <div className="text-xs text-slate-400 font-medium mt-1">
                    {violation.date}
                  </div>
                </div>

                {/* Bottom Row: Amount and Action / Checkmark */}
                <div className="mt-3 pt-2 flex items-center justify-between">
                  {/* Left: Button or Checkmark */}
                  {isUnpaid ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onPayViolation(violation);
                      }}
                      className="px-5 py-2 bg-[#1b6eed] hover:bg-blue-700 active:scale-95 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 transition-all"
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>دفع الآن</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-1.5 text-emerald-600">
                      <CheckCircle2 className="w-5 h-5 fill-emerald-100" />
                      <span className="text-xs font-bold">تم السداد</span>
                    </div>
                  )}

                  {/* Right: Amount */}
                  <div className="text-left">
                    <span className="text-base font-extrabold text-[#1b6eed]">
                      {violation.amount.toLocaleString()} ريال
                    </span>
                  </div>
                </div>

                {/* Tap Hint */}
                <div className="mt-2 text-[10px] text-slate-400 flex items-center justify-end gap-1">
                  <span>اضغط للتفاصيل والصور</span>
                  <ChevronLeft className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
