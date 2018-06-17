import {
  observable,
  // computed,
  action,
} from 'mobx'

import { post, get } from '../util/http'

export default class AppState {
  @observable user = {
    isLogin: false,
    info: {},
    detail: {
      recentTopics: [],
      recentReplies: [],
      syncing: false,
    },
  }
  @action login(accessToken) {
    return new Promise((resolve, reject) => {
      accessToken = encodeURIComponent(accessToken)
      post({
        url: 'user/login',
        data: { accessToken },
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
  @action getUserDetail() {
    this.user.detail.syncing = true
    return new Promise((resolve, reject) => {
      get(`user/${this.user.info.loginname}`)
        .then(resp => {
          if (resp.success) {
            this.user.detail.recentReplies = resp.data.recent_replies
            this.user.detail.recentTopics = resp.data.recent_topics
            resolve()
          } else {
            reject()
          }
          this.user.detail.syncing = false
        })
        .catch(err => {
          console.log(err)
          this.user.detail.syncing = false
          reject()
        })
    })
  }
}
