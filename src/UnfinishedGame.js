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
    this.state = {
      biribaNotes: this.props.biribaNotes
    };
    this.toggleList = this.toggleList.bind(this);
    this.onScoreChange = this.onScoreChange.bind(this);
    this.updateBiribaNotes = this.updateBiribaNotes.bind(this);
    this.resetBiribaNotes = this.resetBiribaNotes.bind(this);
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

  toggleList(e) {
    let button = document.getElementById(e.target.id);
    let activateClass = e.target.id.split("_")[0];
    button.nextElementSibling.classList.toggle(activateClass);
  }

  onScoreChange(e) {
    // given id of button with name "scoreType_#round_#score.Id"
    let args = e.target.id.split("_");
    let scoreType = args[0];
    let roundOfScore = args[1];
    let scoreId = args[2];

    let biribaNotes = this.state.biribaNotes;
    biribaNotes.unfinishedGames[this.props.unfinishedGameId].rounds.forEach((round, rIndex)=> {
      if(Number(round.round) === Number(roundOfScore)) {
        round.scores.forEach((score, sIndex)=> {
          if(Number(score.id) === Number(scoreId)) {
            if(scoreType === "biribaScore") {
              score.biribaScore = e.target.value;
            } else if (scoreType === "countCardsScore") {
              score.countCardsScore = e.target.value;
            } else if (scoreType === "penalties") {
              score.penalties = e.target.value;
            } 
          }
        });
      }
    });

    this.setState({
      biribaNotes: biribaNotes
    });
  }

  updateBiribaNotes() {
    this.props.updateBiribaNotes(this.state.biribaNotes);
    console.log("File updating...");
    this.props.updateFile();
  }

  resetBiribaNotes() {
    this.setState({
      biribaNotes: this.props.biribaNotes
    });
  }

  render() {

    // collect all data for the specified game id
    let gameDiv = [];
    let unfinishedGame = this.state.biribaNotes.unfinishedGames[this.props.unfinishedGameId];
    
    // gather data for each round
    let roundDiv = [];
    unfinishedGame.rounds.forEach((round, rIndex) => {

      // data for each team of the specific round
      
      let teamRoundDiv = [];
      let totalRoundScore = 0;
      unfinishedGame.teams.forEach((team, tIndex) => {
        
        // gather round score data for each team
        let roundScoreDiv = [];
        round.scores.forEach((score, sIndex) => {
          if(Number(score.id) === Number(team.id)) {
            totalRoundScore = Number(score.biribaScore) + Number(score.countCardsScore) - Number(score.penalties);
            roundScoreDiv.push(
              <div className="round-score-div" key={"roundScoreDiv"+tIndex+sIndex}>
                <p>Round scores</p>
                <div>
                  <p>Biriba score</p>
                  <input
                    id={"biribaScore_"+round.round+"_"+score.id} 
                    type="number"
                    min="0"
                    defaultValue={score.biribaScore} 
                    onChange={this.onScoreChange}
                  />
                </div>
                <div>
                  <p>Count cards score</p>
                  <input
                    id={"countCardsScore_"+round.round+"_"+score.id} 
                    type="number"
                    min="0"
                    max="2000"
                    defaultValue={score.countCardsScore}
                    onChange={this.onScoreChange}
                  />
                </div>
                <div>
                  <p>Penalties</p>
                  <input
                    id={"penalties_"+round.round+"_"+score.id} 
                    type="number"
                    min="0"
                    defaultValue={score.countCardsScore} 
                    onChange={this.onScoreChange}
                  />
                </div>
              </div>
            );
          }
        });

        let totalScore = 0;
        //get total score for one team from all rounds
        unfinishedGame.rounds.forEach((round2, rIndex2) => {
          round2.scores.forEach((score2, sIndex2) => {
            if(Number(team.id) === Number(score2.id)) {
              totalScore += Number(score2.biribaScore) + Number(score2.countCardsScore) - Number(score2.penalties);
            }
          });
        });

        roundScoreDiv.push(
          <div className="round-score-div" key={"totalScores"+tIndex+rIndex} >
            <p>Total scores</p>
              <div>
                <p>Total round score</p>
                <input 
                  type="number"
                  min="0"
                  readOnly={true}
                  defaultValue={totalRoundScore} 
                />
              </div>
              <div>
                <p>Total score</p>
                <input 
                  type="number"
                  min="0"
                  readOnly={true}
                  defaultValue={totalScore} 
                />
              </div>
          </div>
        );

        roundScoreDiv.push(
          <div className="save-options" key={"saveOption"}>
            <button
              onClick={this.updateBiribaNotes}
            >
              Save changes
            </button>
            <button
              onClick={this.resetBiribaNotes}
            >
              Reset data
            </button>
          </div>
        );

        // gather members of team
        let teamDiv = [];
        let members = [];
        team.members.forEach((member, mIndex) => {
          members.push(
            <div key={"member"+mIndex+tIndex}>
              {unfinishedGame.players[member.id].name}
            </div>
          );
        });
        teamDiv.push(
          <div className="team-div" key={"teamDiv"+rIndex+tIndex}>
            <button
              id={"team-info-div-active_"+rIndex+"_"+tIndex}
              onClick={this.toggleList}
            >
              Team {team.id}
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