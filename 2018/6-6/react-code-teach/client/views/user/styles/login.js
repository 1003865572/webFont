export const login = theme => ({
  login: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 250,
    flexDirection: 'column',
    '& label': {
      fontSize: 12,
    },
  },
  input: {
    margin: theme.spacing.unit,
  },
})
export default {}
