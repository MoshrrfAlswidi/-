import React, { useState } from 'react';
import {
  ArrowRight,
  MapPin,
  AlertTriangle,
  Construction,
  CheckCircle2,
  Navigation,
  Layers,
  Filter,
  Plus,
} from 'lucide-react';
import { TrafficRoadPoint, ScreenType } from '../types/traffic';
import { TRAFFIC_ROAD_POINTS } from '../data/mockData';

interface RoadsMapScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenReport: () => void;
}

export const RoadsMapScreen: React.FC<RoadsMapScreenProps> = ({
  onNavigate,
  onOpenReport,
}) => {
  const [selectedPoint, setSelectedPoint] = useState<TrafficRoadPoint | null>(
    TRAFFIC_ROAD_POINTS[0]
  );
  const [filter, setFilter] = useState<'all' | 'smooth' | 'heavy' | 'closed'>('all');

  const filteredPoints = TRAFFIC_ROAD_POINTS.filter((p) => {
    if (filter === 'all') return true;
    return p.status === filter;
  });

  return (
    <div className="pb-24 animate-fadeIn">
      {/* Top Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-3.5 sticky top-0 z-20 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('home')}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
            aria-label="رجوع"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
          <h1 className="text-base font-extrabold text-slate-800">
            خريطة حالة الطرق المباشرة
          </h1>
        </div>

        <button
          onClick={onOpenReport}
          className="text-xs font-bold text-white bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-xs transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>إبلاغ عن طريق</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white px-4 py-2 border-b border-slate-100 flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
            filter === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-100 text-slate-600'
          }`}
        >
          كل الطرق ({TRAFFIC_ROAD_POINTS.length})
        </button>
        <button
          onClick={() => setFilter('closed')}
          className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
            filter === 'closed'
              ? 'bg-red-600 text-white'
              : 'bg-slate-100 text-slate-600'
          }`}
        >
          طرق مغلقة (1)
        </button>
        <button
          onClick={() => setFilter('heavy')}
          className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
            filter === 'heavy'
              ? 'bg-amber-600 text-white'
              : 'bg-slate-100 text-slate-600'
          }`}
        >
          ازدحام (2)
        </button>
        <button
          onClick={() => setFilter('smooth')}
          className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
            filter === 'smooth'
              ? 'bg-emerald-600 text-white'
              : 'bg-slate-100 text-slate-600'
          }`}
        >
          طرق سالكة (2)
        </button>
      </div>

      {/* Interactive Map Visual */}
      <div className="relative h-80 bg-slate-200 overflow-hidden border-b border-slate-300">
        <div
          className="w-full h-full bg-[#dfe5eb] relative cursor-grab active:cursor-grabbing"
          style={{
            backgroundImage:
              'radial-gradient(#94a3b8 1.5px, transparent 1.5px), radial-gradient(#94a3b8 1.5px, #dfe5eb 1.5px)',
            backgroundSize: '24px 24px',
            backgroundPosition: '0 0, 12px 12px',
          }}
        >
          {/* Simulated Road Network with Traffic Colors */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Smooth Road (Green) */}
            <path
              d="M 10,70 Q 180,120 420,60"
              stroke="#10b981"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
            />
            {/* Congested Road (Amber) */}
            <path
              d="M 200,-10 L 220,320"
              stroke="#f59e0b"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
            />
            {/* Closed Road (Red dashed) */}
            <path
              d="M 60,300 C 130,210 270,220 360,50"
              stroke="#ef4444"
              strokeWidth="10"
              strokeDasharray="10 6"
              fill="none"
              strokeLinecap="round"
            />
          </svg>

          {/* Interactive Pins */}
          {filteredPoints.map((point) => {
            const isSelected = selectedPoint?.id === point.id;
            const badgeBg =
              point.status === 'closed'
                ? 'bg-red-600 ring-red-300'
                : point.status === 'heavy'
                ? 'bg-amber-500 ring-amber-300'
                : 'bg-emerald-500 ring-emerald-300';

            return (
              <div
                key={point.id}
                onClick={() => setSelectedPoint(point)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 hover:scale-125 transition-transform"
                style={{
                  top: `${point.coordinates.y}%`,
                  left: `${point.coordinates.x}%`,
                }}
              >
                <div
                  className={`w-9 h-9 rounded-full ${badgeBg} text-white flex items-center justify-center shadow-lg ring-4 ${
                    isSelected ? 'ring-blue-600 scale-125 animate-bounce' : ''
                  }`}
                >
                  {point.status === 'closed' ? (
                    <Construction className="w-5 h-5" />
                  ) : point.status === 'heavy' ? (
                    <AlertTriangle className="w-5 h-5" />
                  ) : (
                    <Navigation className="w-5 h-5" />
                  )}
                </div>
                <div className="bg-slate-900/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow mt-1 whitespace-nowrap text-center">
                  {point.name.split(' ')[0]}
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating Map Legend */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs p-2 rounded-xl shadow-md border border-slate-200 text-[10px] space-y-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>حركة سالكة</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span>ازدحام مروري</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <span>طريق مغلق</span>
          </div>
        </div>
      </div>

      {/* Selected Road Details Card */}
      {selectedPoint && (
        <div className="p-4">
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-md">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <h3 className="font-extrabold text-sm text-slate-800">
                  {selectedPoint.name}
                </h3>
              </div>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  selectedPoint.status === 'closed'
                    ? 'bg-red-100 text-red-700'
                    : selectedPoint.status === 'heavy'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-emerald-100 text-emerald-700'
                }`}
              >
                {selectedPoint.statusText}
              </span>
            </div>

            <p className="text-xs text-slate-600 mt-3 leading-relaxed">
              {selectedPoint.details}
            </p>

            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400">المدينة: {selectedPoint.city}</span>
              <button
                onClick={onOpenReport}
                className="text-blue-600 font-bold hover:underline"
              >
                إرسال بلاغ عن هذا الشارع &larr;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
