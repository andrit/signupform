import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

let rootElement = document.getElementById('root');
ReactDOM.render(<App salesman={rootElement.getAttribute("salesman")} />, document.getElementById('root'));
registerServiceWorker();
