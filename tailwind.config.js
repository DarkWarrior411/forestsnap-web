/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    'bg-green-900/20', 'border-green-800/50', 'text-green-400', 'bg-green-50', 'border-green-200', 'text-green-700',
    'bg-blue-900/20', 'border-blue-800/50', 'text-blue-400', 'bg-blue-50', 'border-blue-200', 'text-blue-700',
    'bg-orange-900/20', 'border-orange-800/50', 'text-orange-400', 'bg-orange-50', 'border-orange-200', 'text-orange-700',
    'bg-purple-900/20', 'border-purple-800/50', 'text-purple-400', 'bg-purple-50', 'border-purple-200', 'text-purple-700'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}