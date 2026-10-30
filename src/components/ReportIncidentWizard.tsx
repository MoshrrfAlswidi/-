import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  Car,
  AlertTriangle,
  Construction,
  MoreHorizontal,
  Navigation,
  MapPin,
  Camera,
  Image as ImageIcon,
  Clock,
  FileText,
  CheckCircle2,
  X,
  Upload,
} from 'lucide-react';
import { IncidentReport, ReportCategory, ScreenType } from '../types/traffic';

interface ReportIncidentWizardProps {
  onNavigate: (screen: ScreenType) => void;
  onSubmitReport: (newReport: IncidentReport) => void;
}

export const ReportIncidentWizard: React.FC<ReportIncidentWizardProps> = ({
  onNavigate,
  onSubmitReport,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [category, setCategory] = useState<ReportCategory>('حادث مروري');
  const [customCategory, setCustomCategory] = useState('');
  const [locationName, setLocationName] = useState('شارع الثلاثين، تعز');
  const [coordinates, setCoordinates] = useState({ lat: 13.5795, lng: 44.0209 });
  const [description, setDescription] = useState('اصطدام بين سيارتين بالقرب من التقاطع مع تعطل طفيف للمسار الأيمن');
  const [incidentTime, setIncidentTime] = useState('مايو 2026 - 08:30 ص');
  const [images, setImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=400&q=80',
  ]);
  const [agreed, setAgreed] = useState(true);
  const [isSuccessSubmitted, setIsSuccessSubmitted] = useState(false);
  const [submittedReportId, setSubmittedReportId] = useState('');

  // Sample quick images that user can simulate attaching
  const sampleIncidentImages = [
    'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=400&q=80',
  ];

  const handleUseGPS = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoordinates({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
          setLocationName('شارع جمال - الموقع الحالي (GPS)');
        },
        () => {
          setLocationName('شارع الثلاثين - الموقع الحالي التقريبي');
        }
      );
    } else {
      setLocationName('شارع الثلاثين - الموقع الحالي التقريبي');
    }
  };

  const handleSimulateCameraCapture = () => {
    const nextImg =
      sampleIncidentImages[images.length % sampleIncidentImages.length] ||
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=400&q=80';
    setImages((prev) => [...prev, nextImg]);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setImages((prev) => [...prev, uploadEvent.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFinalSubmit = () => {
    const reportCode = `RPT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newReport: IncidentReport = {
      id: `rpt-${Date.now()}`,
      code: reportCode,
      type: category,
      customType: category === 'أخرى' ? customCategory : undefined,
      location: locationName,
      coordinates,
      description,
      dateTime: incidentTime,
      images,
      status: 'قيد المعالجة',
      statusTimeline: [
        {
          title: 'استلام البلاغ',
          description: 'تم تسجيل البلاغ في العمليات المرورية المركزية',
          time: 'الآن',
          completed: true,
          current: true,
        },
        {
          title: 'توجيه دورية المرور',
          description: 'جاري تخصيص أقرب دورية مرورية للموقع',
          time: 'قيد الإجراء',
          completed: false,
        },
        {
          title: 'المعاينة في الموقع',
          description: 'إزالة العوائق والتعامل الميداني',
          time: '---',
          completed: false,
        },
        {
          title: 'تم الحل وإغلاق البلاغ',
          description: 'عودة الحركة لطبيعتها بالكامل',
          time: '---',
          completed: false,
        },
      ],
    };

    setSubmittedReportId(reportCode);
    onSubmitReport(newReport);
    setIsSuccessSubmitted(true);
  };

  // Success Confirmation Dialog
  if (isSuccessSubmitted) {
    return (
      <div className="pb-24 px-4 pt-12 animate-fadeIn text-center">
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xl max-w-sm mx-auto">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-800">
            تم إرسال البلاغ بنجاح!
          </h2>
          <p className="text-xs text-slate-500 mt-2">
            تم تحويل البلاغ إلى غرفة القيادة والتحكم بإدارة المرور وسيتم توجيه أقرب دورية.
          </p>

          <div className="my-5 bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
            <span className="text-xs text-slate-400 font-bold block mb-1">
              رقم البلاغ للمتابعة
            </span>
            <span className="text-xl font-black text-blue-600 font-mono tracking-wider">
              #{submittedReportId}
            </span>
          </div>

          <div className="space-y-2.5">
            <button
              onClick={() => onNavigate('my_reports')}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:scale-98 text-white text-xs font-extrabold rounded-xl shadow-md transition-all"
            >
              متابعة البلاغ في قائمة بلاغاتي
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
            >
              العودة للرئيسية
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-24 animate-fadeIn">
      {/* Top Bar with Step Arrows */}
      <div className="bg-white border-b border-slate-200 px-4 py-3.5 sticky top-0 z-20 shadow-xs">
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              if (step > 1) setStep((prev) => (prev - 1) as 1 | 2 | 3 | 4);
              else onNavigate('home');
            }}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
            aria-label="السابق"
          >
            <ArrowRight className="w-5 h-5" />
          </button>

          <h1 className="text-base font-extrabold text-slate-800">إرسال بلاغ</h1>

          <button
            onClick={() => {
              if (step < 4) setStep((prev) => (prev + 1) as 1 | 2 | 3 | 4);
            }}
            disabled={step === 4}
            className={`p-1.5 rounded-full transition-colors ${
              step === 4
                ? 'opacity-20 cursor-not-allowed text-slate-400'
                : 'hover:bg-slate-100 text-slate-600'
            }`}
            aria-label="التالي"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>

        {/* 4-Step Indicator Bar Matching Pages 6, 7, 8, 9 */}
        <div className="flex items-center justify-between mt-4 px-3 relative">
          {/* Background Connector Line */}
          <div className="absolute left-6 right-6 top-4 h-0.5 bg-slate-200 -z-0" />
          <div
            className="absolute right-6 top-4 h-0.5 bg-blue-600 -z-0 transition-all duration-300"
            style={{ width: `${((step - 1) / 3) * 85}%` }}
          />

          {/* Step 1 */}
          <div
            onClick={() => setStep(1)}
            className="flex flex-col items-center relative z-10 cursor-pointer"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                step >= 1
                  ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                  : 'bg-white border-2 border-slate-300 text-slate-400'
              }`}
            >
              1
            </div>
            <span
              className={`text-[10px] mt-1.5 font-bold ${
                step === 1 ? 'text-blue-600' : 'text-slate-400'
              }`}
            >
              النوع
            </span>
          </div>

          {/* Step 2 */}
          <div
            onClick={() => setStep(2)}
            className="flex flex-col items-center relative z-10 cursor-pointer"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                step >= 2
                  ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                  : 'bg-white border-2 border-slate-300 text-slate-400'
              }`}
            >
              2
            </div>
            <span
              className={`text-[10px] mt-1.5 font-bold ${
                step === 2 ? 'text-blue-600' : 'text-slate-400'
              }`}
            >
              الموقع
            </span>
          </div>

          {/* Step 3 */}
          <div
            onClick={() => setStep(3)}
            className="flex flex-col items-center relative z-10 cursor-pointer"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                step >= 3
                  ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                  : 'bg-white border-2 border-slate-300 text-slate-400'
              }`}
            >
              3
            </div>
            <span
              className={`text-[10px] mt-1.5 font-bold ${
                step === 3 ? 'text-blue-600' : 'text-slate-400'
              }`}
            >
              التفاصيل
            </span>
          </div>

          {/* Step 4 */}
          <div
            onClick={() => setStep(4)}
            className="flex flex-col items-center relative z-10 cursor-pointer"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                step >= 4
                  ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                  : 'bg-white border-2 border-slate-300 text-slate-400'
              }`}
            >
              4
            </div>
            <span
              className={`text-[10px] mt-1.5 font-bold ${
                step === 4 ? 'text-blue-600' : 'text-slate-400'
              }`}
            >
              تأكيد
            </span>
          </div>
        </div>
      </div>

      {/* Main Step Body */}
      <div className="px-4 py-5">
        {/* ================= STEP 1: اختيار نوع البلاغ (Page 6) ================= */}
        {step === 1 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="text-right">
              <h2 className="text-base font-extrabold text-slate-900">
                اختر نوع البلاغ
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                اختر نوع البلاغ الذي تريد إرساله
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {/* Option 1: حادث مروري */}
              <div
                onClick={() => setCategory('حادث مروري')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  category === 'حادث مروري'
                    ? 'border-blue-600 bg-blue-50/40 ring-1 ring-blue-500 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-red-100 text-red-600">
                    <Car className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <span className="font-extrabold text-sm text-slate-800">
                    حادث مروري
                  </span>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    category === 'حادث مروري'
                      ? 'border-blue-600 bg-blue-600'
                      : 'border-slate-300'
                  }`}
                >
                  {category === 'حادث مروري' && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
              </div>

              {/* Option 2: ازدحام مروري */}
              <div
                onClick={() => setCategory('ازدحام مروري')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  category === 'ازدحام مروري'
                    ? 'border-blue-600 bg-blue-50/40 ring-1 ring-blue-500 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-100 text-amber-600">
                    <AlertTriangle className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <span className="font-extrabold text-sm text-slate-800">
                    ازدحام مروري
                  </span>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    category === 'ازدحام مروري'
                      ? 'border-blue-600 bg-blue-600'
                      : 'border-slate-300'
                  }`}
                >
                  {category === 'ازدحام مروري' && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
              </div>

              {/* Option 3: طريق مغلق */}
              <div
                onClick={() => setCategory('طريق مغلق')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  category === 'طريق مغلق'
                    ? 'border-blue-600 bg-blue-50/40 ring-1 ring-blue-500 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-purple-100 text-purple-600">
                    <Construction className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <span className="font-extrabold text-sm text-slate-800">
                    طريق مغلق
                  </span>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    category === 'طريق مغلق'
                      ? 'border-blue-600 bg-blue-600'
                      : 'border-slate-300'
                  }`}
                >
                  {category === 'طريق مغلق' && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
              </div>

              {/* Option 4: أخرى */}
              <div
                onClick={() => setCategory('أخرى')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  category === 'أخرى'
                    ? 'border-blue-600 bg-blue-50/40 ring-1 ring-blue-500 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600">
                    <MoreHorizontal className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <span className="font-extrabold text-sm text-slate-800">
                    أخرى
                  </span>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    category === 'أخرى'
                      ? 'border-blue-600 bg-blue-600'
                      : 'border-slate-300'
                  }`}
                >
                  {category === 'أخرى' && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
              </div>

              {/* Extra input if other selected */}
              {category === 'أخرى' && (
                <div className="pt-2">
                  <input
                    type="text"
                    placeholder="حدد نوع البلاغ (مثل: حادث دهس، عطل إشارة، حفرة خطيرة)..."
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    className="w-full bg-white border border-blue-300 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
            </div>

            <div className="pt-8">
              <button
                onClick={() => setStep(2)}
                className="w-full py-3.5 bg-[#1b6eed] hover:bg-blue-700 text-white font-extrabold text-sm rounded-xl shadow-md transition-all active:scale-98"
              >
                التالي
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 2: تحديد الموقع (Page 7) ================= */}
        {step === 2 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="text-right">
              <h2 className="text-base font-extrabold text-slate-900">
                الخطوة الثانية: تحديد الموقع
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                حدد موقع الحادث على الخريطة أو استخدم موقعك الحالي بدقة
              </p>
            </div>

            {/* Interactive Map Visual Box Matching Page 7 */}
            <div className="relative w-full h-56 bg-slate-200 rounded-2xl overflow-hidden border border-slate-300 shadow-inner group">
              {/* Map Canvas Background Grid */}
              <div
                className="w-full h-full bg-[#e8ecf1] relative"
                style={{
                  backgroundImage:
                    'radial-gradient(#cbd5e1 1.5px, transparent 1.5px), radial-gradient(#cbd5e1 1.5px, #e8ecf1 1.5px)',
                  backgroundSize: '24px 24px',
                  backgroundPosition: '0 0, 12px 12px',
                }}
              >
                {/* Simulated Roads */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-80">
                  <path
                    d="M -10,80 Q 150,110 420,70"
                    stroke="#ffffff"
                    strokeWidth="20"
                    fill="none"
                  />
                  <path
                    d="M -10,80 Q 150,110 420,70"
                    stroke="#f59e0b"
                    strokeWidth="3"
                    strokeDasharray="8 6"
                    fill="none"
                  />
                  <path
                    d="M 180,-10 L 195,260"
                    stroke="#ffffff"
                    strokeWidth="18"
                    fill="none"
                  />
                  <path
                    d="M 180,-10 L 195,260"
                    stroke="#94a3b8"
                    strokeWidth="2"
                    strokeDasharray="6 6"
                    fill="none"
                  />
                  <path
                    d="M 60,240 C 120,160 280,180 340,30"
                    stroke="#ffffff"
                    strokeWidth="14"
                    fill="none"
                  />
                </svg>

                {/* Road Labels */}
                <div className="absolute top-14 right-6 bg-white/90 px-2 py-0.5 rounded text-[10px] font-bold text-slate-600 shadow-xs">
                  طريق المطار
                </div>
                <div className="absolute bottom-12 left-8 bg-white/90 px-2 py-0.5 rounded text-[10px] font-bold text-slate-600 shadow-xs">
                  شارع الثلاثين
                </div>

                {/* Central Target Pin */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full flex flex-col items-center">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-xl ring-4 ring-blue-300/60 animate-bounce">
                    <MapPin className="w-6 h-6 fill-white" />
                  </div>
                  <div className="w-3.5 h-1.5 bg-slate-900/40 rounded-full blur-[1px] mt-1" />
                </div>
              </div>

              {/* Map Info Bar on top */}
              <div className="absolute top-2.5 right-2.5 left-2.5 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-xl shadow-xs border border-slate-200 flex items-center justify-between text-[11px]">
                <span className="font-bold text-slate-700">موقع محدد: {locationName}</span>
                <span className="font-mono text-slate-400 text-[10px]">
                  {coordinates.lat.toFixed(4)}, {coordinates.lng.toFixed(4)}
                </span>
              </div>
            </div>

            {/* GPS Button Matching Page 7 */}
            <div>
              <button
                type="button"
                onClick={handleUseGPS}
                className="w-full py-2.5 bg-white border border-blue-500 hover:bg-blue-50 active:scale-98 text-blue-600 text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all"
              >
                <Navigation className="w-4 h-4 stroke-[2.2]" />
                <span>استخدام موقعي الحالي (GPS)</span>
              </button>
            </div>

            {/* Location Details Field Matching Page 7 */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                تفاصيل الموقع
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="أدخل اسم الشارع أو المنطقة"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl pr-9 pl-4 py-2.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={() => setStep(3)}
                className="w-full py-3.5 bg-[#1b6eed] hover:bg-blue-700 text-white font-extrabold text-sm rounded-xl shadow-md transition-all active:scale-98"
              >
                التالي
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 3: إدخال تفاصيل البلاغ (Page 8) ================= */}
        {step === 3 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="text-right">
              <h2 className="text-base font-extrabold text-slate-900">
                أضف تفاصيل البلاغ
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                يرجى تقديم أكبر قدر ممكن من التفاصيل لمساعدتنا
              </p>
            </div>

            {/* Description Textarea */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                * وصف الحادث
              </label>
              <textarea
                rows={4}
                placeholder="اكتب وصفاً للحادث..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-2xl p-3 text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-400 resize-none shadow-xs"
              />
            </div>

            {/* Photo Attachment Section Matching Page 8 */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                إضافة صور (اختياري)
              </label>

              <div className="grid grid-cols-2 gap-3">
                {/* Box 1: تصوير البلاغ (Camera) */}
                <button
                  type="button"
                  onClick={handleSimulateCameraCapture}
                  className="p-5 bg-blue-50/60 hover:bg-blue-50 border-2 border-dashed border-blue-400 rounded-2xl flex flex-col items-center justify-center gap-2 group transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    <Camera className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-extrabold text-blue-700">
                    تصوير البلاغ
                  </span>
                </button>

                {/* Box 2: إضافة صور (Gallery Upload) */}
                <label className="p-5 bg-slate-50 hover:bg-slate-100 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer group transition-all">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-700">
                    إضافة صور
                  </span>
                </label>
              </div>

              {/* Photos Preview Thumbnails */}
              {images.length > 0 && (
                <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-200 flex-shrink-0 group"
                    >
                      <img
                        src={img}
                        alt="صورة مرفقة"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute top-1 left-1 bg-red-600 text-white p-0.5 rounded-full hover:scale-110"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Incident Time Info */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-600">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>تحديد وقت الحادث (تلقائي):</span>
              </div>
              <span className="font-bold text-slate-800">{incidentTime}</span>
            </div>

            <div className="pt-6">
              <button
                onClick={() => setStep(4)}
                className="w-full py-3.5 bg-[#1b6eed] hover:bg-blue-700 text-white font-extrabold text-sm rounded-xl shadow-md transition-all active:scale-98"
              >
                التالي
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 4: تأكيد البلاغ (Page 9) ================= */}
        {step === 4 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="text-right">
              <h2 className="text-base font-extrabold text-slate-900">
                تأكيد البلاغ
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                يرجى مراجعة المعلومات قبل إرسال البلاغ
              </p>
            </div>

            {/* Review Card Matching Page 9 */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-4 text-xs">
              {/* نوع البلاغ */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-500">
                  <Car className="w-4 h-4 text-red-500" />
                  <span>نوع البلاغ</span>
                </div>
                <span className="font-extrabold text-slate-800">
                  {category === 'أخرى' && customCategory ? customCategory : category}
                </span>
              </div>

              {/* الموقع */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-500">
                  <MapPin className="w-4 h-4 text-amber-500" />
                  <span>الموقع</span>
                </div>
                <span className="font-bold text-slate-800">{locationName}</span>
              </div>

              {/* الوصف */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2 text-slate-500 flex-shrink-0">
                  <FileText className="w-4 h-4 text-purple-600" />
                  <span>الوصف</span>
                </div>
                <span className="font-medium text-slate-800 text-left line-clamp-2">
                  {description}
                </span>
              </div>

              {/* وقت الحادث */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-500">
                  <Clock className="w-4 h-4 text-cyan-600" />
                  <span>وقت الحادث</span>
                </div>
                <span className="font-bold text-slate-800">{incidentTime}</span>
              </div>

              {/* الصور المرفقة */}
              <div className="pt-2 border-t border-slate-100">
                <span className="block text-slate-500 font-bold mb-2">
                  الصور المرفقة ({images.length})
                </span>
                {images.length > 0 ? (
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt="صورة البلاغ"
                        className="w-16 h-16 rounded-xl object-cover border border-slate-200"
                      />
                    ))}
                  </div>
                ) : (
                  <span className="text-slate-400 italic text-[11px]">
                    لم يتم إرفاق صور
                  </span>
                )}
              </div>
            </div>

            {/* Declaration Checkbox */}
            <label className="flex items-start gap-2.5 p-3 bg-blue-50/60 rounded-xl border border-blue-100 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
              />
              <span className="text-[11px] text-slate-700 leading-snug">
                أقر بصحة هذه المعلومات وأتحمل المسؤولية، وأعلم أن البلاغات الكاذبة تعرض للمساءلة القانونية.
              </span>
            </label>

            <div className="pt-4">
              <button
                disabled={!agreed}
                onClick={handleFinalSubmit}
                className={`w-full py-3.5 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all active:scale-98 ${
                  agreed
                    ? 'bg-[#1b6eed] hover:bg-blue-700 shadow-blue-500/30'
                    : 'bg-slate-300 cursor-not-allowed shadow-none'
                }`}
              >
                إرسال البلاغ
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
