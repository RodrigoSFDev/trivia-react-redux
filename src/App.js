import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';
import './App.css';
import Ranking from './pages/Ranking';

class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/game" component={ Game } />
          <Route exact path="/settings" component={ Settings } />

          <Route path="/ranking" component={ Ranking } />
        </Switch>
      </div>
    );
  }
}

export default App;
