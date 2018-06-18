import React from 'react'
import {
  inject,
  observer,
} from 'mobx-react'
import PropTypes from 'prop-types'
import Container from '../layout/container'
import { tabs } from '../../util/variable-define'

@inject(stores => ({
  topicStore: stores.topicStore,
})) @observer
class TopicCreate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '测试1测试1测试1测试1',
      md: '测试',
      tab: 'dev',
    }
  }
  componentDidMount() {
    // TDD
  }
  changeState = (key, value) => {
    this.setState({ [key]: value })
  }
  doCreateTopci = () => {
    const { title, md, tab } = this.state
    if (title && md) {
      const content = md
      this.props.topicStore.createTopic({ title, content, tab })
        .then(() => {
          this.context.router.history.push('/list')
        })
    }
  }
  render() {
    return (
      <Container>
        <div>
          title:
          <input
            value={this.state.title}
            onChange={e => this.changeState('title', e.target.value)}
          />
          <br />
          body:
          <textarea
            value={this.state.md}
            onChange={e => this.changeState('md', e.target.value)}
          />
          <br />
          类型:
          <select value="dev" onChange={e => this.changeState('tab', e.target.value)} >
            {
              Object.keys(tabs).map(tab => {
                if (tab !== 'all' && tab !== 'good') {
                  return (<option key={tab} value={tab}>{tabs[tab]}</option>)
                }
                return null
              })
            }
          </select>
          <button onClick={this.doCreateTopci} >提交</button>
        </div>
      </Container>
    )
  }
}

TopicCreate.wrappedComponent.propTypes = {
  topicStore: PropTypes.object,
}

export default TopicCreate
