import React from 'react';
import './NewGame.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
  Link
} from "react-router-dom";

class NewGame extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      numberOfPlayers: 0,
      numberOfTeams: 0,
      players: [],
      teams: [],
    };
    this.onChangeNumberOfPlayers = this.onChangeNumberOfPlayers.bind(this);
    this.submitNumberOfPlayers = this.submitNumberOfPlayers.bind(this);
    this.onChangePlayerNames = this.onChangePlayerNames.bind(this);
    this.submitNumberOfTeams = this.submitNumberOfTeams.bind(this);
    this.onChangeNumberOfTeams = this.onChangeNumberOfTeams.bind(this);
    this.getAvailablePlayers = this.getAvailablePlayers.bind(this);
    this.addPlayerToTeam = this.addPlayerToTeam.bind(this);
    this.removePlayerFromTeam = this.removePlayerFromTeam.bind(this);
    this.createGameNote = this.createGameNote.bind(this);
    this.getDateToString = this.getDateToString.bind(this);
  }

  onChangeNumberOfPlayers(e) {
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

      let flag = false;
      this.state.players.forEach((player, index) => {
        if(player.name === "") {
          flag = true;
        }
      });

      if(!flag) {
        let teams = [];
        for(let i = 0; i < this.state.numberOfTeams; i++) {
          teams.push({
            "id": i,
            "members": []
          });
          this.setState({
            teams: teams
          });
        }
      }
    }
  }

  getAvailablePlayers() {
    if(this.state.players !== [] && this.state.teams !== [] && this.state.teams.members !== []) {
      let availablePlayers = [];
      this.state.players.forEach((player, pIndex) => {
        let flag = true;
        this.state.teams.forEach((team, tIndex) => {
          team["members"].forEach((member, mIndex) => {
            if(Number(player["id"]) === Number(member["id"]) ) {
              flag = false;
            }
          });
        });
        if(flag) {
          availablePlayers.push(player);
        }
      });
      return availablePlayers;
    }
    return null;
  }

  addPlayerToTeam(e) {
    // given id of form : availablePlayer_#1_#2 where #1 is the index of player id in json
    // and #2 is the id of the team to be added if pressed
    let args = e.target.id.split("_");
    let playerId = args[1]; 
    let teamId = args[2];

    let newTeams = this.state.teams;
    newTeams[teamId]["members"].push(
      {
        "id": playerId
      }
    );
    this.setState({
      teams: newTeams
    });
  }

  removePlayerFromTeam(e) {
    // given id of form : selectedPlayer_#1_#2 where #1 is the index of player id in json
    // and #2 is the id of the team to be added if pressed
    let args = e.target.id.split("_");
    let playerId = args[1];

    let newTeams = [];
    this.state.teams.forEach((team, tIndex) => {
      let newTeamMembers = [];
      team["members"].forEach((member, mIndex) => {
        if(Number(member["id"]) !== Number(playerId)) {
          newTeamMembers.push({"id": member["id"]});
        }
      });
      newTeams.push({
        "id": team["id"],
        "members": newTeamMembers
      })
    });

    this.setState({
      teams: newTeams
    });
  }

  createGameNote() {
    this.props.readFile().then((success) => {
      console.log("read file : " + success);
      // file was found, must update it
      // first update biribaNotes.txt with the new game and first round
      let updatedBiribaNotes = JSON.parse(success.body);
      let newRound = {
        "number": 0,
        "scores": []
      };
      this.state.teams.forEach((team, tIndex) => {
        newRound.scores.push({
          "teamId": team.id,
          "countCardsScore": 0,
          "biribaScore": 0
        });
      });
      let newUnfinishedGame = {
        "id": updatedBiribaNotes.unfinishedGames.length + 1,
        "date": this.getDateToString(),
        "teams": this.state.teams,
        "players": this.state.players,
        "rounds": [newRound],
        "finished": false
      };
      updatedBiribaNotes.unfinishedGames.push(newUnfinishedGame);
      this.props.updateBiribaNotes(updatedBiribaNotes);
      console.log("calling update existing file...");
      this.props.updateFile();
      
    }).catch((error) => {
      console.log("read error file : " + error);
      // file with this name was not found, must create new file
      // first initialize biribaNotes.txt with the first game and first round
      let newRound = {
        "number": 1,
        "scores": []
      };
      this.state.teams.forEach((team, tIndex) => {
        newRound.scores.push({
          "teamId": team.id,
          "countCardsScore": 0,
          "biribaScore": 0
        });
      });
      let updatedBiribaNotes = this.props.biribaNotes;
      updatedBiribaNotes = {
        unfinishedGames: [
          {
            "id": 0,
            "date": this.getDateToString(),
            "teams": this.state.teams,
            "players": this.state.players,
            "rounds": [newRound],
            "finished": false
          },
        ],
        finishedGames: []
      };
      this.props.updateBiribaNotes(updatedBiribaNotes);
      console.log("calling upload new file...");
      this.props.uploadFile();
    }); 
    this.props.history.push("/biriba");
  }

  getDateToString() {
    let cal = new Date();
    let year = cal.getFullYear();
    let month = cal.getMonth() + 1;
    month = (month < 10) ? "0" + month : month;
    let day = cal.getDate();
    day = (day < 10) ? "0" + day : day;
    let hours = cal.getHours() + 1;
    hours = (hours < 10) ? "0" + hours : hours;
    let minutes = cal.getMinutes();
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    return day+"/"+month+"/"+year+"|"+hours+":"+minutes;
  }

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
      
      let teamsDiv = [];
      if(this.state.teams !== []) {
        let flag = false;

        this.state.teams.forEach((team, index) => {
          flag = true;

          let availablePlayers = this.getAvailablePlayers();
          let availablePlayersDiv = [];
          availablePlayers.forEach((availablePlayer, APIndex) => {
            availablePlayersDiv.push(
              <button
                id={"availablePlayer_"+availablePlayer["id"]+"_"+team["id"]}
                onClick={this.addPlayerToTeam}
                key={"availablePlayer_"+APIndex}
                className="tag">
                  {availablePlayer["name"]}
              </button>
            );
          });
          if(availablePlayers === [] || availablePlayers === null || availablePlayers.length === 0) {
            availablePlayersDiv = <p className="msg">No available players left</p>;
          }

          let selectedPlayers = [];
          team.members.forEach((member, mIndex) => {
            selectedPlayers.push(
              <button
                id={"selectedPlayer_"+member["id"]+"_"+team["id"]}
                onClick={this.removePlayerFromTeam}
                key={"selectedPlayer_"+mIndex}
                className="tag">
                  {this.state.players[member["id"]]["name"]}
              </button>
            );
          });
          if(selectedPlayers.length === 0) {
            selectedPlayers = <p className="msg">No members yet</p>;
          }

          teamsDiv.push(
            <div className="player-section" key={"teamsDiv"+index}>
              <p className="title">Team: {index+1}</p>
              <div className="add-players-div">
                <div className="player-tags">
                  <p>Selected players</p>
                  {selectedPlayers}
                </div>
                <div className="player-tags">
                  <p>Available players</p>
                  {availablePlayersDiv}
                </div>
              </div>
            </div>
          );
        });
        if(flag) {
          teamsDiv.unshift(<div className="line" key="teamsDiv_0000"></div>);
          teamsDiv.push(
            <div className="section" key={"teamsDiv9910"}>
              <button
                type="submit"
                style={{"height":"40px", "backgroundColor":"#1B9AAA"}} 
                className="submit-players-button" 
                onClick={this.createGameNote} >
                Create game note
              </button>
            </div>
          );
        }
      }

      return (
        <div className="NewGame">
          <div className="NewGame-container">
              <div className="header">
              <p>New Game</p>
                <Link to="/biriba" >
                  <i className="fa fa-arrow-left" />
                </Link>
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

export default withRouter(NewGame);