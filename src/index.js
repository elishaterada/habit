import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import Routes from './helpers/Routes';
import './index.css';

ReactDOM.render(
  <Routes />,
  document.getElementById('root'));
registerServiceWorker();
