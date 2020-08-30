import React from 'react';
import './App.css';
import Login from './Login';
import Menu from './Menu';
import Logout from './Logout';

import Keys from './Keys.js';

var SCOPE = "https://www.googleapis.com/auth/drive";
var DISCOVERY_URL = "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest";
var API_KEY = Keys.getAPIKey();
var CLIENT_ID = Keys.getClientID();

class App extends React.Component {


  /**
   * - see if the file already exists
   * - if it doesn't, create it to be ready to insert the first game
   * - if it does read it
   */

  constructor() {
    super();

    this.state = {
      name: "",
      googleAuth: "",
      userMail: "",
      biriba: {
        unfinishedGames: {
          
        }
      }
    };

    this.initClient = this.initClient.bind(this);
    this.signInFunction = this.signInFunction.bind(this);
    this.signOutFunction = this.signOutFunction.bind(this);
    this.updateSigninStatus = this.updateSigninStatus.bind(this);
    this.handleClientLoad = this.handleClientLoad.bind(this);
    this.setSigninStatus = this.setSigninStatus.bind(this);
    this.checkFileExists = this.checkFileExists.bind(this);
    this.readFile = this.readFile.bind(this);
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

  /**
   * 
   * Encapsulate the function into a promise to return a request when it can
   * 
   * then call the promise with .then and get the results from resolve
   */

  // find file and return its id if exists
  checkFileExists = async (fname) => {
    return new Promise((resolve, reject) => {
      var req = window.gapi.client.drive.files.list({q: "name = '"+fname+"'"});
      req.execute(function(r){
        if(r.files && r.files.length && r.files[0].id){
          resolve(r.files[0].id);
          //return r.files[0].id;
        } else {
          reject(null);
        }
      });
    });
  }

  // read file when you find it
  readFile = async (callback) => {

    this.checkFileExists("testing.txt").then((fileId)=>{
      var request = window.gapi.client.drive.files.get({
          fileId: fileId,
          alt: 'media'
      })
      request.then(function(response) {
          console.log(response); //response.body contains the string value of the file
          if (typeof callback === "function") callback(response.body);
      }, function(error) {
          console.error(error)
      })
      return request;
    });
}

  // biriba notes file exists in drive function (if it does return it else null)


  // 

  render() {
    
    var screen = "";
    var header = "";

    if(this.state.userMail === "" || this.state.userMail === undefined) {
      screen = <Login signInFunction={this.signInFunction} />;
    } else {
      screen = <Menu />;
      header = <Logout userMail={this.state.userMail} signOutFunction={this.signOutFunction} />;

      this.readFile();
      //console.log(this.checkFileExists("testing.txt"));

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
