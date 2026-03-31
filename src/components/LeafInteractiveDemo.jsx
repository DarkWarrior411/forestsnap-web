'use client';
import React, { useState } from 'react';

export default function LeafInteractiveDemo({ theme }) {
  const [dryness, setDryness] = useState(20);
  const hue = 140 - (dryness / 100) * 140;
  
  return (
    <div className={`p-8 rounded-3xl border transition-colors duration-500 max-w-2xl mx-auto w-full flex flex-col items-center gap-6 ${theme === 'dark' ? 'bg-[#0a0a0c] border-gray-800 shadow-[0_0_50px_rgba(255,69,0,0.05)]' : 'bg-white border-gray-200 shadow-xl'}`}>
      <div className="text-center">
        <h4 className="font-bold text-xl mb-1">Live Inference Preview</h4>
        <p className={`text-xs font-mono uppercase ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>U-Net Segmentation & ResNet Classification</p>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-10 w-full justify-center">
        <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full transition-colors duration-300 drop-shadow-lg" style={{ color: `hsl(${hue}, 80%, 45%)` }}>
            <path d="M50 10 C20 10 10 50 50 90 C90 50 80 10 50 10 Z" fill="currentColor" opacity="0.8" />
            <path d="M50 10 L50 90" stroke={theme === 'dark' ? '#000' : '#fff'} strokeWidth="2" opacity="0.5" />
            <path d="M50 30 L70 20 M50 50 L75 35 M50 70 L70 55 M50 30 L30 20 M50 50 L25 35 M50 70 L30 55" stroke={theme === 'dark' ? '#000' : '#fff'} strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
          </svg>
          {dryness > 75 && (
            <div className="absolute inset-0 bg-[#FF4500] mix-blend-color animate-pulse rounded-full blur-xl opacity-20 pointer-events-none" />
          )}
        </div>

        <div className="w-full space-y-5">
          <div>
            <div className="flex justify-between text-sm mb-2 font-mono">
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Moisture Level</span>
              <span className={dryness > 70 ? 'text-[#FF4500] font-bold' : 'text-emerald-500'}>{100 - dryness}%</span>
            </div>
            <input 
              type="range" 
              min="0" max="100" 
              value={dryness} 
              onChange={(e) => setDryness(e.target.value)}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#FF4500]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className={`p-3 rounded-lg border ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
               <p className={`text-xs mb-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>Detected Fuel</p>
               <p className={`font-mono font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>Eucalyptus (94%)</p>
            </div>
            <div className={`p-3 rounded-lg border ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
               <p className={`text-xs mb-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>Fire Risk Index</p>
               <p className={`font-mono font-bold ${dryness > 75 ? 'text-[#FF4500] animate-pulse' : (dryness > 40 ? 'text-amber-500' : 'text-emerald-500')}`}>
                 {dryness > 75 ? 'CRITICAL' : (dryness > 40 ? 'MODERATE' : 'LOW')}
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}