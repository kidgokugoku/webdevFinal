// 用户模块
import { http } from '@/utils'
import { makeAutoObservable } from 'mobx'

class UserStore {
  userInfo = {}
  constructor() {
    makeAutoObservable(this)
  }
  async getUserInfo() {
    const res = await http.get('http://localhost:8080/api/v1/users/GetByUid')
    this.userInfo = res.data.data
    return res.data.data
  }
}

export default UserStore
