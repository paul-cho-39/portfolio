/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
   ],
   darkMode: 'class',
   theme: {
      extend: {
         color: {},
         backgroundImage: {
            'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            'gradient-circle-strong':
               'radial-gradient(circle, #ff8800 0%, #ff6600 50%, #cc2200 100%)',
            'gradient-circle-medium':
               'radial-gradient(circle, #ffaa00 0%, #ff8800 50%, #ff6600 100%)',
            'gradient-circle-light':
               'radial-gradient(circle, #ffcc00 0%, #ffaa00 50%, #ff8800 100%)',
            'gradient-circle-normal':
               'radial-gradient(circle, #ffdd00 0%, #ffcc00 50%, #ffaa00 100%)',
         },
         animation: {
            'fade-in': 'fadeIn 0.5s ease-in forwards',
            neon: 'neon 2s ease-in 2s alternate',
         },
         fontFamily: {
            sans: ['var(--font-barlow-condensed)'],
            serif: ['var(--font-montserrat-alternative)'],
         },
         keyframes: {
            neon: {
               '0%, 100%': {
                  textShadow:
                     '0 0 10px #ff00de, 0 0 20px #ff00de, 0 0 30px #ff00de, 0 0 40px #ff00de',
                  color: '#6558DD',
               },
               '50%': {
                  textShadow:
                     '0 0 20px #ff00de, 0 0 30px #ff00de, 0 0 40px #ff00de, 0 0 50px #ff00de, 0 0 60px #ff00de',
                  color: '#6558DD',
               },
            },
         },
         screens: {
            sm: '576px',
            md: '720px',
            lg: '937px',
            xl: '1225px',
         },
      },
   },
   plugins: [require('@tailwindcss/typography')],
};
