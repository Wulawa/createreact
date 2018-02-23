import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter,  
} from 'react-router-dom'
// your main file that renders a Router
import App from './App';
// import routes from './router'
import registerServiceWorker from './registerServiceWorker';

console.log(App)
ReactDOM.render((
<BrowserRouter>
  <App />
</BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
