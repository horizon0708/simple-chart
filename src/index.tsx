import * as React from 'react';
import 'reflect-metadata';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import 'bulma/css/bulma.css';
//https://github.com/jgthms/bulma/issues/388

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
