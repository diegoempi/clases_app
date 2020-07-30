import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import generateStore from "./redux/store";

const store = generateStore()

ReactDOM.render(
  <React.StrictMode>
    <App store = {store} />
  </React.StrictMode>,
  document.getElementById('root')
);
