// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBlue:'#282554',
        primaryPurple: '#6838e0', // Border color
        darkBlue: '#141332',      
      },
    },
  },
  plugins: [],
};

export default config;
