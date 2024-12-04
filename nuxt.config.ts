// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app:{
    head:{
      meta:[
        {name:"google-site-verification" ,content:"gou_f9toi6892gALgLnU2LJS3FwPw-ZWQ0a3tIvynQM"}
      ],
      link:[
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap' },
      ]
    }
  },
  runtimeConfig: {
    // Private runtime configuration (server-only)
    airtableApiKey: process.env.AIRTABLE_API_KEY,
    ugOpsBaseId: process.env.UG_OPS_BASE_ID,
    ugNuBaseId: process.env.UG_NU_BASE_ID,
    ugCnuBaseId: process.env.UG_CNU_BASE_ID,
    jwtSecret: process.env.JWT_SECRET,
    staffView: process.env.STAFF_VIEW,
    staffTable: process.env.STAFF_TABLE,
    parishView: process.env.PARISH_VIEW,
    parishTable: process.env.PARISH_TABLE,
    groupView: process.env.GROUP_VIEW,
    groupTable: process.env.GROUP_TABLE,

    // Public runtime configuration (accessible on server & client)
    public: {
      // Add any public-facing variables if needed
    },
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss','@pinia/nuxt','@nuxtjs/color-mode','@pinia-plugin-persistedstate/nuxt'],
  colorMode: {
    classSuffix: ''
  }
})