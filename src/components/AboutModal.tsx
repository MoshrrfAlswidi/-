import React from 'react';
import { X, Shield, Cpu, Users, Award, ExternalLink, CheckCircle } from 'lucide-react';
import { TrafficEmblem } from './TrafficEmblem';

interface AboutModalProps {
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex justify-center items-end sm:items-center p-0 sm:p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-md max-h-[92vh] rounded-t-3xl sm:rounded-3xl flex flex-col shadow-2xl overflow-hidden animate-slideUp">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <h3 className="font-extrabold text-base text-slate-800">
            عن تطبيق المرور جوال
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-5 text-right">
          {/* Top Banner */}
          <div className="bg-gradient-to-b from-[#12243d] to-[#1c3a63] text-white rounded-2xl p-5 text-center relative overflow-hidden">
            <div className="flex justify-center mb-3">
              <div className="p-2 bg-white rounded-full shadow-lg">
                <TrafficEmblem size={75} />
              </div>
            </div>
            <h4 className="text-base font-black">
              SMART TRAFFIC SYSTEM
            </h4>
            <div className="text-xs text-blue-300 font-mono mt-1">
              AI • IoT • DATA • AUTOMATION
            </div>
            <p className="text-xs text-slate-200 mt-2 font-medium">
              مشروع هندسة البرمجيات - منظومة المرور الذكية المتكاملة
            </p>
          </div>

          {/* Engineers Credits from Page 1 */}
          <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-blue-100">
              <Users className="w-4 h-4 text-blue-600" />
              <h5 className="font-black text-xs text-blue-900">
                عمل وتطوير المهندسين:
              </h5>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-blue-100 shadow-xs">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                  م.م
                </div>
                <div>
                  <div className="font-extrabold text-slate-800">
                    م. مشرف عبد المجيد مسعد السويدي
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Software Engineer • Lead Developer
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-blue-100 shadow-xs">
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                  م.ق
                </div>
                <div>
                  <div className="font-extrabold text-slate-800">
                    م. قصي مهيوب حمود الحميدي
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Software Engineer • Lead Developer
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* System Integration Vision from Page 1 */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs space-y-2">
            <h5 className="font-black text-slate-800 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-purple-600" />
              <span>رؤية التكامل الثلاثي للمنظومة</span>
            </h5>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              هذه النسخة هي واجهات السائق، وسيتم تطوير تطبيق خاص بـ
              <strong> شرطي المرور</strong> وتطبيق خاص بـ
              <strong> إدارة شرطة المرور</strong>، وسيتم الربط والتكامل التام بين
              التطبيقات الثلاثة ليعملوا كنظام موحد فوري.
            </p>
          </div>

          {/* Goals from Page 2 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 text-xs space-y-2.5">
            <h5 className="font-black text-slate-800 flex items-center gap-1.5 mb-2">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>أهداف التطبيق</span>
            </h5>

            {[
              'تحسين السلامة المرورية والحد من الحوادث.',
              'تقليل زمن الاستجابة للحوادث المرورية.',
              'إشراك المواطنين في الإبلاغ عن المشاكل المرورية.',
              'تسهيل الاستعلام عن المخالفات ودفعها إلكترونياً.',
              'إرسال التنبيهات والإشعارات المرورية بشكل فوري.',
              'متابعة حالة البلاغات حتى يتم معالجتها وإغلاقها.',
            ].map((goal, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 text-[11px] leading-snug">{goal}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50">
          <button
            onClick={onClose}
            className="w-full py-3 bg-[#1b6eed] hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all active:scale-98"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
