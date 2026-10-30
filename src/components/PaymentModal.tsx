import React, { useState } from 'react';
import {
  X,
  CreditCard,
  CheckCircle2,
  ShieldCheck,
  Printer,
  Share2,
  Building2,
  Wallet,
  Receipt,
} from 'lucide-react';
import { Violation, PaymentMethodItem } from '../types/traffic';

interface PaymentModalProps {
  violation: Violation | null;
  paymentMethods: PaymentMethodItem[];
  onClose: () => void;
  onConfirmPayment: (violationId: string, methodUsed: string) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  violation,
  paymentMethods,
  onClose,
  onConfirmPayment,
}) => {
  if (!violation) return null;

  const [selectedMethodId, setSelectedMethodId] = useState<string>(
    paymentMethods[0]?.id || ''
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaidSuccess, setIsPaidSuccess] = useState(false);
  const [receiptNumber, setReceiptNumber] = useState('');

  const selectedMethod = paymentMethods.find((m) => m.id === selectedMethodId);

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaidSuccess(true);
      const generatedReceipt = `REC-2026-${Math.floor(100000 + Math.random() * 900000)}`;
      setReceiptNumber(generatedReceipt);
      onConfirmPayment(
        violation.id,
        selectedMethod?.name || 'البطاقة البنكية'
      );
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex justify-center items-end sm:items-center p-0 sm:p-4">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-slideUp">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-800">
                {isPaidSuccess ? 'إيصال سداد المخالفة' : 'سداد المخالفة المرورية'}
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                {violation.code}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          {!isPaidSuccess ? (
            <div className="space-y-4">
              {/* Fine Summary Box */}
              <div className="bg-gradient-to-r from-blue-600 to-[#1b50ba] text-white rounded-2xl p-4 shadow-sm text-center">
                <span className="text-xs text-blue-100 block mb-1">
                  المبلغ الإجمالي المستحق
                </span>
                <span className="text-2xl font-black font-mono">
                  {violation.amount.toLocaleString()} ريال يمني
                </span>
                <div className="mt-2 text-[11px] text-blue-200">
                  {violation.type} - {violation.plateNumber}
                </div>
              </div>

              {/* Select Payment Method */}
              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-2">
                  اختر وسيلة الدفع
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {paymentMethods.map((m) => (
                    <div
                      key={m.id}
                      onClick={() => setSelectedMethodId(m.id)}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        selectedMethodId === m.id
                          ? 'border-blue-600 bg-blue-50/40 ring-1 ring-blue-500'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 text-xs font-bold">
                          {m.category === 'wallet' ? (
                            <Wallet className="w-4 h-4 text-purple-600" />
                          ) : m.category === 'bank' ? (
                            <Building2 className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <CreditCard className="w-4 h-4 text-blue-600" />
                          )}
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-bold text-slate-800 block">
                            {m.name}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {m.accountOrNumber}
                          </span>
                        </div>
                      </div>

                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          selectedMethodId === m.id
                            ? 'border-blue-600 bg-blue-600'
                            : 'border-slate-300'
                        }`}
                      >
                        {selectedMethodId === m.id && (
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security Note */}
              <div className="flex items-center gap-2 text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>خصم فوري وتحديث مباشر لسجلات إدارة شرطة المرور</span>
              </div>

              {/* Pay Button */}
              <button
                disabled={isProcessing}
                onClick={handlePay}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-extrabold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>جاري معالجة السداد...</span>
                  </div>
                ) : (
                  <span>
                    تأكيد دفع {violation.amount.toLocaleString()} ريال
                  </span>
                )}
              </button>
            </div>
          ) : (
            /* Official Payment Receipt */
            <div className="space-y-4 animate-fadeIn text-center">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h4 className="text-lg font-black text-slate-800">
                تم السداد بنجاح!
              </h4>
              <p className="text-xs text-slate-500">
                تم تسوية المخالفة في النظام المركزي للمرور ورفع القيد عن المركبة.
              </p>

              {/* Receipt Ticket Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs space-y-2.5 text-right relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">رقم الإيصال:</span>
                  <span className="font-mono font-bold text-slate-800">
                    #{receiptNumber}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">رقم المخالفة:</span>
                  <span className="font-mono font-bold text-slate-800">
                    {violation.code}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">المبلغ المدفوع:</span>
                  <span className="font-bold text-emerald-600">
                    {violation.amount.toLocaleString()} ريال
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">طريقة الدفع:</span>
                  <span className="font-bold text-slate-800">
                    {selectedMethod?.name || 'بطاقة بنكية'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">تاريخ المعاملة:</span>
                  <span className="font-mono text-slate-800">
                    {new Date().toLocaleDateString('ar-YE')}
                  </span>
                </div>

                {/* Stamp */}
                <div className="mt-2 py-1 bg-emerald-500 text-white font-extrabold text-[11px] rounded-lg text-center tracking-wider">
                  خالص ومعتمد إلكترونياً
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
                >
                  <Printer className="w-4 h-4" />
                  <span>طباعة</span>
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl"
                >
                  تم
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
