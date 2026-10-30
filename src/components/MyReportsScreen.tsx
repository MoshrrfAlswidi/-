import React, { useState } from 'react';
import {
  ArrowRight,
  Car,
  AlertTriangle,
  Construction,
  MoreHorizontal,
  Clock,
  CheckCircle2,
  XCircle,
  MapPin,
  Calendar,
  ChevronLeft,
  X,
  PhoneCall,
  Plus,
} from 'lucide-react';
import { IncidentReport, ReportStatus, ScreenType } from '../types/traffic';

interface MyReportsScreenProps {
  reports: IncidentReport[];
  onNavigate: (screen: ScreenType) => void;
}

export const MyReportsScreen: React.FC<MyReportsScreenProps> = ({
  reports,
  onNavigate,
}) => {
  const [filter, setFilter] = useState<'all' | ReportStatus>('all');
  const [selectedReport, setSelectedReport] = useState<IncidentReport | null>(null);

  const filteredReports = reports.filter((r) => {
    if (filter === 'all') return true;
    return r.status === filter;
  });

  const getStatusBadge = (status: ReportStatus) => {
    switch (status) {
      case 'قيد المعالجة':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
            <Clock className="w-3 h-3 text-amber-500" />
            <span>قيد المعالجة</span>
          </span>
        );
      case 'تم الحل':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>تم الحل</span>
          </span>
        );
      case 'مرفوض':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200 flex items-center gap-1">
            <XCircle className="w-3 h-3 text-red-600" />
            <span>مرفوض</span>
          </span>
        );
    }
  };

  const getCategoryIcon = (type: string) => {
    switch (type) {
      case 'حادث مروري':
        return <Car className="w-5 h-5 text-red-600" />;
      case 'ازدحام مروري':
      case 'إزدحام مروري':
        return <AlertTriangle className="w-5 h-5 text-amber-600" />;
      case 'طريق مغلق':
        return <Construction className="w-5 h-5 text-purple-600" />;
      default:
        return <MoreHorizontal className="w-5 h-5 text-blue-600" />;
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
            <h1 className="text-xl font-extrabold text-slate-900">بلاغاتي</h1>
          </div>
          <button
            onClick={() => onNavigate('report_wizard')}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>بلاغ جديد</span>
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            الكل ({reports.length})
          </button>
          <button
            onClick={() => setFilter('قيد المعالجة')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
              filter === 'قيد المعالجة'
                ? 'bg-amber-500 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            قيد المعالجة
          </button>
          <button
            onClick={() => setFilter('تم الحل')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
              filter === 'تم الحل'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            تم الحل
          </button>
          <button
            onClick={() => setFilter('مرفوض')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
              filter === 'مرفوض'
                ? 'bg-red-500 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            مرفوض
          </button>
        </div>
      </div>

      {/* Reports List matching Page 10 */}
      <div className="px-4 py-4 space-y-3.5">
        {filteredReports.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6">
            <p className="text-slate-600 font-bold text-sm">لا توجد بلاغات مسجلة</p>
            <p className="text-xs text-slate-400 mt-1">
              يمكنك إرسال بلاغ عن أي حادث أو ازدحام أو طريق مغلق عبر زر (+) بالأسفل.
            </p>
          </div>
        ) : (
          filteredReports.map((report) => (
            <div
              key={report.id}
              onClick={() => setSelectedReport(report)}
              className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs hover:shadow-md transition-all cursor-pointer relative"
            >
              {/* Top Row: Report Number & Status Badge */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-blue-600 font-mono tracking-wider">
                  #{report.code}
                </span>
                {getStatusBadge(report.status)}
              </div>

              {/* Middle Row: Incident Type, Location, Date & Icon */}
              <div className="mt-3 flex items-start justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-800">
                    {report.type}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{report.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-1 font-mono">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>{report.dateTime.split(' - ')[0]}</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                  {getCategoryIcon(report.type)}
                </div>
              </div>

              {/* View Timeline Hint */}
              <div className="mt-3 pt-2 border-t border-slate-50 flex items-center justify-between text-[11px] text-blue-600 font-bold">
                <span>متابعة حالة المعالجة ومسار الدورية</span>
                <ChevronLeft className="w-4 h-4" />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Report Details & Tracking Timeline Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex justify-center items-end sm:items-center p-0 sm:p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-md max-h-[90vh] rounded-t-3xl sm:rounded-3xl flex flex-col shadow-2xl overflow-hidden animate-slideUp">
            {/* Modal Header */}
            <div className="px-4 py-4 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                  {getCategoryIcon(selectedReport.type)}
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-800">
                    متابعة البلاغ #{selectedReport.code}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {selectedReport.dateTime}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedReport(null)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scroll Content */}
            <div className="p-4 overflow-y-auto space-y-4">
              {/* Status Header Pill */}
              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <span className="text-xs font-bold text-slate-600">حالة البلاغ الحالية:</span>
                {getStatusBadge(selectedReport.status)}
              </div>

              {/* Report Information Card */}
              <div className="space-y-2 text-xs text-slate-700 bg-white border border-slate-200 rounded-2xl p-3.5">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span className="font-bold">الموقع:</span>
                  <span>{selectedReport.location}</span>
                </div>
                <div className="pt-2 border-t border-slate-100">
                  <span className="font-bold block mb-1">تفاصيل البلاغ المسجلة:</span>
                  <p className="text-slate-600 bg-slate-50 p-2.5 rounded-xl leading-relaxed">
                    {selectedReport.description}
                  </p>
                </div>

                {selectedReport.images.length > 0 && (
                  <div className="pt-2">
                    <span className="font-bold block mb-1.5">الصور المرفقة:</span>
                    <div className="flex gap-2 overflow-x-auto pb-1">
                      {selectedReport.images.map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt="مرفق"
                          className="w-20 h-20 rounded-xl object-cover border border-slate-200"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Progress Timeline */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4">
                <h4 className="font-extrabold text-xs text-slate-800 mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>خطوات معالجة البلاغ</span>
                </h4>

                <div className="relative pr-6 space-y-4 before:absolute before:right-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  {selectedReport.statusTimeline.map((stepItem, idx) => (
                    <div key={idx} className="relative">
                      {/* Step Dot */}
                      <div
                        className={`absolute -right-6 top-0.5 w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center ${
                          stepItem.completed
                            ? 'border-emerald-500 bg-emerald-500 text-white'
                            : stepItem.current
                            ? 'border-blue-600 ring-4 ring-blue-100 animate-pulse'
                            : 'border-slate-300'
                        }`}
                      >
                        {stepItem.completed && (
                          <div className="w-1.5 h-1.5 bg-white rounded-full" />
                        )}
                      </div>

                      <div className="text-right">
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-xs font-bold ${
                              stepItem.completed
                                ? 'text-slate-800'
                                : stepItem.current
                                ? 'text-blue-600'
                                : 'text-slate-400'
                            }`}
                          >
                            {stepItem.title}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {stepItem.time}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {stepItem.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emergency Contact Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-blue-800">
                  <PhoneCall className="w-4 h-4 text-blue-600" />
                  <span>للتواصل المباشر مع غرفة العمليات</span>
                </div>
                <a
                  href="tel:194"
                  className="px-3 py-1 bg-blue-600 text-white font-bold rounded-lg text-[11px]"
                >
                  اتصال 194
                </a>
              </div>
            </div>

            {/* Modal Bottom Bar */}
            <div className="p-3 border-t border-slate-200 bg-slate-50">
              <button
                onClick={() => setSelectedReport(null)}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition-colors"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
