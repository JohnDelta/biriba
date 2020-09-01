import React from 'react';
import './UnfinishedGames.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class UnfinishedGames extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      biribaNotes: []
    };
  }

  componentDidMount() {
    this.props.readFile().then((success) => {
      console.log("File read : "+success);
      this.setState({
        biribaNotes: JSON.parse(success.body)
      });
    }).catch((error) => {
      // no available unfinished game
      console.log("No available file : "+error);
    });
  }

  render() {

    let unfinishedGamesDiv = [];

    if(this.state.biribaNotes && this.state.biribaNotes.unfinishedGames) {
      this.state.biribaNotes.unfinishedGames.forEach((unfinishedGame, uIndex) => {
        unfinishedGamesDiv.push(
          <div className="UnfinishedGame-part" key={"UnfinishedGame-part"+uIndex}>
            <p>No{uIndex}</p>
            <div>
              <i className="fa fa-calendar" />
              <p>{unfinishedGame.date}</p>
            </div>
            <p>Teams: {unfinishedGame.teams.length}</p>
          </div>
        )
      });
    }

    if(unfinishedGamesDiv === []) {
      unfinishedGamesDiv = <p>No unfinished games available</p>;
    }

    return (
      <div className="UnfinishedGames">
        <div className="UnfinishedGames-container">
          <div className="header">
          <p>Unfinished Games</p>
            <Link to="/biriba" >
              <i className="fa fa-arrow-left" />
            </Link>
          </div>
          
          <div className="line"></div>

          <div className="section">
            {unfinishedGamesDiv}
          </div>
        </div>
      </div>  
    );
  }

}

export default UnfinishedGames;