// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import './App.css'

const App = () => {
  return (
    <Router>
      <Switch>
        {/* <Route path="/login" component={Register} /> */}
        <Route path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
      </Switch>
    </Router>
  );
};

export default App;
