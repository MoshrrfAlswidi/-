import React from 'react';

interface TrafficEmblemProps {
  className?: string;
  size?: number;
}

export const TrafficEmblem: React.FC<TrafficEmblemProps> = ({ className = '', size = 110 }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        {/* Outer Circular Laurel / Shield background */}
        <circle cx="100" cy="100" r="92" fill="#FFFFFF" stroke="#0f2b48" strokeWidth="4" />
        <circle cx="100" cy="100" r="86" fill="#f8fafc" stroke="#dc2626" strokeWidth="2.5" />

        {/* Outer Ribbon with National Colors (Red, White, Black) */}
        <path
          d="M 30,120 C 20,70 50,25 100,25 C 150,25 180,70 170,120 C 160,165 130,185 100,185 C 70,185 40,165 30,120 Z"
          fill="#ffffff"
          stroke="#0f2b48"
          strokeWidth="2"
        />

        {/* Yemeni Flag Wreath Arches (Red top, Black bottom) */}
        <path
          d="M 40,90 C 45,45 80,32 100,32 C 120,32 155,45 160,90"
          stroke="#dc2626"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 42,110 C 45,155 80,178 100,178 C 120,178 155,155 158,110"
          stroke="#111827"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />

        {/* Green Laurel Wreath Leaves */}
        <g stroke="#16a34a" strokeWidth="2.5" fill="none">
          <path d="M 35,80 Q 25,65 35,50" />
          <path d="M 32,95 Q 22,80 30,70" />
          <path d="M 38,125 Q 25,135 38,145" />
          <path d="M 165,80 Q 175,65 165,50" />
          <path d="M 168,95 Q 178,80 170,70" />
          <path d="M 162,125 Q 175,135 162,145" />
        </g>

        {/* Central Shield Outline */}
        <path
          d="M 68,60 L 132,60 C 132,60 134,105 100,140 C 66,105 68,60 68,60 Z"
          fill="#ffffff"
          stroke="#0f2b48"
          strokeWidth="3.5"
        />

        {/* Red Shield Header */}
        <path
          d="M 69,61 L 131,61 L 131,78 L 69,78 Z"
          fill="#dc2626"
        />

        {/* Protective Hand / Guidance Silhouette */}
        <path
          d="M 100,70 C 88,70 85,82 85,95 C 85,115 100,132 100,132 C 100,132 115,115 115,95 C 115,82 112,70 100,70 Z"
          fill="#f1f5f9"
          stroke="#334155"
          strokeWidth="1.5"
        />

        {/* Mini Traffic Light Box in Center */}
        <rect x="90" y="86" width="20" height="42" rx="4" fill="#0f172a" stroke="#ffffff" strokeWidth="1.5" />
        {/* Traffic Light Hoods & Lights */}
        <circle cx="100" cy="94" r="4.5" fill="#ef4444" className="drop-shadow" />
        <circle cx="100" cy="107" r="4.5" fill="#f59e0b" className="drop-shadow" />
        <circle cx="100" cy="120" r="4.5" fill="#10b981" className="drop-shadow" />

        {/* Radiating Safety Rays */}
        <path d="M 100,40 L 100,52" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 75,46 L 82,56" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
        <path d="M 125,46 L 118,56" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />

        {/* Lower Banner Text "شرطة المرور" */}
        <path
          d="M 52,156 Q 100,174 148,156"
          stroke="#0f2b48"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <text
          x="100"
          y="160"
          fill="#ffffff"
          fontSize="11"
          fontWeight="bold"
          textAnchor="middle"
          fontFamily="Cairo, sans-serif"
        >
          شرطة المرور
        </text>
      </svg>
    </div>
  );
};
