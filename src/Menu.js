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

  constructor(props){
    super(props);
  }

  render() {
      return (
        <Router>
          <div className="Menu">

            <Switch>
              <Route exact path="/biriba">
                <div className="menu-container">
                    <div className="intro">
                        <h1>Menu</h1>
                    </div>
                    <Link to="/biriba/new-game">
                        <i className="fa fa-plus" />
                        <p>New Game Notes</p>
                    </Link>
                    <Link to="/biriba/unfinished-games">
                        <i className="fa fa-edit" />
                        <p>Unfinished Game Notes</p>
                    </Link>
                    <Link to="/biriba/history">
                        <i className="fa fa-clipboard" />
                        <p>History</p>
                    </Link>
                </div>
              </Route>

              <Route exact path="/biriba/new-game">
                <NewGame
                  biribaNotes={this.props.biribaNotes}
                  updateBiribaNotes={this.props.updateBiribaNotes}
                  readFile={this.props.readFile}
                  uploadFile={this.props.uploadFile}   
                  checkFileExists={this.props.checkFileExists}
                />
              </Route>

            </Switch>

          </div>
      </Router>  
      );
  }

}

export default Menu;