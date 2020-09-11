import React from 'react';
import './UnfinishedGame.css';

import {
  withRouter,
  Link
} from "react-router-dom";

class UnfinishedGame extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      biribaNotes: this.props.biribaNotes,
      gameFinished: false
    };
    this.toggleList = this.toggleList.bind(this);
    this.onScoreChange = this.onScoreChange.bind(this);
    this.updateBiribaNotes = this.updateBiribaNotes.bind(this);
    this.resetBiribaNotes = this.resetBiribaNotes.bind(this);
    this.onRoundInfoChange = this.onRoundInfoChange.bind(this);
    this.newRound = this.newRound.bind(this);
    this.hasGameFinished = this.hasGameFinished.bind(this);
    this.moveGameToFinished = this.moveGameToFinished.bind(this);
  }

  componentDidMount() {
    this.hasGameFinished();
  }

  toggleList(e) {
    let button = document.getElementById(e.target.id);
    let activateClass = e.target.id.split("_")[0];
    button.nextElementSibling.classList.toggle(activateClass);
  }

  onScoreChange(e) {
    // given id of button with name "scoreType_#round_#teamId"
    let args = e.target.id.split("_");
    let scoreType = args[0];
    let roundOfScore = args[1];
    let teamId = args[2];

    let biribaNotes = this.state.biribaNotes;
    biribaNotes.unfinishedGames[this.props.unfinishedGameId].rounds.forEach((round, rIndex)=> {
      if(Number(round.round) === Number(roundOfScore)) {
        round.scores.forEach((score, sIndex)=> {
          if(Number(score.teamId) === Number(teamId)) {
            if(scoreType === "biribaScore") {
              score.biribaScore = e.target.value;
            } else if (scoreType === "countCardsScore") {
              score.countCardsScore = e.target.value;
            } else if (scoreType === "penalties") {
              score.penalties = e.target.value;
            } else if (scoreType === "close") {
              score.close = !score.close;
            }
          }
        });
      }
    });

    this.setState({
      biribaNotes: biribaNotes
    });
  }

  onRoundInfoChange(e) {
    // given id format of "nameOfField_#idOfRound"
    let args = e.target.id.split("_");
    let field = args[0];
    let roundOfInfo = args[1];
    let biribaNotes = this.state.biribaNotes;
    biribaNotes.unfinishedGames[this.props.unfinishedGameId].rounds.forEach((round, rIndex) => {
      if(Number(round.round) === Number(roundOfInfo)) {
        round[field] = e.target.value
      }
    });

    this.setState({
      biribaNotes: biribaNotes
    });
  }

  hasGameFinished() {
    let ended = false;
    let biribaNotes = this.state.biribaNotes;
    biribaNotes.unfinishedGames[this.props.unfinishedGameId].teams.forEach((team, tIndex) => {
      let teamScore = 0;
      biribaNotes.unfinishedGames[this.props.unfinishedGameId].rounds.forEach((round, rIndex) => {
        round.scores.forEach((score, sIndex) => {
          if(Number(score.teamId) === Number(team.id)) {
            teamScore += Number(score.biribaScore) + Number(score.countCardsScore)
              - Number(score.penalties);
            if(score.close) {
              teamScore += 100;
            }
          }
        });
      });
      if(teamScore >= 3010) {
        ended = true;
      }
    });
    this.setState({
      gameFinished: ended
    });
  }

  moveGameToFinished() {
    let biribaNotes = this.state.biribaNotes;
    biribaNotes.unfinishedGames[this.props.unfinishedGameId].finished = true;
    biribaNotes.finishedGames.push(
      biribaNotes.unfinishedGames[this.props.unfinishedGameId]
    );

    this.setState({
      biribaNotes: biribaNotes
    });
    this.updateBiribaNotes(biribaNotes);
    this.props.history.push("/biriba");
  }

  updateBiribaNotes() {
    this.props.updateBiribaNotes(this.state.biribaNotes);
    this.hasGameFinished();
    console.log("File updating...");
    this.props.updateFile(this.state.biribaNotes);
  }

  resetBiribaNotes() {
    this.setState({
      biribaNotes: this.props.biribaNotes
    });
  }

  newRound() {
    let biribaNotes = this.state.biribaNotes;
    
    let numberOfPlayers = biribaNotes.unfinishedGames[this.props.unfinishedGameId].players.length;

    // id of last rounds card dealer
    let roundsLength = biribaNotes.unfinishedGames[this.props.unfinishedGameId].rounds.length;
    let cardDealerId = biribaNotes.unfinishedGames[this.props.unfinishedGameId].rounds[roundsLength-1]
      .cardDealer;

    let newRoundsCardDealerId = cardDealerId + 1;
    if(newRoundsCardDealerId >= numberOfPlayers) {
      newRoundsCardDealerId = 0;
    }

    let newRoundsBiribaDealerId = newRoundsCardDealerId - 1;
    if(newRoundsBiribaDealerId < 0) {
      newRoundsBiribaDealerId = numberOfPlayers - 1;
    }

    let newRound = {
      "round": roundsLength+1,
      "scores": [],
      "cardDealer": Number(newRoundsCardDealerId),
      "biribaDealer": Number(newRoundsBiribaDealerId),
      "trumpNumber": 1,
      "trumpSymbol": "KA"
    };
    biribaNotes.unfinishedGames[this.props.unfinishedGameId].teams.forEach((team, tIndex) => {
      newRound.scores.push({
        "teamId": team.id,
        "countCardsScore": 0,
        "biribaScore": 0,
        "penalties": 0,
        "close": false
      });
    });
    
    biribaNotes.unfinishedGames[this.props.unfinishedGameId].rounds.push(newRound);
    
    this.setState({
      biribaNotes: biribaNotes
    });
    this.updateBiribaNotes(biribaNotes);
  }

  render() {

    // collect all data for the specified game id
    let gameDiv = [];
    let unfinishedGame = this.state.biribaNotes.unfinishedGames[this.props.unfinishedGameId];
    let roundLength = unfinishedGame.rounds.length;

    // gather data for each round
    let roundDiv = [];
    unfinishedGame.rounds.forEach((round, rIndex) => {

      // data for each team of the specific round

      let maxTotalScore = -1;
      
      let teamRoundDiv = [];
      let totalRoundScore = 0;
      unfinishedGame.teams.forEach((team, tIndex) => {
        
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
                    onChange={this.onScoreChange}
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
                    onChange={this.onScoreChange}
                  />
                </div>
                <div>
                  <p>Penalties</p>
                  <input
                    id={"penalties_"+round.round+"_"+score.teamId} 
                    type="number"
                    min="0"
                    defaultValue={score.countCardsScore} 
                    onChange={this.onScoreChange}
                  />
                </div>
                <div>
                  <p>Close</p>
                  <input
                    id={"close_"+round.round+"_"+score.teamId} 
                    type="checkbox"
                    checked={score.close}
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
      unfinishedGame.players.forEach((player, pIndex) => {
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
                  onChange={this.onRoundInfoChange}
                  defaultValue={biribaDealerId}
                >
                  {candidates}
                </select>
              </div>
              <div className="info">
                <p>Card dealer</p>
                <select
                  id={"cardDealer_"+round.round}
                  onChange={this.onRoundInfoChange}
                  defaultValue={cardDealerId}
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
                  onChange={this.onRoundInfoChange}
                >
                  {candidateCardNumbers}
                </select>
                <select
                  defaultValue={round.trumpSymbol}
                  id={"trumpSymbol_"+round.round} 
                  style={{gridColumn:"2/3", gridRow:"2/3"}}
                  onChange={this.onRoundInfoChange}
                >
                  {candidateCardSymbols}
                </select>
              </div>
            </div>
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
          </div>
        </div>
      );
    });

    let button = <button
                    key={"gameFinishedButton"+this.state.gameFinished}
                    onClick={this.newRound}
                  >
                    <i className="fa fa-plus" />
                  </button>;
    if(this.state.gameFinished) {
        button = <button
                    key={"gameFinishedButton"+this.state.gameFinished}
                    onClick={this.moveGameToFinished}
                    className="new-game-div-button-ended"
                  >
                    Game ended (move to finished)
                  </button>;
    }

    gameDiv.push(
      <div className="game-div" key={"gameDiv"}>
        {roundDiv}
        <div className="new-game-div">
          {button}
        </div>
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

export default withRouter(UnfinishedGame);