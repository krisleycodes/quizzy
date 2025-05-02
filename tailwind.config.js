// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  // In v4, you use darkMode for strategy configuration
  darkMode: {
    // 'class' for class-based dark mode switching
    strategy: 'class',
    // Optional: specify the class name (defaults to 'dark')
    className: 'dark'
  },
  theme: {
    extend: {},
  },
  plugins: [],
}