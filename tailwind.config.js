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
            'custom-url':
               'url(https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80)',
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
