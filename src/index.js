import React from 'react'
import ReactDOM from 'react-dom'
// your main file that renders a Router
import { Router, browserHistory } from 'react-router'
import './index.css';
// import App from './App';
import routes from './router'
import registerServiceWorker from './registerServiceWorker';
console.log(Router)

debugger;
ReactDOM.render(<Router history={browserHistory} routes={routes}/>, document.getElementById('root'));
registerServiceWorker();
