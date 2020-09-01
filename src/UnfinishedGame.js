import React from 'react';
import './UnfinishedGame.css';

import {
  BrowserRouter as Router,
  withRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

class UnfinishedGame extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="UnfinishedGame">
        <div className="UnfinishedGame-container">
          <div className="header">
            <p>Unfinished Game {this.props.unfinishedGameId}</p>
            <Link to="/biriba/unfinished-games" >
              <i className="fa fa-arrow-left" />
            </Link>
          </div>
          
          <div className="line"></div>

          <div className="section">
            game info here
          </div>
        </div>;
      </div>  
    );
  }

}

export default UnfinishedGame;