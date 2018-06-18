import React from 'react'
import PropTypes from 'prop-types'
import {
  inject,
  observer,
} from 'mobx-react'

import { withStyles } from 'material-ui/styles'
import ListItem from 'material-ui/List/ListItem'
import Avatar from 'material-ui/Avatar'
import ListItemText from 'material-ui/List/ListItemText'

import UserContainer from './user'
import infoStyle from './styles/info'

const TopicList = ({ topic, onClick }) => (
  <ListItem button onClick={onClick}>
    <Avatar src={topic.author.avatar_url} />
    <ListItemText
      primary={topic.title}
      secondary={`最新回复: ${topic.last_reply_at}`}
    />
  </ListItem>
)

TopicList.propTypes = {
  topic: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
}

@inject(stores => ({
  appState: stores.appState,
})) @observer
class Info extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }
  componentWillMount() {
    const { appState } = this.props
    if (!appState.user.isLogin) {
      this.context.router.history.replace('/user/login')
    } else if (appState.user.info.loginname) {
      appState.getUserDetail()
      appState.getUserCollection()
    }
  }
  goToTopic = (id) => {
    this.context.router.history.push(`/detail/${id}`)
  }
  render() {
    const { classes, appState } = this.props
    const { recentTopics, recentReplies, syncing } = appState.user.detail
    const { colletions } = appState.user
    return (
      <UserContainer>
        <div className={classes.root} >
          <div className={classes.item} >
            <h4 className={classes.title} >最近发布的话题</h4>
            {
              syncing ? 'loading...' : (
                recentTopics.map(item => (
                  <TopicList
                    key={item.id}
                    topic={item}
                    onClick={() => this.goToTopic(item.id)}
                  />
                ))
              )
            }
          </div>
          <div className={classes.item} >
            <h4 className={classes.title} >新的回复</h4>
            {
              syncing ? 'loading...' : (
                recentReplies.map(item => (
                  <TopicList
                    key={item.id}
                    topic={item}
                    onClick={() => this.goToTopic(item.id)}
                  />
                ))
              )
            }
          </div>
          <div className={classes.item} >
            <h4 className={classes.title} >收藏的话题</h4>
            {
              colletions.syncing ? 'loading...' : (
                colletions.list.map(item => (
                  <TopicList
                    key={item.id}
                    onClick={() => this.goToTopic(item.id)}
                    topic={item}
                  />
                ))
              )
            }
          </div>
        </div>
      </UserContainer>
    )
  }
}

Info.propTypes = {
  classes: PropTypes.object.isRequired,
}

Info.wrappedComponent.propTypes = {
  appState: PropTypes.object,
}
export default withStyles(infoStyle)(Info)

