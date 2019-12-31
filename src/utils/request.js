import { Message } from 'element-ui'
console.log(process.env)
const http = axios.create({
  baseURL: process.env.MOCK ? '/' : process.env.VUE_APP_REQUEST_URL,
  timeout: 1000 * 30,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})

http.interceptors.request.use(
  config => {
    // 拦截请求，修改请求头
    // if (VueCookies.get('token')) {
    //   config.headers['token'] = VueCookies.get('token')
    // }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  response => {
    // 拦截响应，统一处理某些响应
    if (!(response && response.data)) return

    switch (response.status) {
      case 200:
        Message({
          type: 'success',
          message: 200
        })
        break
      default:
      // VueCookies.remove('ac_token')
      // router.push({ name: 'login' })
      // Message({
      //   message: response.data.message,
      //   type: 'error'
      // })
    }

    return response
  },
  error => {
    // 统一处理请求error
    // if (!(error && error.response)) {
    // Message({
    //   type: 'error',
    //   message: '连接到服务器失败'
    // })
    //   return
    // }
    // switch (error.response.status) {
    //   case 400:
    //     Message({
    //       type: 'error',
    //       message: '连接到服务器失败'
    //     })
    //     break
    //   default:
    //     Message({
    //       type: 'error',
    //       message: `请求失败,errCode=${error.response.status}`
    //     })
    // }
    return Promise.reject(error)
  }
)

export default http
