import React from 'react';

interface TDSLogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'light';
  showTagline?: boolean;
}

export const TDSLogo: React.FC<TDSLogoProps> = ({
  className = "h-12",
  variant = 'full',
  showTagline = true
}) => {
  const isLight = variant === 'light';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* TDS Icon Graphic matching poster: Circular green arc around TDS monogram */}
      <div className="relative flex-shrink-0 w-12 h-12 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
          {/* Outer Green Digital Arc / Swoosh */}
          <path
            d="M 20,50 A 35,35 0 1,1 80,65"
            fill="none"
            stroke="#10B981"
            strokeWidth="7"
            strokeLinecap="round"
          />
          {/* Accent Leaf & Dot detail */}
          <circle cx="82" cy="65" r="4.5" fill="#059669" />
          <path
            d="M 15,35 C 10,25 25,20 30,25 C 25,30 20,38 15,35 Z"
            fill="#059669"
          />
          
          {/* Inner Monogram Text TDS */}
          <text
            x="50"
            y="58"
            fontFamily="'Plus Jakarta Sans', 'Arial Black', sans-serif"
            fontWeight="900"
            fontSize="32"
            letterSpacing="-1"
            fill={isLight ? "#FFFFFF" : "#0F2C59"}
            textAnchor="middle"
          >
            TDS
          </text>
        </svg>
      </div>

      {/* Text Branding */}
      {variant !== 'compact' && (
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-1">
            <span className={`font-black text-xl tracking-tight leading-none ${isLight ? 'text-white' : 'text-[#0F2C59]'}`}>
              TAMRIN
            </span>
          </div>
          <div className="flex items-center justify-between gap-1 mt-0.5">
            <span className="h-[1px] bg-emerald-500 flex-grow max-w-[12px]"></span>
            <span className={`text-[10px] font-bold tracking-[0.2em] uppercase leading-none ${isLight ? 'text-[#2DD4BF]' : 'text-emerald-700'}`}>
              DIGITAL SERVICE
            </span>
            <span className="h-[1px] bg-emerald-500 flex-grow max-w-[12px]"></span>
          </div>
          {showTagline && (
            <span className={`text-[9px] font-semibold italic mt-0.5 ${isLight ? 'text-[#C9D7E5]' : 'text-slate-600'}`}>
              Easy Service, Better Life
            </span>
          )}
        </div>
      )}
    </div>
  );
};
