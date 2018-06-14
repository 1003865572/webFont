import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import { login } from './styles/login'

import UserContainer from './user'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      accesstoken: '',
      helpText: '',
    }
  }
  componentDidMount() {
    // TDD
  }
  handleInput = (e) => {
    this.setState({ accesstoken: e.target.value })
  }
  render() {
    const { helpText, accesstoken } = this.state
    const { classes } = this.props
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
          <Button variant="raised" color="primary">
            新建话题
          </Button>
        </div>
      </UserContainer>
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(login)(Login)
