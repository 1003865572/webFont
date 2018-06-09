import React from 'react';
import { Link } from 'react-router-dom';
import Routes from '../config/router';

export default class App extends React.Component {
  componentWillMount() {
    // do something her
  }

  render() {
    return [
      <div key="nav">
        this is a app<br />
        <Link to="/">home</Link><br />
        <Link to="/detail">detail</Link><br />
      </div>,
      <Routes key="routes" />,
    ]
  }
}
