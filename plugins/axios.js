import * as axios from 'axios'
// const Cookie = require('~/assets/js/cookie')

let options = {}
// The server-side needs a full url to works
options.baseURL = `${process.env.APP_URL || 'http://api.propertinext.com:3003'}`
// options.headers.Authorization = Cookie.getCookie('PROPERTINEXT_ACCESS_TOKEN')

export default axios.create(options)
