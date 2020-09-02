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
    this.toggleTeamRoundsDiv = this.toggleTeamRoundsDiv.bind(this);
  }

  /**
   *  - rounds {list} {
    *  - team # {
    * 
      * - members {list}
      * 
      * - round {
      *  -biriba score, count cards, penalties
      *  -atou
      *  -player
      * }
    * 
    * }
   * }
   */

  toggleTeamRoundsDiv(e) {
    let button = document.getElementById(e.target.id);
    button.nextElementSibling.classList.toggle("team-rounds-div-active");
  }

  render() {

    // collect all data for the specified game id
    let gameDiv = [];
    let unfinishedGame = this.props.biribaNotes.unfinishedGames[this.props.unfinishedGameId];
    
    // gather data for each round
    let roundDiv = [];
    unfinishedGame.rounds.forEach((round, rIndex) => {

      // data for each team of the specific round
      
      let teamRoundDiv = [];
      unfinishedGame.teams.forEach((team, tIndex) => {
        
        // gather members of team
        let membersDiv = [];
        let members = [];
        team.members.forEach((member, mIndex) => {
          members.push(
            <div>{unfinishedGame.players[member.id].name}</div>
          );
        });
        membersDiv.push(
          <div className="members-div">
            <p>Team: {team.id}</p>
            {members}
          </div>
        );

        // gather round score data for each team
        let roundScoreDiv = [];
        round.scores.forEach((score, sIndex) => {
          if(Number(score.id) === Number(team.id)) {
            roundScoreDiv.push(
              <div className="round-score-div">
                <div>Biriba score: {score.biribaScore} FIELD</div>
                <div>Cound cards score: {score.countCardsScore} FIELD</div>
              </div>
            );
          }
        });

        teamRoundDiv.push(
          <div classname="team-round-div">
            {membersDiv}
            {roundScoreDiv}
          </div>
        );
      });

      roundDiv.push(
        <div className="round-div">
          <button
            id={"round-div_"+rIndex}
            onClick={this.toggleTeamRoundsDiv} 
          >
            Round {round.round}
          </button>
          <div className="team-rounds-div">
            {teamRoundDiv}
          </div>
        </div>
      );
    });

    gameDiv.push(
      <div className="game-div">
        {roundDiv}
      </div>
    );

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
            {gameDiv}
          </div>
        </div>;
      </div>  
    );
  }

}

export default UnfinishedGame;