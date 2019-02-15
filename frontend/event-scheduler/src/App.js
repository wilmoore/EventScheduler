import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import './App.css';

import Auth from './Components/Auth/Auth';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Redirect from="/" to="/auth" exact />
          <Route path="/auth" component={Auth} />
          <Route path="/events" component={null} />
          <Route path="/bookings" component={null} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;