import React from 'react'
import {
  Route,
  Redirect,
  withRouter,
} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  inject,
  observer,
} from 'mobx-react'

import TopicList from '../views/topic-list/index'
import TopicDetail from '../views/topic-detail/index'
import ApiTest from '../views/test/api-test'
import Login from '../views/user/login'
import Info from '../views/user/info'
import TopicCreate from '../views/topic-create/index'

const PrivateRoute = ({ isLogin, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={
        (props) => (isLogin ? <Component {...props} /> : <Redirect to={{ pathname: '/user/login', search: `?from=${rest.path}` }} />)
      }
    />
  )
}

PrivateRoute.propTypes = {
  isLogin: PropTypes.bool,
  props: PropTypes.object,
  component: PropTypes.func.isRequired,
  rest: PropTypes.object,
}

PrivateRoute.defaultProps = {
  isLogin: false,
}

const InjectedPrivateRoute = withRouter(inject((storts) => {
  return {
    isLogin: storts.appState.user.isLogin,
  }
})(observer(PrivateRoute)))

export default () => [
  <Route path="/" key="home" render={() => <Redirect to="/list" />} exact />,
  <Route path="/list" key="list" component={TopicList} />,
  <Route path="/detail/:id" key="detail" component={TopicDetail} />,
  <Route path="/test" key="test" component={ApiTest} />,
  <Route path="/user/login" key="user/login" component={Login} />,
  <InjectedPrivateRoute path="/user/info" key="user/ingo" component={Info} />,
  <InjectedPrivateRoute path="/topic/create" key="topic/create" component={TopicCreate} />,
]
