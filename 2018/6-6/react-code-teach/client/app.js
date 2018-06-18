import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader'; // eslint-disable-line

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import { lightBlue, pink } from 'material-ui/colors'

import App from './views/App';
import { AppState, TopicStore } from './store/store'

const theme = createMuiTheme({
  palette: {
    primary: lightBlue,
    accent: pink,
    type: 'light',
  },
})

const initialState = window.__INITIAL_STATE__ || {} // eslint-disable-line

const createApp = TheApp => {
  class Main extends React.Component {
    componentDidMount() {
      const jssStyles = document.getElementById('jss-server-side')
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }
    render() {
      return <TheApp />
    }
  }
  return Main
}

const root = document.getElementById('root');

const appState = new AppState(initialState.appState)
appState.init(initialState.topicStore)
const topicStore = new TopicStore(initialState.topicStore)

const render = (Comp) => {
  const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate
  renderMethod(
    <AppContainer>
      <Provider appState={appState} topicStore={topicStore} >
        <BrowserRouter>
          <MuiThemeProvider theme={theme}>
            <Comp />
          </MuiThemeProvider>
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    root,
  )
}

render(createApp(App))

if (module.hot) {
  module.hot.accept('./views/App', () => {
    const NextApp = require('./views/App').default // eslint-disable-line
    render(createApp(NextApp))
  })
}
