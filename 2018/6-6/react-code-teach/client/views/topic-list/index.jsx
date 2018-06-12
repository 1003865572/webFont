import React from 'react'
import {
  observer,
  inject,
} from 'mobx-react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Tabs, { Tab } from 'material-ui/Tabs'
import List from 'material-ui/List'
import { CircularProgress } from 'material-ui/Progress'
import Container from '../layout/container'
import TopicListItem from './list-item'
import { AppState, TopicStore } from '../../store/store'

@inject(stores => {
  return {
    appState: stores.appState,
    topicStore: stores.topicStore,
  }
}) @observer
class TopicList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tabIndex: 0,
    }
  }
  componentDidMount() {
    this.props.topicStore.fetchTopcis()
  }
  changeTab = (e, index) => {
    this.setState({ tabIndex: index })
  }
  topicListClick = () => {

  }
  render() {
    const { tabIndex } = this.state
    const { appState, topicStore } = this.props
    console.log(appState)
    const topicList = topicStore.topics
    const syncingTopics = topicStore.syncing
    // topicStore.syncing
    // const topic = {
    //   title: 'This is title',
    //   username: 'doujiao',
    //   reply_count: 0,
    //   visit_count: 0,
    //   create_at: '111',
    //   tab: 'share',
    // }
    return (
      <Container>
        <Helmet>
          <title>this is topicList</title>
          <meta name="description" content="this is description" />
        </Helmet>
        <Tabs value={tabIndex} onChange={this.changeTab} >
          <Tab label="全部" />
          <Tab label="精华" />
          <Tab label="分享" />
          <Tab label="问答" />
          <Tab label="招聘" />
          <Tab label="客户端测试" />
        </Tabs>
        <List>
          {
            topicList.map(topic => (
              <TopicListItem
                key={topic.id}
                onClick={this.topicListClick}
                topic={topic}
              />
            ))
          }
        </List>
        {
          syncingTopics ? (
            <div>
              <CircularProgress color="primary" size={100} />
            </div>
          ) : null
        }
      </Container>
    )
  }
}
TopicList.wrappedComponent.propTypes = {
  appState: PropTypes.instanceOf(AppState),
  topicStore: PropTypes.instanceOf(TopicStore),
}
export default TopicList
