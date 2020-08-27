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
      players: []
    };
    this.onChangeNumberOfPlayers = this.onChangeNumberOfPlayers.bind(this);
    this.initializePlayers = this.initializePlayers.bind(this);
  }

  onChangeNumberOfPlayers(e) {
    let number = e.target.value;
    this.setState({
      numberOfPlayers: e.target.value,
      players: []
    });
  }

  initializePlayers() {
    if(this.state.numberOfPlayers >= 1 && this.state.numberOfPlayers <= 20) {
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

  render() {

      let playersDiv = [];
      if(this.state.players !== [] && this.state.numberOfPlayers > 0) {
        let flag = false;
        this.state.players.forEach((item, index) => {
          flag = true;
          playersDiv.push(
            <div className="player-section" key={"playersDiv"+index}>
              <p className="title">Player: {index+1}</p>
              <input 
                type="text"
                length="30"
              />
              <p>Name</p>
            </div>
          )
        });
        if(flag) {
          playersDiv.push(
            <div className="player-section" key={"playersDiv9999"}>
              <button className="submit-players-button" onClick={this.initializePlayers} >
                Submit player names
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
                  <a><i className="fa fa-arrow-left" /></a>
                </div>
                
                <div className="section">
                  <input 
                    type="number" 
                    placeholder="2" 
                    maxLength="2"
                    minLength="1"
                    max="20"
                    value={this.state.numberOfPlayers}
                    onChange={this.onChangeNumberOfPlayers}
                  />
                  <p>Number of players</p>
                  <button className="submit-players-button" onClick={this.initializePlayers} >
                    Submit number of players
                  </button>
                </div>

                {playersDiv}

            </div>
        </div>
      );
  }

}

export default NewGame;