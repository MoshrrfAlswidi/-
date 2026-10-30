import React, { useState } from 'react';
import {
  ArrowRight,
  Car,
  Plus,
  MoreVertical,
  CheckCircle2,
  AlertCircle,
  X,
  Fuel,
  Palette,
  FileText,
} from 'lucide-react';
import { RegisteredVehicle, ScreenType } from '../types/traffic';

interface RegisteredVehiclesScreenProps {
  vehicles: RegisteredVehicle[];
  onNavigate: (screen: ScreenType) => void;
  onAddVehicle: (vehicle: RegisteredVehicle) => void;
  onDeleteVehicle: (id: string) => void;
}

export const RegisteredVehiclesScreen: React.FC<RegisteredVehiclesScreenProps> = ({
  vehicles,
  onNavigate,
  onAddVehicle,
  onDeleteVehicle,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);

  // New vehicle form state
  const [make, setMake] = useState('كيا');
  const [model, setModel] = useState('سبورتاج');
  const [year, setYear] = useState('2024');
  const [plateNumber, setPlateNumber] = useState('ط ك ل 9900');
  const [color, setColor] = useState('فضي');
  const [fuelType, setFuelType] = useState<'بنزين' | 'ديزل' | 'كهربائي' | 'هجين'>('بنزين');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newVehicle: RegisteredVehicle = {
      id: `veh-${Date.now()}`,
      make,
      model,
      year: parseInt(year, 10) || 2024,
      plateNumber,
      color,
      fuelType,
      status: 'سارية',
      registrationExpiry: '2027/12/31',
      insuranceExpiry: '2027/11/30',
      imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=400&q=80',
    };
    onAddVehicle(newVehicle);
    setShowAddModal(false);
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
            المركبات المسجلة
          </h1>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>إضافة</span>
        </button>
      </div>

      {/* Top Blue Banner Card Matching Page 13 */}
      <div className="px-4 pt-4">
        <div className="bg-gradient-to-r from-blue-600 to-[#1b50ba] text-white rounded-2xl p-4 shadow-md flex items-center justify-between">
          <div className="text-right">
            <span className="text-xs text-blue-100 font-medium block">
              عدد المركبات
            </span>
            <span className="text-2xl font-black text-white">
              {vehicles.length} مركبات
            </span>
          </div>

          <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center border border-white/30">
            <Car className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>

      {/* Vehicles Cards List Matching Page 13 */}
      <div className="px-4 py-4 space-y-4">
        {vehicles.map((vehicle) => {
          const isValid = vehicle.status === 'سارية';

          return (
            <div
              key={vehicle.id}
              className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs relative overflow-hidden"
            >
              {/* Header inside Card: Status Dot and 3 dots menu */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-1.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isValid ? 'bg-emerald-500' : 'bg-red-500'
                    }`}
                  />
                  <span
                    className={`text-xs font-bold ${
                      isValid ? 'text-emerald-600' : 'text-red-500'
                    }`}
                  >
                    {vehicle.status}
                  </span>
                </div>

                <div className="relative">
                  <button
                    onClick={() =>
                      setMenuOpenId(menuOpenId === vehicle.id ? null : vehicle.id)
                    }
                    className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>

                  {/* Dropdown Menu */}
                  {menuOpenId === vehicle.id && (
                    <div className="absolute left-0 top-7 bg-white rounded-xl shadow-lg border border-slate-200 py-1 w-32 z-30 animate-fadeIn">
                      <button
                        onClick={() => {
                          onDeleteVehicle(vehicle.id);
                          setMenuOpenId(null);
                        }}
                        className="w-full text-right px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 font-bold"
                      >
                        حذف المركبة
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Title: Vehicle Make & Model & Year */}
              <div className="text-right mt-2">
                <h3 className="text-base font-extrabold text-slate-800">
                  {vehicle.make} {vehicle.model}
                </h3>
                <span className="text-xs font-mono text-slate-400 font-bold">
                  {vehicle.year}
                </span>
              </div>

              {/* Vehicle Image */}
              <div className="my-2 flex justify-center">
                <img
                  src={vehicle.imageUrl || 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=400&q=80'}
                  alt={`${vehicle.make} ${vehicle.model}`}
                  className="h-28 object-contain drop-shadow-sm hover:scale-105 transition-transform"
                />
              </div>

              {/* Info 3-Columns Grid Matching Page 13 */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center text-xs">
                {/* Column 1: نوع الوقود */}
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">
                    نوع الوقود
                  </span>
                  <span className="font-bold text-slate-700 mt-0.5 block">
                    {vehicle.fuelType}
                  </span>
                </div>

                {/* Column 2: اللون */}
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">
                    اللون
                  </span>
                  <span className="font-bold text-slate-700 mt-0.5 block">
                    {vehicle.color}
                  </span>
                </div>

                {/* Column 3: رقم اللوحة */}
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">
                    رقم اللوحة
                  </span>
                  <span className="font-bold text-slate-900 mt-0.5 block font-mono">
                    {vehicle.plateNumber}
                  </span>
                </div>
              </div>

              {!isValid && (
                <div className="mt-2.5 bg-red-50 text-red-600 p-2 rounded-xl text-[11px] font-bold flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>استمارة المركبة منتهية الصلاحية - يرجى التجديد</span>
                </div>
              )}
            </div>
          );
        })}

        {/* Bottom Button Matching Page 13 */}
        <div className="pt-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="w-full py-3.5 bg-[#1b6eed] hover:bg-blue-700 active:scale-98 text-white font-extrabold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-all"
          >
            <Plus className="w-5 h-5 stroke-[2.5]" />
            <span>إضافة مركبة جديدة</span>
          </button>
        </div>
      </div>

      {/* Add Vehicle Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex justify-center items-end sm:items-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl animate-slideUp">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-sm text-slate-800">
                تسجيل مركبة جديدة
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3 pt-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-bold mb-1">
                    الماركة (Make)
                  </label>
                  <input
                    type="text"
                    required
                    value={make}
                    onChange={(e) => setMake(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-bold mb-1">
                    الموديل (Model)
                  </label>
                  <input
                    type="text"
                    required
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-bold mb-1">
                    سنة الصنع
                  </label>
                  <input
                    type="number"
                    required
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-bold mb-1">
                    رقم اللوحة
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="أ ب ج 1234"
                    value={plateNumber}
                    onChange={(e) => setPlateNumber(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-bold mb-1">
                    اللون
                  </label>
                  <input
                    type="text"
                    required
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-bold mb-1">
                    نوع الوقود
                  </label>
                  <select
                    value={fuelType}
                    onChange={(e) =>
                      setFuelType(e.target.value as 'بنزين' | 'ديزل' | 'كهربائي' | 'هجين')
                    }
                    className="w-full border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="بنزين">بنزين</option>
                    <option value="ديزل">ديزل</option>
                    <option value="كهربائي">كهربائي</option>
                    <option value="هجين">هجين</option>
                  </select>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#1b6eed] hover:bg-blue-700 text-white font-extrabold rounded-xl shadow-md transition-all active:scale-98"
                >
                  حفظ المركبة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
