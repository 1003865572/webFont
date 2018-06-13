export const topicSchema = {
  id: '',
  author_id: '',
  tab: '',
  content: '',
  title: '',
  last_reply_at: '',
  good: false,
  top: false,
  reply_count: 0,
  visit_count: 0,
  create_at: '',
  is_collect: '',
  author: {
    loginname: '',
    avatar_url: '',
  },
  replies: [],
}

export const tabs = {
  all: '全部',
  good: '精华',
  share: '分享',
  ask: '问答',
  job: '招聘',
  dev: '测试',
}

export default {}
