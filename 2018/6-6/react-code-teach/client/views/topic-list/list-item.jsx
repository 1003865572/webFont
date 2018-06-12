import React from 'react'
import PropTypes from 'prop-types'

import ListItem from 'material-ui/List/ListItem'
import ListItemAvatar from 'material-ui/List/ListItemAvatar'
import ListItemText from 'material-ui/List/ListItemText'
import { withStyles } from 'material-ui/styles'
import Avatar from 'material-ui/Avatar'

import { topicPrimaryStyle, topicSecondaryStyles } from './styles'

const Primary = ({ classes, topic }) => (
  <div className={classes.root} >
    <span className={classes.tab}>{topic.tab}</span>
    <span className={classes.title}>{topic.title}</span>
  </div>
)
const StyledPrimary = withStyles(topicPrimaryStyle)(Primary)

const Secondary = ({ classes, topic }) => (
  <span className={classes.root} >
    <span className={classes.userName} >{topic.author.loginname}</span>
    <span className={classes.count} >
      <span className={classes.accentColor} >{topic.reply_count}</span>
      <span>/</span>
      <span>{topic.visit_count}</span>
    </span>
    <span>创建时间: {topic.create_at}</span>
  </span>
)
const StyledSecondary = withStyles(topicSecondaryStyles)(Secondary)

Primary.propTypes = {
  topic: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

Secondary.propTypes = {
  topic: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}


const TopicListItem = ({ onClick, topic }) => (
  <ListItem button onClick={onClick}>
    <ListItemAvatar>
      <Avatar src={topic.author.avatar_url} />
      {/* <IconHome /> */}
    </ListItemAvatar>
    <ListItemText
      primary={<StyledPrimary topic={topic} />}
      secondary={<StyledSecondary topic={topic} />}
    />
  </ListItem>
)

TopicListItem.propTypes = {
  topic: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
}
export default TopicListItem
