/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'jair-blue': '#47a6f3',
        'jair-blue-dark': '#2563eb',
        'obsidian': '#050505',
        'structure': 'rgba(71, 166, 243, 0.1)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #47a6f3, #2563eb)',
        'gradient-hero': 'radial-gradient(circle at center, rgba(71, 166, 243, 0.1) 0%, transparent 70%)',
        'gradient-demo': 'linear-gradient(135deg, rgba(71, 166, 243, 0.1), rgba(37, 99, 235, 0.1))',
        'gradient-dark': 'linear-gradient(to bottom, #050505, #0a0a0a)',
      },
    },
  },
  plugins: [],
};
