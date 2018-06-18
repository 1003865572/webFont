import React from 'react';
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import {
  inject,
  observer,
} from 'mobx-react'
import marked from 'marked'
import datefromat from 'dateformat'
import SimpleMDE from 'react-simplemde-editor'

import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import { CircularProgress } from 'material-ui/Progress'
import Button from 'material-ui/Button'
import IconReplay from 'material-ui-icons/Replay'

import Container from '../layout/container'
import Reply from './Reply'

import { topicDetailStyle } from './styles'

@inject((stores) => ({
  topicStore: stores.topicStore,
  user: stores.appState.user,
})) @observer
class TopicDetail extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }
  constructor(props) {
    super(props)
    this.state = {
      newReply: '',
    }
  }
  componentDidMount() {
    this.props.topicStore.getTopicDetail(this.getTopicId())
  }
  getTopicId = () => {
    const { match } = this.props
    const { id } = match.params
    return id
  }
  handleNewReplyChange = (mdText) => {
    this.setState({
      newReply: mdText,
    })
  }
  loginButtonClick = () => {
    this.context.router.history.push('/user/login')
  }
  doReplay = () => {
    const topic = this.props.topicStore.detailMap[this.getTopicId()]
    topic.doReply(this.state.newReply)
      .then(() => {
        this.setState({
          newReply: '',
        })
      })
      .catch(err => {
        console.log(err);
      })
  }
  render() {
    const { classes, user } = this.props
    const topic = this.props.topicStore.detailMap[this.getTopicId()]
    if (!topic) {
      return (
        <Container>
          <section className={classes.loadingContainer}>
            <CircularProgress color="primary" />
          </section>
        </Container>
      )
    }
    return (
      <div>
        <Container>
          <Helmet>
            <title>{topic.title}</title>
          </Helmet>
          <header className={classes.header} >
            <h3>{topic.title}</h3>
          </header>
          <section className={classes.body}>
            <p dangerouslySetInnerHTML={{ __html: marked(topic.content) }} />
          </section>
        </Container>
        {
          topic.createReplys && topic.createReplys.length ? (
            <Paper elevation={4} className={classes.replies} >
              <header className={classes.replyHeader} >
                <span>最新回复</span>
              </header>
              {
                topic.createReplys.map(reply => (
                  <Reply
                    key={reply.id}
                    reply={Object.assign({}, reply, {
                      author: {
                        loginname: user.info.loginname,
                        avatar_url: user.info.avatar_url,
                      },
                    })}
                  />
                ))
              }
            </Paper>
          ) : null
        }
        <Paper elevation={4} className={classes.replies} >
          <header className={classes.replyHeader} >
            <span>{`${topic.reply_count} 回复`}</span>
            <span>{`最新回复 ${datefromat(topic.last_reply_at, 'yyyy-mm-dd h:mm:ss')}`}</span>
          </header>
          {
            user.isLogin ? (
              <section className={classes.replyEditor} >
                <SimpleMDE
                  onChange={this.handleNewReplyChange}
                  value={this.state.newReply}
                  options={{
                    toolbar: false,
                    autoFocus: false,
                    spellChecker: false,
                    placeholder: '添加您的精彩回复',
                  }}
                />
                <Button variant="raised" color="primary" onClick={this.doReplay} >
                  <IconReplay />
                </Button>
              </section>
            ) : (
              <section className={classes.notLoginButton} >
                <Button variant="raised" color="primary" onClick={this.loginButtonClick} >
                  登录后才可以回复
                </Button>
              </section>
            )
          }
          <section>
            {
              topic.replies.map(reply => <Reply key={reply.id} reply={reply} />)
            }
          </section>
        </Paper>
      </div>
    )
  }
}

TopicDetail.wrappedComponent.propTypes = {
  topicStore: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

TopicDetail.propTypes = {
  match: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(topicDetailStyle)(TopicDetail)
