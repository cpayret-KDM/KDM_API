import React, { Component } from 'react';
import Routes from './routes/Routes';
import './assets/scss/Saas.scss';

// setup fake backend
import { configureFakeBackend } from './helpers';
configureFakeBackend();

class App extends Component {
  render() {
    return <Routes></Routes>;
  }
}

export default App;
