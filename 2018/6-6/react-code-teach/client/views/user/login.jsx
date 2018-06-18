import React from 'react'
import PropTypes from 'prop-types'
import {
  inject,
  observer,
} from 'mobx-react'
import { Redirect } from 'react-router-dom'
import queryString from 'query-string'

import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import { login } from './styles/login'

import UserContainer from './user'

@inject(stores => ({
  appState: stores.appState,
})) @observer
class Login extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }
  constructor(props) {
    super(props)
    this.state = {
      accesstoken: 'ffd8ab88-029c-41fc-b62e-786d2fcfff1d',
      helpText: '',
    }
  }
  componentDidMount() {
    // TDD
  }
  getFrom = (location) => {
    // queryString
    location = location || this.props.location
    const query = queryString.parse(location.search)
    return query.from || '/user/info'
  }
  handleInput = (e) => {
    this.setState({ accesstoken: e.target.value })
  }
  doLogin = () => {
    const { accesstoken } = this.state
    if (!accesstoken) {
      this.setState({ helpText: 'accesstoken is required' })
    } else {
      this.props.appState.login(accesstoken)
        .catch(err => {
          console.log(err)
        })
    }
  }
  render() {
    const { helpText, accesstoken } = this.state
    const { classes, appState } = this.props
    const from = this.getFrom()
    const { isLogin } = appState.user
    if (isLogin) {
      return <Redirect to={from} />
    }
    return (
      <UserContainer>
        <div className={classes.login} >
          <TextField
            label="请输入CNode AccessToken"
            placeholder="请输入CNode AccessToken"
            required
            autoFocus
            helperText={helpText}
            value={accesstoken}
            onChange={this.handleInput}
            className={classes.input}
          />
          <Button variant="raised" color="primary" onClick={this.doLogin}>
            登录
          </Button>
        </div>
      </UserContainer>
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

Login.wrappedComponent.propTypes = {
  appState: PropTypes.object,
}

export default withStyles(login)(Login)
