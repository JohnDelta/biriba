import React from 'react';
import './App.css';
import Login from './Login';
import Menu from './Menu';
import Logout from './Logout';

var SCOPE = "https://www.googleapis.com/auth/drive.metadata.readonly";
var DISCOVERY_URL = "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest";
var API_KEY = "AIzaSyDx-UwZd7JuuZZEKaA5OeCXpiWr4PGul9I";
var CLIENT_ID = "286520596166-kcoq2cmrbd0cejleemk2viuq6rguivhj.apps.googleusercontent.com";

class App extends React.Component {

  constructor() {
    super();

    this.state = {
      name: "",
      googleAuth: "",
      userMail: ""
    };

    this.initClient = this.initClient.bind(this);
    this.signInFunction = this.signInFunction.bind(this);
    this.signOutFunction = this.signOutFunction.bind(this);
    this.updateSigninStatus = this.updateSigninStatus.bind(this);
    this.handleClientLoad = this.handleClientLoad.bind(this);
    this.setSigninStatus = this.setSigninStatus.bind(this);
  }

  componentDidMount(){
    var script = document.createElement('script');
    script.onload = this.handleClientLoad;
    script.src="https://apis.google.com/js/api.js";
    document.body.appendChild(script);
  }

  handleClientLoad = () => {
    window.gapi.load('client:auth2', this.initClient);
  }

  initClient = () => {
    try {
      window.gapi.client.init({
          'apiKey': API_KEY,
          'clientId': CLIENT_ID,
          'scope': SCOPE,
          'discoveryDocs': [DISCOVERY_URL]
        }).then(() => {
          this.setState({
            googleAuth: window.gapi.auth2.getAuthInstance()
          });
          this.state.googleAuth.isSignedIn.listen(this.updateSigninStatus); 
      });
    } catch(e) {
      console.log(e);
    }
  }

  signInFunction = () => {
    try {
      this.state.googleAuth.signIn();
      this.updateSigninStatus();
    } catch(e) {
      console.log(e);
    }
  }

  signOutFunction = () => {
    this.state.googleAuth.signOut();
    this.updateSigninStatus();
  }

  updateSigninStatus = () => {
    this.setSigninStatus();
  }

  setSigninStatus = async () => {
    this.setState({
      userMail: ""
    });

    var user = await this.state.googleAuth.currentUser.get();
    var isAuthorized = user.hasGrantedScopes(SCOPE);
      if(isAuthorized){
        this.setState({
          userMail: user.vt.cu
        });
      }
  }

  render() {

    var screen = "";
    var header = "";

    if(this.state.userMail === "" || this.state.userMail === undefined) {
      screen = <Login signInFunction={this.signInFunction} />;
    } else {
      screen = <Menu />;
      header = <Logout userMail={this.state.userMail} signOutFunction={this.signOutFunction} />;
    }

    return (
        <div className="App">
          {header}
          {screen}
        </div>
    );
  }

}

export default App;
