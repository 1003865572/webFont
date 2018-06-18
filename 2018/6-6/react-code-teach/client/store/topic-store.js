import {
  observable,
  toJS,
  computed,
  action,
  extendObservable,
} from 'mobx'
import { topicSchema, replySchema } from '../util/variable-define'
import { get, post } from '../util/http'

const createTopic = (topci) => Object.assign({}, topicSchema, topci)

const createReply = (reply) => {
  return Object.assign({}, replySchema, reply)
}

class Topic {
  constructor(data) {
    extendObservable(this, data)
  }
  @observable syncing = false
  @observable createReplys = []
  @action doReply(content) {
    return new Promise((resolve, reject) => {
      post({
        url: `/topic/${this.id}/replies`,
        params: { needAccessToken: true },
        data: { content },
      })
        .then((resp) => {
          if (resp.success) {
            this.createReplys.push(createReply({
              id: resp.reply_id,
              content,
              create_at: Date.now(),
            }))
            resolve()
          } else {
            reject(resp)
          }
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
    })
  }
}

class TopicStore {
  @observable topics
  @observable syncing
  @observable details
  @observable createdTopics = []
  @observable tab

  constructor({ syncing = false, topics = [], details = [], tab = null } = {}) {
    this.syncing = syncing
    this.topics = topics.map(topic => new Topic(createTopic(topic)))
    this.details = details
    this.tab = tab
  }
  addTopic(topic) {
    this.topics.push(new Topic(createTopic(topic)))
  }
  toJson() {
    return {
      topics: toJS(this.topics),
      syncing: this.syncing,
      details: toJS(this.details),
      tab: this.tab,
    }
  }
  @computed get detailMap() {
    return this.details.reduce((result, detail) => {
      result[detail.id] = detail
      return result
    }, {})
  }

  @action fetchTopcis(tab) {
    return new Promise((resolve, reject) => {
      if (tab === this.tab && this.topics.length > 0) {
        resolve()
        return
      }
      this.tab = tab
      this.syncing = true
      this.topics = []
      get('topics', {
        mdrender: false,
        tab,
      }).then(resp => {
        if (resp.success) {
          this.topics = resp.data.map(topic => new Topic(createTopic(topic)))
          resolve()
        } else {
          reject()
        }
        this.syncing = false
      }).catch(err => {
        reject(err)
        this.syncing = false
      })
    })
  }

  @action getTopicDetail(id) {
    return new Promise((resolve, reject) => {
      if (this.detailMap[id]) {
        resolve(this.detailMap[id])
      } else {
        get(`topic/${id}`, {
          mdrender: false,
        }).then(resp => {
          if (resp.success) {
            const topic = new Topic(createTopic(resp.data))
            console.log('api success')
            this.details.push(topic)
            resolve(topic)
          } else {
            reject()
          }
        }).catch(reject)
      }
    })
  }

  @action createTopic({ title, tab, content }) {
    return new Promise((resolve, reject) => {
      post({
        url: 'topics',
        params: { needAccessToken: true },
        data: { title, tab, content },
      })
        .then(resp => {
          if (resp.success) {
            const topic = {
              title,
              tab,
              content,
              id: resp.data.topic_id,
              create_at: Date.now(),
            }
            this.createdTopics.push(new Topic(createTopic(topic)))
            resolve()
          } else {
            reject()
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

export default TopicStore
