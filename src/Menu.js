import React from 'react';
import './Menu.css';
import NewGame from './NewGame';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class Menu extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
      return (
        <Router>
          <div className="Menu">

            <Switch>

              <Route exact path="/">
                <div className="menu-container">
                    <div className="intro">
                        <h1>Menu</h1>
                    </div>
                    <Link to="/new-game">
                        <i className="fa fa-plus" />
                        <p>New Game Notes</p>
                    </Link>
                    <Link to="/unfinished-games">
                        <i className="fa fa-edit" />
                        <p>Unfinished Game Notes</p>
                    </Link>
                    <Link to="/history">
                        <i className="fa fa-clipboard" />
                        <p>History</p>
                    </Link>
                </div>
              </Route>

              <Route exact path="/new-game">
                <NewGame />
              </Route>

            </Switch>

          </div>
      </Router>  
      );
  }

}

export default Menu;