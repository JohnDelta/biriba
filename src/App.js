import React from 'react';
import './App.css';
import Login from './Login';
import Menu from './Menu';

var SCOPE = "https://www.googleapis.com/auth/drive.metadata.readonly";
var DISCOVERY_URL = "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest";
var API_KEY = "AIzaSyBprTfI37i-0AwMIYO1WKctAaTGJ1krnwA";
var CLIENDT_ID = "286520596166-eei2md6014af234a4ge4spnr12f5ksvb.apps.googleusercontent.com";

class App extends React.Component {

  constructor() {
    super();

    this.state = {
      name: "",
      googleAuth: ""
    };

    this.initClient = this.initClient.bind(this);
    this.signInFunction = this.signInFunction.bind(this);
    this.signOutFunction = this.signOutFunction.bind(this);
    this.updateSigninStatus = this.updateSigninStatus.bind(this);
    this.handleClientLoad = this.handleClientLoad.bind(this);
    this.setSigninStatus = this.setSigninStatus.bind(this);
    this.isConnected = this.isConnected.bind(this);
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
          'clientId': CLIENDT_ID,
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
    if(this.isConnected) {
      this.state.googleAuth.signIn();
      this.updateSigninStatus();
    } else {
      console.log("No connection to API yet...");
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
    var user = this.state.googleAuth.currentUser.get();
    console.log(user);
console.log("pass setSigninStatus called");
    if(user.wc == null){
      this.setState({
        name: ''
      });
    }
    else {
      var isAuthorized = user.hasGrantedScopes(SCOPE);
      
      if(isAuthorized) {
        console.log("Everything ok. Do stuff here");
      }

      // if(isAuthorized) {
      //   this.setState({
      //     name: user.Ot.Cd
      //   });

      //   const boundary='foo_bar_baz'
      //   const delimiter = "\r\n--" + boundary + "\r\n";
      //   const close_delim = "\r\n--" + boundary + "--";
      //   var fileName='mychat123';
      //   var fileData='this is a sample data';
      //   var contentType='text/plain'
      //   var metadata = {
      //     'name': fileName,
      //     'mimeType': contentType
      //   };

      //   var multipartRequestBody =
      //     delimiter +
      //     'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
      //     JSON.stringify(metadata) +
      //     delimiter +
      //     'Content-Type: ' + contentType + '\r\n\r\n' +
      //     fileData+'\r\n'+
      //     close_delim;

      //     console.log(multipartRequestBody);
      //     var request = window.gapi.client.request({
      //       'path': 'https://www.googleapis.com/upload/drive/v3/files',
      //       'method': 'POST',
      //       'params': {'uploadType': 'multipart'},
      //       'headers': {
      //         'Content-Type': 'multipart/related; boundary=' + boundary + ''
      //       },
      //       'body': multipartRequestBody});
      //   request.execute(function(file) {
      //     console.log(file)
      //   });
      // }

    }
  }

  isConnected() {
    if(this.state.user !== undefined && this.state.user !== "") {
      return true;
    }
    return false;
  }

  render() {

    var screen = "";
    if(this.state.name === "") {
      screen = <Login signInFunction={this.signInFunction} />;
    } else {
      screen = <Menu />;
    }
    
    return (
        <div className="App">

          {screen}
        
        </div>
    );
  }

}

export default App;
