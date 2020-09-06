import React from 'react';
import './History.css';

import {
  withRouter,
  Link
} from "react-router-dom";

class History extends React.Component {

  constructor(props){
    super(props);

    this.enterFinishedGame = this.enterFinishedGame.bind(this);
  }

  enterFinishedGame(e) {
    let finishedGameId = e.target.id.split("_")[1]; // given button id format of name_#game-id
    this.props.updateFinishedGameId(finishedGameId);
    this.props.history.push("/biriba/history/game");
  }

  render() {

    let HistoryDiv = [];

    if(this.props.biribaNotes && this.props.biribaNotes.finishedGames) {
      this.props.biribaNotes.finishedGames.forEach((finishedGame, uIndex) => {
        if(finishedGame.finished) {
          // search all teams and gather the maximum score of all
          let maxScore = -1;
          finishedGame.teams.forEach((team, tIndex) => {
            let teamsTotalScore = 0;
            finishedGame.rounds.forEach((round, rIndex) => {
              round.scores.forEach((score, sIndex) => {
                if(Number(team.id) === Number(score.id)) {
                  teamsTotalScore += Number(score.biribaScore) + Number(score.countCardsScore);
                }
              });
            });
            if(maxScore < teamsTotalScore) {
              maxScore = teamsTotalScore;
            }
          });

          HistoryDiv.push(
            <div className="FinishedGame-part" key={"FinishedGame-part"+uIndex}
                id={"FinishedGame_"+uIndex} onClick={this.enterFinishedGame}>
              <p className="title">Game:#{uIndex}</p>
              <div className="inline">
                <i className="fa fa-calendar" />
                <p className="date">{finishedGame.date}</p>
              </div>
              <p>Players: {finishedGame.players.length}</p>
              <p>Max score: {maxScore}</p>
              <p>Teams: {finishedGame.teams.length}</p>
              <p>Current round: {finishedGame.rounds.length}</p>
            </div>
          ) 
        }
      });
    }

    if(HistoryDiv.length === 0) {
      HistoryDiv = <p>No finished games available</p>;
    }

    return (
      <div className="History">
        <div className="History-container">
          <div className="header">
            <p>History</p>
            <Link to="/biriba" >
              <i className="fa fa-arrow-left" />
            </Link>
          </div>
          
          <div className="line"></div>

          <div className="section">
            {HistoryDiv}
          </div>
        </div>;
      </div>  
    );
  }

}

export default withRouter(History);