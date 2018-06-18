import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import {
  inject,
  observer,
} from 'mobx-react'

import AppBar from 'material-ui/AppBar'
import ToolBar from 'material-ui/Toolbar'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import HomeIcon from 'material-ui-icons/Home'

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
}

@inject(stores => ({
  appState: stores.appState,
})) @observer
class MainAppBar extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }
  static contextTypes = {
    router: PropTypes.object,
  }
  onHomeIconClick = () => {
    this.context.router.history.push({
      pathname: '/list',
      search: '?tab=good',
    })
  }
  createButtonClick = () => {
    this.context.router.history.push('/topic/create')
  }
  loginButtonClick = () => {
    const { appState } = this.props
    if (appState.user.isLogin) {
      this.context.router.history.push({
        pathname: '/user/info',
      })
    } else {
      this.context.router.history.push({
        pathname: '/user/login',
      })
    }
  }
  render() {
    const { classes, appState } = this.props
    const user = appState.user.info
    return (
      <div className={classes.root} >
        <AppBar>
          <ToolBar>
            <IconButton color="default" onClick={this.onHomeIconClick} >
              <HomeIcon />
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex} >
              JNode
            </Typography>
            <Button variant="raised" color="primary" onClick={this.createButtonClick} >
              新建话题
            </Button>
            <Button variant="flat" color="default" onClick={this.loginButtonClick}>
              {user.loginname ? user.loginname : '登录'}
            </Button>
          </ToolBar>
        </AppBar>
      </div>
    )
  }
}

MainAppBar.wrappedComponent.propTypes = {
  appState: PropTypes.object.isRequired,
}
export default withStyles(styles)(MainAppBar)
