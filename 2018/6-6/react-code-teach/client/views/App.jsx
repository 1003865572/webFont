import React from 'react';
import Routes from '../config/router';
import AppBar from './layout/app-bar'

export default class App extends React.Component {
  componentWillMount() {
    // do something her
  }

  render() {
    return [
      <AppBar key="appBar" />,
      <Routes key="routes" />,
    ]
  }
}
