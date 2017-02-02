import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import 'babel-polyfill';//Makes things like array.find work in IE11

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
