import React from 'react';
// React Router
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
// Redux
import { connect } from 'react-redux';
import './App.css';

import Login from './components/login';
import NavBar from './components/navBar';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Route path='/' component={NavBar} />
        <Route path='/login' component={Login} />
      </div>
    </Router>
  );
};

const mapStateToProps = state => {
  console.log('APP STATE', state);
  return {
    isLoggedIn: state.isLoggedIn,
  };
};

export default connect(mapStateToProps, {})(App);
