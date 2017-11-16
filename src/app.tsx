import './app.css';
import './selectBox.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import { BrowserRouter } from 'react-router-dom';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Layout from './components/Layout/Layout';
// import store from './mobx-stores/featureFlags';

ReactDOM.render(<BrowserRouter>
  <Layout />
</BrowserRouter>, document.getElementById('app'));
