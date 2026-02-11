/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // This enables the dark mode toggle
  theme: {
    extend: {
      colors: {
        // --- 1. YOUR LANDING PAGE BLUE (Indigo) ---
        // Replacing the dashboard's default blue with your Indigo-600
        primary: '#4F46E5', 
        'primary-hover': '#4338ca', // Indigo-700 for hover effects

        // --- 2. YOUR LANDING PAGE BLACK ---
        // The dashboard usually uses "boxdark-2" for the main page background.
        // We force it to be pure black to match your landing page hero section.
        'boxdark-2': '#000000', 
        
        // --- 3. DASHBOARD CARD COLORS ---
        // Since the background is black, the cards need to be slightly lighter 
        // so they stand out. We use Gray-900 or Slate-900.
        boxdark: '#111827', // Gray-900 (Dark Cards)
        
        // --- 4. TEXT COLORS ---
        // Ensuring text is readable on black backgrounds
        bodydark: '#CBD5E1',  // Slate-300 (Main text)
        bodydark1: '#DEE4EE', // Slate-200 (Headings)
        bodydark2: '#94A3B8', // Slate-400 (Secondary text)
        
        // --- 5. BORDERS & LINES ---
        stroke: '#1E293B', // Slate-800 (Dark borders)
        'strokedark': '#1E293B',
      },
    },
  },
  plugins: [],
}