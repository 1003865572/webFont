import React from 'react'
import {
  observer,
  inject,
} from 'mobx-react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Tabs, { Tab } from 'material-ui/Tabs'
import queryString from 'query-string'
import List from 'material-ui/List'
import { CircularProgress } from 'material-ui/Progress'
import Container from '../layout/container'
import TopicListItem from './list-item'
import { TopicStore } from '../../store/store'
import { tabs } from '../../util/variable-define'

@inject(stores => {
  return {
    topicStore: stores.topicStore,
  }
}) @observer
class TopicList extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }
  componentDidMount() {
    this.getTopics()
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      const tab = this.getTab(nextProps.location.search)
      this.props.topicStore.fetchTopcis(tab)
    }
  }
  getTopics = () => {
    const tab = this.getTab()
    this.props.topicStore.fetchTopcis(tab)
  }
  getTab = (search) => {
    const { location } = this.props
    search = search || location.search
    const query = queryString.parse(search)
    return query.tab || 'all'
  }
  asyncBootstrap() {
    const query = queryString.parse(this.props.location.search)
    const { tab } = query
    return this.props.topicStore.fetchTopcis(tab || 'all')
      .then(() => true)
      .catch(() => false)
  }
  changeTab = (e, value) => {
    const { router } = this.context
    router.history.push({
      pathname: '/list',
      search: `?tab=${value}`,
    })
  }
  topicListClick = (topic) => {
    this.context.router.history.push(`/detail/${topic.id}`)
  }
  render() {
    const { topicStore } = this.props
    const topicList = topicStore.topics
    const syncingTopics = topicStore.syncing
    return (
      <Container>
        <Helmet>
          <title>this is topicList</title>
          <meta name="description" content="this is description" />
        </Helmet>
        <Tabs value={this.getTab()} onChange={this.changeTab} >
          {
            Object.keys(tabs).map((tab) => (
              <Tab label={tabs[tab]} value={tab} key={tab} />
            ))
          }
        </Tabs>
        <List>
          {
            topicList.map(topic => (
              <TopicListItem
                key={topic.id}
                onClick={() => this.topicListClick(topic)}
                topic={topic}
              />
            ))
          }
        </List>
        {
          syncingTopics ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                padding: '40px 0',
              }}
            >
              <CircularProgress color="primary" size={100} />
            </div>
          ) : null
        }
      </Container>
    )
  }
}
TopicList.wrappedComponent.propTypes = {
  topicStore: PropTypes.instanceOf(TopicStore),
}

TopicList.propTypes = {
  location: PropTypes.object.isRequired,
}

export default TopicList
