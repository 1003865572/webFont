import React from 'react';
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import {
  inject,
  observer,
} from 'mobx-react'
import marked from 'marked'
import datefromat from 'dateformat'

import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import { CircularProgress } from 'material-ui/Progress'

import Container from '../layout/container'
import Reply from './Reply'

import { topicDetailStyle } from './styles'

@inject((stores) => ({
  topicStore: stores.topicStore,
})) @observer
class TopicDetail extends React.Component {
  componentDidMount() {
    this.props.topicStore.getTopicDetail(this.getTopicId())
  }
  getTopicId = () => {
    const { match } = this.props
    const { id } = match.params
    return id
  }
  render() {
    const { classes } = this.props
    const topic = this.props.topicStore.detailMap[this.getTopicId()]
    if (!topic) {
      console.log(topic)
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

        <Paper elevation={4} className={classes.replies} >
          <header className={classes.replyHeader} >
            <span>{`${topic.reply_count} 回复`}</span>
            <span>{`最新回复 ${datefromat(topic.last_reply_at, 'yyyy-mm-dd h:mm:ss')}`}</span>
          </header>
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
}

TopicDetail.propTypes = {
  match: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(topicDetailStyle)(TopicDetail)
