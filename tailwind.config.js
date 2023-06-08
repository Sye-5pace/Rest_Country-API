/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
export default {
  content: [
    '*.js',
    '*.html'
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
  plugins: [
    plugin(function({addVariant}){
      addVariant("children","&>*")
    })
  ]
}

