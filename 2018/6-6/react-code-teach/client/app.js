import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader'; // eslint-disable-line
import App from './views/App';

import { AppState } from './store/store'

const initialState = window.__INITIAL_STATE__ || {} // eslint-disable-line

const root = document.getElementById('root');
console.log(initialState)
const render = (Comp) => {
  const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate
  renderMethod(
    <AppContainer>
      <Provider appState={new AppState(initialState.appState)}>
        <BrowserRouter>
          <Comp />
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    root,
  )
}

render(App);

if (module.hot) {
  module.hot.accept('./views/App', () => {
    const NextApp = require('./views/App').default // eslint-disable-line
    render(NextApp);
  })
}
