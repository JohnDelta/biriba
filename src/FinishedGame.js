import React from 'react';
import './FinishedGame.css';

import {
  withRouter,
  Link
} from "react-router-dom";

class FinishedGame extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      biribaNotes: this.props.biribaNotes,
    };
    this.toggleList = this.toggleList.bind(this);
  }

  toggleList(e) {
    let button = document.getElementById(e.target.id);
    let activateClass = e.target.id.split("_")[0];
    button.nextElementSibling.classList.toggle(activateClass);
  }

  render() {

    // collect all data for the specified game id
    let gameDiv = [];
    let finishedGame = this.state.biribaNotes.finishedGames[this.props.finishedGameId];

    // gather data for each round
    let roundDiv = [];
    finishedGame.rounds.forEach((round, rIndex) => {

      // data for each team of the specific round

      let maxTotalScore = -1;
      
      let teamRoundDiv = [];
      let totalRoundScore = 0;
      finishedGame.teams.forEach((team, tIndex) => {
        
        // gather round score data for each team
        let roundScoreDiv = [];
        round.scores.forEach((score, sIndex) => {
          if(Number(score.teamId) === Number(team.id)) {
            totalRoundScore = Number(score.biribaScore) + Number(score.countCardsScore) - Number(score.penalties);
            roundScoreDiv.push(
              <div className="round-score-div" key={"roundScoreDiv"+tIndex+sIndex}>
                <p>Round scores</p>
                <div>
                  <p>Biriba score</p>
                  <input
                    id={"biribaScore_"+round.round+"_"+score.teamId} 
                    type="number"
                    min="0"
                    defaultValue={score.biribaScore} 
                    readOnly={true}
                  />
                </div>
                <div>
                  <p>Count cards score</p>
                  <input
                    id={"countCardsScore_"+round.round+"_"+score.teamId} 
                    type="number"
                    min="0"
                    max="2000"
                    defaultValue={score.countCardsScore}
                    readOnly={true}
                  />
                </div>
                <div>
                  <p>Penalties</p>
                  <input
                    id={"penalties_"+round.round+"_"+score.teamId} 
                    type="number"
                    min="0"
                    defaultValue={score.countCardsScore} 
                    readOnly={true}
                  />
                </div>
                <div>
                  <p>Close</p>
                  <input
                    id={"close_"+round.round+"_"+score.teamId} 
                    type="checkbox"
                    checked={score.close}
                    unselectable={"true"}
                    readOnly={true}
                  />
                </div>
              </div>
            );
          }
        });

        let totalScore = 0;
        //get total score for one team from all rounds
        finishedGame.rounds.forEach((round2, rIndex2) => {
          round2.scores.forEach((score2, sIndex2) => {
            if(Number(team.id) === Number(score2.teamId)) {
              totalScore += Number(score2.biribaScore) + Number(score2.countCardsScore) - Number(score2.penalties);
              if(score2.close) {
                totalScore += 100;
              }
            }
          });
        });

        if(maxTotalScore < totalScore) {
          maxTotalScore = totalScore;
        }

        roundScoreDiv.push(
          <div className="round-score-div" key={"totalScores"+tIndex+rIndex} >
            <p>Total scores</p>
              <div>
                <p>Total round score</p>
                <input 
                  key={totalRoundScore}
                  type="number"
                  min="0"
                  readOnly={true}
                  defaultValue={totalRoundScore} 
                />
              </div>
              <div>
                <p>Total score</p>
                <input
                  key={totalScore}
                  type="number"
                  min="0"
                  readOnly={true}
                  defaultValue={totalScore} 
                />
              </div>
          </div>
        );

        // gather members of team
        let teamDiv = [];
        let members = [];
        team.members.forEach((member, mIndex) => {
          members.push(
            <div key={"member"+mIndex+tIndex}>
              {finishedGame.players[member.id].name}
            </div>
          );
        });
        teamDiv.push(
          <div className="team-div" key={"teamDiv"+rIndex+tIndex}>
            <button
              id={"team-info-div-active_"+rIndex+"_"+tIndex}
              onClick={this.toggleList}
            >
              Team {team.id} ({totalScore})
            </button>
            <div className="team-info-div">
              <div className="team-members-div">
                <p>Members</p>
                <div className="members">
                  {members}
                </div>
              </div>
              {roundScoreDiv}
            </div>
          </div>
        );

        teamRoundDiv.push(
          <div className="team-round-div" key={"teamRoundDiv"+rIndex+tIndex}>
            {teamDiv}
          </div>
        );
      });

      // find biriba & card dealer candidates 
      let candidates = [];
      let biribaDealerId = "";
      let cardDealerId = "";
      finishedGame.players.forEach((player, pIndex) => {
        if(player.id === round.biribaDealer) {
          biribaDealerId = player.id;
        }
        if(player.id === round.cardDealer) {
          cardDealerId = player.id;
        }
        candidates.push(
          <option key={"candidates_"+pIndex+rIndex} value={player.id}>{player.name}</option>
        );
      });

      // find trump card
      let cardNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A", "-"];
      let cardSymbols = ["KA", "TR", "SP", "KO", "JO"];
      let candidateCardNumbers = [];
      let candidateCardSymbols = [];
      
      cardNumbers.forEach((cardNumber, cIndex) => {
        candidateCardNumbers.push(
          <option key={"candidateCardNumbers_"+rIndex+cIndex} value={cardNumber}>{cardNumber}</option>
        );
      });

      cardSymbols.forEach((cardSymbol, cIndex) => {
        candidateCardSymbols.push(
          <option key={"candidateCardSymbols_"+cIndex+rIndex} value={cardSymbol}>{cardSymbol}</option>
        );
      });

      roundDiv.push(
        <div className="round-div" key={"roundDiv"+rIndex}>
          <button
            id={"teams-round-div-active_"+rIndex}
            onClick={this.toggleList} 
          >
            Round {round.round}
          </button>
          <div className="teams-round-div">
            {teamRoundDiv}
            <div className="round-info">
              <div className="info">
                <p>Biriba dealer</p>
                <select
                  id={"biribaDealer_"+round.round}
                  defaultValue={biribaDealerId}
                  disabled={true}
                >
                  {candidates}
                </select>
              </div>
              <div className="info">
                <p>Card dealer</p>
                <select
                  id={"cardDealer_"+round.round}
                  defaultValue={cardDealerId}
                  disabled={true}
                >
                  {candidates}
                </select>
              </div>
              <div className="info">
                <p>Trump</p>
                <select
                  defaultValue={round.trumpNumber}
                  id={"trumpNumber_"+round.round} 
                  style={{gridColumn:"1/2", gridRow:"2/3"}}
                  disabled={true}
                >
                  {candidateCardNumbers}
                </select>
                <select
                  defaultValue={round.trumpSymbol}
                  id={"trumpSymbol_"+round.round} 
                  style={{gridColumn:"2/3", gridRow:"2/3"}}
                  disabled={true}
                >
                  {candidateCardSymbols}
                </select>
              </div>
            </div>
          </div>
        </div>
      );
    });

    gameDiv.push(
      <div className="game-div" key={"gameDiv"}>
        {roundDiv}
      </div>
    );

    return (
      <div className="FinishedGame">
        <div className="FinishedGame-container">
          <div className="header">
            <p>Unfinished Game {this.props.finishedGameId}</p>
            <Link to="/biriba/history" >
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

export default withRouter(FinishedGame);