// 登录模块
import { clearToken, getToken, http, setToken } from '@/utils'
import { makeAutoObservable } from 'mobx'

class LoginStore {
  token = getToken() || ''
  constructor() {
    makeAutoObservable(this)
  }
  logout = () => {
    this.token = ''
    clearToken()
  }
  // 登录
  login = async ({ username, password }) => {
    let data = new FormData()
    data.append('username', username)
    data.append('password', password)
    const res = await http.post(
      'http://localhost:8080/api/v1/users/Login',
      data
    )
    if (res.data.state === 200) {
      this.token = res.data.data
      setToken(this.token)
      return Promise.resolve()
    } else {
      return Promise.reject(
        `error code:${res.data.state} 错误信息:${res.data.message}`
      )
      // TODO: 弹窗错误
    }
  }
}

export default LoginStore
