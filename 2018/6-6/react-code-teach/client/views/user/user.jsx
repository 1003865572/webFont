import React from 'react'
import PropTypes from 'prop-types'
import {
  inject,
  observer,
} from 'mobx-react'

import { withStyles } from 'material-ui/styles'
import Avatar from 'material-ui/Avatar'
import UserIcon from 'material-ui-icons/AccountBox'

import Container from '../layout/container'
import { userStyles } from './styles/user'

@inject(stores => ({
  appState: stores.appState,
})) @observer
class User extends React.Component {
  componentDidMount() {
    // TDD
  }
  render() {
    const { classes, children, appState } = this.props
    const user = appState.user.info
    return (
      <Container>
        <div className={classes.avatar} >
          <div className={classes.bg} />
          {
            user.avatar_url ?
              <Avatar className={classes.avatarImg} src={user.avatar_url} /> :
              <Avatar className={classes.avatarImg}>
                <UserIcon />
              </Avatar>
          }
          <span className={classes.userName} >{user.loginname || '未登录'}</span>
        </div>
        {children}
      </Container>
    )
  }
}

User.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.element,
}
User.wrappedComponent.propTypes = {
  appState: PropTypes.object,
}

export default withStyles(userStyles)(User)
