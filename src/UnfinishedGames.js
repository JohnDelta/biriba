import React from 'react';
import './UnfinishedGames.css';

import {
  withRouter,
  Link
} from "react-router-dom";

class UnfinishedGames extends React.Component {

  constructor(props){
    super(props);

    this.enterUnfinishedGame = this.enterUnfinishedGame.bind(this);
  }

  enterUnfinishedGame(e) {
    let unfinishedGameId = e.target.id.split("_")[1]; // given button id format of name_#game-id
    this.props.updateUnfinishedGameId(unfinishedGameId);
    this.props.history.push("/biriba/unfinished-games/game");
  }

  render() {

    let unfinishedGamesDiv = [];

    if(this.props.biribaNotes && this.props.biribaNotes.unfinishedGames) {
      this.props.biribaNotes.unfinishedGames.forEach((unfinishedGame, uIndex) => {
        if(!unfinishedGame.finished) {
          // search all teams and gather the maximum score of all
          let maxScore = -1;
          unfinishedGame.teams.forEach((team, tIndex) => {
            let teamsTotalScore = 0;
            unfinishedGame.rounds.forEach((round, rIndex) => {
              round.scores.forEach((score, sIndex) => {
                if(Number(team.id) === Number(score.teamId)) {
                  teamsTotalScore += Number(score.biribaScore) + Number(score.countCardsScore) - Number(score.penalties);
                  if(score.close) {
                    teamsTotalScore += 100;
                  }
                }
              });
            });
            if(maxScore < teamsTotalScore) {
              maxScore = teamsTotalScore;
            }
          });

          unfinishedGamesDiv.push(
            <div className="UnfinishedGame-part" key={"UnfinishedGame-part"+uIndex}
                id={"unfinishedGame_"+uIndex} onClick={this.enterUnfinishedGame}>
              <p className="title">Game:#{uIndex}</p>
              <div className="inline">
                <i className="fa fa-calendar" />
                <p className="date">{unfinishedGame.date}</p>
              </div>
              <p>Players: {unfinishedGame.players.length}</p>
              <p>Max score: {maxScore}</p>
              <p>Teams: {unfinishedGame.teams.length}</p>
              <p>Current round: {unfinishedGame.rounds.length}</p>
            </div>
          ) 
        }
      });
    }

    if(unfinishedGamesDiv.length === 0) {
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
        </div>;
      </div>  
    );
  }

}

export default withRouter(UnfinishedGames);