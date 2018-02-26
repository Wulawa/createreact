import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter,  
} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
// your main file that renders a Router
import App from './App';
// import routes from './router'
import registerServiceWorker from './registerServiceWorker';

const render = () => {
  ReactDOM.render((
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  ), document.getElementById('root'));
}
render();
if (module.hot) {
  module.hot.accept('./App', () => {
    render();
  })
}
registerServiceWorker();

