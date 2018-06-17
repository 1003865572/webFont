import bak from './bak.png';

export const userStyles = theme => ({
  avatar: {
    background: theme.palette.primary[500],
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '40px 0',
    position: 'relative',
  },
  bg: {
    background: theme.palette.primary[100],
    backgroundImage: `url(${bak})`,
    backgroundSize: '100% auto',
    width: '100%',
    height: '100%',
    position: 'absolute',
    filter: 'blur(2px)',
    opacity: '.2',
  },
  avatarImg: {
  },
  userName: {
    zIndex: 10,
  },
})

export default {}
