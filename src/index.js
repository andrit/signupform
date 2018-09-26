import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

let rootElement = document.getElementById('root');
ReactDOM.render(<App formHash={rootElement.getAttribute("hash")}
                    custPhone={rootElement.getAttribute("phone")} />, 
                    document.getElementById('root'));
