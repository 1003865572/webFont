import React from 'react';
import {
  observer,
  inject,
} from 'mobx-react';
import PropTypes from 'prop-types';

import { AppState } from '../../store/app-state'

@inject('appState') @observer
export default class TopicList extends React.Component {
  static propTypes = {
    appState: PropTypes.instanceOf(AppState).isRequired,
  }
  componentDidMount() {
    // do something here
  }
  changeName = (event) => {
    // const { appState } = this.props;
    // appState.name = event.target.value
    this.props.appState.changeName(event.target.value)
  }
  render() {
    return (
      <div>
        <input type="text" onChange={this.changeName} />
        {this.props.appState.msg}
      </div>
    )
  }
}
