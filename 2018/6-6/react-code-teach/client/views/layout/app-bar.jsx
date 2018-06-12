import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'

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
// instanceOf
class MainAppBar extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }
  /* eslint-disable */
  onHomeIconClick = () => {
    console.log('home click')
  }
  createButtonClick = () => {
    console.log('create button')
  }
  loginButtonClick = () => {
    console.log('login')
  }
  /* eslint-enable */
  render() {
    const { classes } = this.props
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
              登录
            </Button>
          </ToolBar>
        </AppBar>
      </div>
    )
  }
}

export default withStyles(styles)(MainAppBar)
