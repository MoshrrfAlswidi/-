import React, { useState } from 'react';
import {
  ArrowRight,
  Plus,
  CreditCard,
  Wallet,
  Building2,
  CheckCircle2,
  X,
  ShieldCheck,
} from 'lucide-react';
import { PaymentMethodItem, ScreenType, PaymentCategory } from '../types/traffic';

interface PaymentMethodsScreenProps {
  methods: PaymentMethodItem[];
  onNavigate: (screen: ScreenType) => void;
  onSetDefault: (id: string) => void;
  onAddMethod: (item: PaymentMethodItem) => void;
}

export const PaymentMethodsScreen: React.FC<PaymentMethodsScreenProps> = ({
  methods,
  onNavigate,
  onSetDefault,
  onAddMethod,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);

  // Add method form
  const [category, setCategory] = useState<PaymentCategory>('card');
  const [methodName, setMethodName] = useState('VISA');
  const [accountNumber, setAccountNumber] = useState('');
  const [expiryOrDetails, setExpiryOrDetails] = useState('');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMethod: PaymentMethodItem = {
      id: `pm-${Date.now()}`,
      category,
      name: methodName,
      accountOrNumber: accountNumber || '**** **** **** 1234',
      expiryOrStatus: expiryOrDetails || 'مفعلة',
      isDefault: false,
      isActive: true,
      iconType:
        category === 'card'
          ? methodName.toLowerCase().includes('master')
            ? 'mastercard'
            : 'visa'
          : category === 'wallet'
          ? methodName.includes('كريمي')
            ? 'kuraimi'
            : 'wallet'
          : 'bank',
    };
    onAddMethod(newMethod);
    setShowAddModal(false);
    setAccountNumber('');
    setExpiryOrDetails('');
  };

  const renderIcon = (type: string) => {
    switch (type) {
      case 'visa':
        return (
          <div className="w-10 h-7 bg-blue-900 rounded-md flex items-center justify-center text-white font-black italic text-[11px] tracking-wider px-1">
            VISA
          </div>
        );
      case 'mastercard':
        return (
          <div className="w-10 h-7 bg-slate-900 rounded-md flex items-center justify-center relative overflow-hidden">
            <span className="w-4 h-4 rounded-full bg-red-500 opacity-90 inline-block -mr-1" />
            <span className="w-4 h-4 rounded-full bg-amber-400 opacity-90 inline-block -ml-1" />
          </div>
        );
      case 'kuraimi':
        return (
          <div className="w-10 h-7 bg-blue-700 rounded-md flex items-center justify-center text-white text-xs font-bold">
            <Building2 className="w-4 h-4" />
          </div>
        );
      case 'wallet':
        return (
          <div className="w-10 h-7 bg-purple-600 rounded-md flex items-center justify-center text-white">
            <Wallet className="w-4 h-4" />
          </div>
        );
      case 'bank':
      default:
        return (
          <div className="w-10 h-7 bg-emerald-700 rounded-md flex items-center justify-center text-white">
            <Building2 className="w-4 h-4" />
          </div>
        );
    }
  };

  const cardMethods = methods.filter((m) => m.category === 'card');
  const walletMethods = methods.filter((m) => m.category === 'wallet');
  const bankMethods = methods.filter((m) => m.category === 'bank');

  return (
    <div className="pb-24 animate-fadeIn">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-3.5 sticky top-0 z-20 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('profile')}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
            aria-label="رجوع"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
          <h1 className="text-base font-extrabold text-slate-800">طرق الدفع</h1>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>إضافة</span>
        </button>
      </div>

      <div className="px-4 py-4 space-y-5">
        {/* Section 1: البطاقات البنكية Matching Page 14 */}
        <div>
          <h2 className="text-xs font-extrabold text-slate-700 mb-2 px-1">
            البطاقات البنكية
          </h2>
          <div className="space-y-2.5">
            {cardMethods.map((m) => (
              <div
                key={m.id}
                onClick={() => onSetDefault(m.id)}
                className={`bg-white rounded-2xl p-4 border transition-all cursor-pointer flex items-center justify-between shadow-xs ${
                  m.isDefault
                    ? 'border-blue-600 ring-1 ring-blue-500 bg-blue-50/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Left/Right content */}
                <div className="flex items-center gap-3">
                  {renderIcon(m.iconType)}
                  <div>
                    <span className="font-mono text-xs font-bold text-slate-800 tracking-wider block">
                      {m.accountOrNumber}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {m.expiryOrStatus}
                    </span>
                  </div>
                </div>

                {/* Radio selection circle */}
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    m.isDefault ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                  }`}
                >
                  {m.isDefault && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: المحافظ الإلكترونية Matching Page 14 */}
        <div>
          <h2 className="text-xs font-extrabold text-slate-700 mb-2 px-1">
            المحافظ الإلكترونية
          </h2>
          <div className="space-y-2.5">
            {walletMethods.map((m) => (
              <div
                key={m.id}
                onClick={() => onSetDefault(m.id)}
                className={`bg-white rounded-2xl p-4 border transition-all cursor-pointer flex items-center justify-between shadow-xs ${
                  m.isDefault
                    ? 'border-blue-600 ring-1 ring-blue-500 bg-blue-50/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  {renderIcon(m.iconType)}
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">
                      {m.name}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {m.accountOrNumber}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-bold block">
                      {m.expiryOrStatus}
                    </span>
                  </div>
                </div>

                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    m.isDefault ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                  }`}
                >
                  {m.isDefault && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: الحسابات البنكية Matching Page 14 */}
        <div>
          <h2 className="text-xs font-extrabold text-slate-700 mb-2 px-1">
            الحسابات البنكية
          </h2>
          <div className="space-y-2.5">
            {bankMethods.map((m) => (
              <div
                key={m.id}
                onClick={() => onSetDefault(m.id)}
                className={`bg-white rounded-2xl p-4 border transition-all cursor-pointer flex items-center justify-between shadow-xs ${
                  m.isDefault
                    ? 'border-blue-600 ring-1 ring-blue-500 bg-blue-50/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  {renderIcon(m.iconType)}
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">
                      {m.name}
                    </span>
                    <span className="font-mono text-xs text-slate-600 tracking-wider">
                      {m.accountOrNumber}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium block">
                      {m.expiryOrStatus}
                    </span>
                  </div>
                </div>

                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    m.isDefault ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                  }`}
                >
                  {m.isDefault && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Button Matching Page 14 */}
        <div className="pt-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="w-full py-3.5 bg-[#1b6eed] hover:bg-blue-700 active:scale-98 text-white font-extrabold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-all"
          >
            <Plus className="w-5 h-5 stroke-[2.5]" />
            <span>إضافة طريقة دفع جديدة</span>
          </button>
        </div>

        {/* Security badge */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-1">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>جميع المعاملات المالية مشفرة وآمنة وفق معايير البنك المركزي</span>
        </div>
      </div>

      {/* Add Payment Method Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex justify-center items-end sm:items-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl animate-slideUp">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-sm text-slate-800">
                إضافة وسيلة دفع جديدة
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3.5 pt-4 text-xs">
              <div>
                <label className="block text-slate-600 font-bold mb-1">
                  نوع وسيلة الدفع
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setCategory('card');
                      setMethodName('بطاقة بنكية');
                    }}
                    className={`py-2 rounded-xl font-bold border ${
                      category === 'card'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}
                  >
                    بطاقة بنكية
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCategory('wallet');
                      setMethodName('محفظة فلوس');
                    }}
                    className={`py-2 rounded-xl font-bold border ${
                      category === 'wallet'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}
                  >
                    محفظة إلكترونية
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCategory('bank');
                      setMethodName('حساب بنكي');
                    }}
                    className={`py-2 rounded-xl font-bold border ${
                      category === 'bank'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}
                  >
                    حساب بنكي
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">
                  اسم المزود / البنك
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثلاً: VISA، محفظة جوالي، بنك التضامن..."
                  value={methodName}
                  onChange={(e) => setMethodName(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">
                  رقم البطاقة / الحساب / الهاتف
                </label>
                <input
                  type="text"
                  required
                  placeholder="**** **** **** 1234 أو رقم الهاتف"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">
                  تاريخ الانتهاء أو الحالة
                </label>
                <input
                  type="text"
                  placeholder="مثال: تنتهي في 12/28 أو مفعلة"
                  value={expiryOrDetails}
                  onChange={(e) => setExpiryOrDetails(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#1b6eed] hover:bg-blue-700 text-white font-extrabold rounded-xl shadow-md transition-all active:scale-98"
                >
                  تأكيد الإضافة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
