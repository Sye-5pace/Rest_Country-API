/** @type {import('tailwindcss').Config} */
export default {
  content: [
    '*.js',
    'index.html'
  ],
  theme: {
    screens: {
      'mobile': {'min':'200px','max':'427px'},
      // 'tablet': {'min':'427px','max':'782px'},
      'laptop': {'min':'782.1px'}
    },
    extend: {
      fontFamily:{
      'geologica':['Geologica', 'sans-serif']
    },
    },
  },
  plugins: [],
}

