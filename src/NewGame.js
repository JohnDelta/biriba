import React from 'react';
import './NewGame.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class NewGame extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      numberOfPlayers: 0,
      numberOfTeams: 0,
      players: [], // indexes {"id", "name"}
      teams: [] // indexes {"id", "name", "members[ "id1", "id2" ]"}
    };
    this.onChangeNumberOfPlayers = this.onChangeNumberOfPlayers.bind(this);
    this.submitNumberOfPlayers = this.submitNumberOfPlayers.bind(this);
    this.onChangePlayerNames = this.onChangePlayerNames.bind(this);
    this.submitNumberOfTeams = this.submitNumberOfTeams.bind(this);
    this.onChangeNumberOfTeams = this.onChangeNumberOfTeams.bind(this);
    this.onChangeTeamNames = this.onChangeTeamNames.bind(this);
    this.getAvailablePlayers = this.getAvailablePlayers.bind(this);
  }

  onChangeNumberOfPlayers(e) {
    let number = e.target.value;
    this.setState({
      numberOfPlayers: e.target.value,
      players: []
    });
  }

  submitNumberOfPlayers() {
    if(this.state.numberOfPlayers > 1 && this.state.numberOfPlayers <= 20) {
      let players = [];
      for(let i = 0; i < this.state.numberOfPlayers; i++) {
        players.push({
          "id": i,
          "name": ""
        });
      }
      this.setState({
        players: players
      });
    }
  }

  onChangePlayerNames(e) {
    // given id of form : playerName_# where # is the index in json
    let playerId = e.target.id.split("_")[1]; 
    let playerName = e.target.value;
    let newPlayers = this.state.players;
    newPlayers[playerId]["name"] = playerName;
    this.setState({
      players: newPlayers
    });
  }

  onChangeNumberOfTeams(e) {
    this.setState({
      teams: [],
      numberOfTeams: e.target.value
    });
  }

  submitNumberOfTeams() {
    if(this.state.numberOfTeams >= 2 && this.state.numberOfTeams <= this.state.numberOfPlayers) {
      let teams = [];
      for(let i = 0; i < this.state.numberOfTeams; i++) {
        teams.push({
          "id": i,
          "name": "",
          "members": []
        });
        this.setState({
          teams: teams
        });
      }
    }
  }

  onChangeTeamNames(e) {
    // given id of form : teamrName_# where # is the index in json
    let teamId = e.target.id.split("_")[1]; 
    let teamName = e.target.value;
    let newTeams = this.state.teams;
    newTeams[teamId]["name"] = teamName;
    this.setState({
      teams: newTeams
    });
  }

  getAvailablePlayers() {
    if(this.state.players !== [] && this.state.teams !== [] && this.state.teams.members !== []) {
      let availablePlayers = [];
      this.state.players.forEach((player, pIndex) => {
        let flag = false;
        this.state.teams.forEach((team, tIndex) => {
          team["members"].forEach((member, mIndex) => {
            if(player["id"] === member) {
              flag = true;
            }
          });
        });
        if(!flag) {
          availablePlayers.push(player);
        }
      });
      return availablePlayers;
    }
    return null;
  }

  // map to available players a button to be added to the particular team they are in
  // build a function to get not available players. Actually use the previous one for both of them

  render() {

      let playersDiv = [];
      if(this.state.players !== []) {
        let flag = false;
        this.state.players.forEach((item, index) => {
          flag = true;
          playersDiv.push(
            <div className="player-section" key={"playersDiv"+index}>
              <p className="title">Player: {index+1}</p>
              <input 
                type="text"
                maxLength="20"
                id={"playerName_"+index}
                value={this.state.players[index]["name"]}
                onChange={this.onChangePlayerNames}
                required={true}
              />
              <p>Name</p>
            </div>
          )
        });
        if(flag) {
          playersDiv.unshift(<div className="line" key="playersDiv_0000"></div>);
          playersDiv.push(
                <div className="section" key={"playersDiv9999"}>
                  <input 
                    type="number" 
                    placeholder="2" 
                    maxLength="2"
                    minLength="1"
                    max={this.state.numberOfPlayers}
                    min="2"
                    value={this.state.numberOfTeams}
                    onChange={this.onChangeNumberOfTeams}
                    required={true}
                  />
                  <p>Number of teams</p>
                  <button
                    type="submit"
                    style={{"height":"40px"}} 
                    className="submit-players-button" 
                    onClick={this.submitNumberOfTeams} >
                    Submit names and number of teams
                  </button>
              </div>
          );
        }
      }
      let divs = [];
      let teamsDiv = [];
      if(this.state.teams !== []) {
        let flag = false;
        let availablePlayers = this.getAvailablePlayers();
        
        availablePlayers.forEach((player, index) => {
          divs.push(
            <div key={"availablePlayer_"+index} >{player.name}</div>
          );
        });

        this.state.teams.forEach((item, index) => {
          flag = true;
          teamsDiv.push(
            <div className="player-section" key={"teamsDiv"+index}>
              <p className="title">Team: {index+1}</p>
              <input 
                type="text"
                maxLength="20"
                id={"teamName_"+index}
                value={this.state.teams[index]["name"]}
                onChange={this.onChangeTeamNames}
                required={true}
              />
              <p>Name</p>
              <div className="add-players-div">
                <div className="available-players">
                  {divs}
                </div>
                <div className="added-players">
                </div>
              </div>
            </div>
          );
        });
        if(flag) {
          teamsDiv.unshift(<div className="line" key="teamsDiv_0000"></div>);
        }
      }

      return (
        <div className="NewGame">
            <div className="NewGame-container">
                <div className="header">
                  <p>New Game</p>
                  <a><i className="fa fa-arrow-left" /></a>
                </div>
                
                <div className="line"></div>

                <div className="section">
                  <input 
                    type="number" 
                    placeholder="2" 
                    maxLength="2"
                    minLength="1"
                    max="20"
                    min="2"
                    value={this.state.numberOfPlayers}
                    onChange={this.onChangeNumberOfPlayers}
                  />
                  <p>Number of players</p>
                  <button
                    type="submit" 
                    className="submit-players-button" 
                    onClick={this.submitNumberOfPlayers} >
                    Submit number of players
                  </button>
                </div>

                {playersDiv}

                {teamsDiv}

            </div>
        </div>
      );
  }

}

export default NewGame;