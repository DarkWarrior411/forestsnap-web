import React from 'react';

export default function ForestSnapLogo({ className = "w-8 h-8", theme = "dark" }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" stroke="#FF4500" strokeWidth="2" strokeOpacity={theme === 'dark' ? "0.2" : "0.1"} strokeDasharray="4 4" />
      <circle cx="50" cy="50" r="30" stroke="#FF4500" strokeWidth="2" strokeOpacity={theme === 'dark' ? "0.4" : "0.2"} />
      <path d="M50 20 C20 20 20 50 50 80 C50 80 50 50 50 20 Z" fill="#10B981" fillOpacity="0.8" />
      <path d="M50 80 C80 50 80 20 50 20 C40 35 60 45 50 80 Z" fill="#FF4500" />
      <path d="M50 20 L50 80" stroke={theme === 'dark' ? "#111827" : "#ffffff"} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}