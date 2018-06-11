import React from 'react';
import {
  observer,
  inject,
} from 'mobx-react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import AppState from '../../store/app-state'

@inject('appState') @observer
export default class TopicList extends React.Component {
  static propTypes = {
    appState: PropTypes.instanceOf(AppState),
  }
  asyncBootstrap = () => {
    console.log('asyncBootstrap')
    return new Promise((resolve) => {
      setTimeout(() => {
        this.props.appState.count = 5
        resolve(true)
      }, 1000)
    })
  }
  changeName = (event) => {
    this.props.appState.changeName(event.target.value)
  }
  render() {
    return (
      <div>
        <Helmet>
          <title>this is topicList</title>
          <meta name="description" content="this is description" />
        </Helmet>
        <input type="text" onChange={this.changeName} />
        {this.props.appState.msg}
      </div>
    )
  }
}
