import { clearToken, getToken, setToken } from '@/utils'
import axios from 'axios'
import { history } from './history'

const http = axios.create({
  baseURL: 'http://localhost:8080/',
  timeout: 5000,
})
// 添加请求拦截器
http.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
http.interceptors.response.use(
  (response) => {
    const token = getToken()
    if (
      response.headers.Authorization !== undefined &&
      response.headers.Authorization !== token
    ) {
      setToken(response.headers.Authorization)
    }
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response
  },
  (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    if (error.response.status === 401) {
      clearToken()
      history.push('/login')
    }
    return Promise.reject(error)
  }
)

export { http }
