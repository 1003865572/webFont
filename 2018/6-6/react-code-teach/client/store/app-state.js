import {
  observable,
  // computed,
  action,
} from 'mobx'

import { post } from '../util/http'

export default class AppState {
  @observable user = {
    isLogin: false,
    info: {},
  }

  @action login(accessToken) {
    return new Promise((resolve, reject) => {
      post('/api/user/login', {
        accessToken,
      }).then((resp) => {
        if (resp.success) {
          this.user.isLogin = true
          this.user.info = resp.data
          resolve(resp.data)
        } else {
          reject(resp)
        }
      }).catch(reject)
    })
  }
}
