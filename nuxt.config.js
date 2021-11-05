require('dotenv').config();
import AxiosConfig from './config/axios.config';
const URL_ACCOUNT =
  process.env.API_ACCOUNT_URL || 'https://propertinext.com/v1/auth';
module.exports = {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: 'Dashboard PropertiNext',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'PropertiNext Dashboard',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon/favicon.ico' },
      { rel: 'stylesheet', href: '/theme/css/sb-admin-2.css' },
      {
        rel: 'stylesheet',
        href: '/theme/vendor/fontawesome-free/css/all.min.css',
      },
      {
        rel: 'stylesheet',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/material-design-icons/3.0.1/iconfont/material-icons.min.css',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Poppins&display=swap',
      },
    ],
    script: [
      { src: '/theme/vendor/jquery/jquery.min.js' },
      { src: '/theme/vendor/bootstrap/js/bootstrap.bundle.min.js' },
      { src: '/theme/vendor/jquery-easing/jquery.easing.min.js' },
      { src: '/theme/js/sb-admin-2.js' },
      { src: '/js/custom.js' },
    ],
  },
  /*
   ** Global CSS
   */
  css: ['~/assets/css/main.css'],
  /*
   ** Add axios globally
   */
  plugins: [
    // '~/plugins/axios',
    '~/plugins/lmap',
    '~/plugins/vtable',
    '~/plugins/vmoney',
    '~/plugins/vplaceholder',
    '~/plugins/vchart',
    '~/plugins/vselect',
    '~/plugins/vuelidate',
    '~/plugins/vformwizard',
    '~/plugins/vcalendar',
    '~/plugins/vtour',
    '~/plugins/swiper',
    '~/plugins/toast',
    '~/plugins/hooper',
  ],
  modules: ['@nuxtjs/axios', '@nuxtjs/auth-next', 'bootstrap-vue/nuxt'],
  buildModules: ['@nuxtjs/dotenv'],

  auth: {
    // strategies: {
    //   local: {
    //     token: { property: 'access_token', maxAge: 60 * 60 * 3.5, type: null },
    //     refreshToken: { property: 'refresh_token', maxAge: 60 * 60 * 7 },
    //     user: { property: '' },
    //     endpoints: {
    //       login: false,
    //       logout: false,
    //       user: { url: `/webapi/account/me`, method: 'get', property: 'data' }
    //     }
    //   }
    // }

    strategies: {
      local: {
        endpoints: {
          login: {
            url: `${process.env.URL_AUTH}/login`,
            method: 'post',
          },
          logout: {
            url: `${process.env.URL_BASE}`
          },
          user: { url: `/webapi/account/me`, method: 'get', property: 'data' },
        },
        token: { property: 'token' },
        user: {
          property: 'data'
        }
      },
    },
  },
  axios: {
    proxy: true,
  },
  proxy: {
    '/landing/': {
      target: process.env.URL_BASE,
      pathRewrite: { '^/account/': '' },
    },
    '/account/': {
      target: process.env.URL_API,
      pathRewrite: { '^/account/': '' },
    },
    '/property/': {
      target: process.env.URL_AUTH,
      pathRewrite: { '^/property/': '' },
    },
    '/webapi/': {
      target: process.env.URL_WEBAPI,
      pathRewrite: { '^/webapi/': '' },
    },
  },

  bootstrapVue: {
    bootstrapCSS: false, // Or `css: false`
    bootstrapVueCSS: true, // Or `bvCSS: false`,
    icons: true
  },
  env: {
    baseUrl: process.env.APP_URL || 'http://api.propertinext.com:3003',
    URLLanding: process.env.URL_BASE,
    URLProperty: process.env.URL_API,
    URLAccount: process.env.URL_AUTH,
    URLWebAPI: process.env.URL_WEBAPI,
  },
  build: {
    // vendor: ['axios'],
    /*
     ** Run ESLINT on save
     */
    extend(config, ctx) {
      // if (ctx.isDev && ctx.isClient) {
      //   config.module.rules.push({
      //     enforce: 'pre',
      //     test: /\.(js|vue)$/,
      //     loader: 'eslint-loader',
      //     exclude: /(node_modules)/
      //   })
      // }
    },

    optimization: {
      minimize: false,
    },
  },
  serverMiddleware: [
    // API middleware
    // '~/api/index.js'
  ],
  router: {
    middleware: ['authentic'],
  },
  server: {
    port: 3003,
    host: '0.0.0.0',
  },
};
