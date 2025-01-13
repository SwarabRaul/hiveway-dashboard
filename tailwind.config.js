/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enables class-based dark mode
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Includes JSX/TSX files for Tailwind scanning
    "./public/index.html",        // Includes the main HTML file
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#3ABFF8',
          DEFAULT: '#0EA5E9',
          dark: '#0284C7',
        },
      },
      backdropBlur: {
        sm: '4px',
        md: '8px',
        lg: '12px',
      },
      boxShadow: {
        glass: '0 4px 6px rgba(0, 0, 0, 0.1)', // Custom shadow for glassmorphism
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Adds better styling for form elements
  ],
};
