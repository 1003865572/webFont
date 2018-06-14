import React from 'react'
import {
  Route,
  Redirect,
} from 'react-router-dom'

import TopicList from '../views/topic-list/index'
import TopicDetail from '../views/topic-detail/index'
import ApiTest from '../views/test/api-test'
import Login from '../views/user/login'

export default () => [
  <Route path="/" key="home" render={() => <Redirect to="/list" />} exact />,
  <Route path="/list" key="list" component={TopicList} />,
  <Route path="/detail/:id" key="detail" component={TopicDetail} />,
  <Route path="/test" key="test" component={ApiTest} />,
  <Route path="/user/login" key="user/login" component={Login} />,
]
