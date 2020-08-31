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
   * biribaNotes.txt file format example:
   * biribaNotes: {
   *  unfinishedGames: [
   *    {
            "id": 0,
            "date": "",
            "teams": [
              {
                "id": "0",
                "members": [
                  {
                    "id": "0"
                  },
                  {
                    "id": "1"
                  }
                ]
              }
            ],
            "players": [
              {
                "id": "0",
                "name": "john"
              },
            ],
            "rounds": [],
            "finished": false
        },
      ],
      finishedGames: [
        {

        },
        {

        }
      ]
   * }
   * 
  */

  constructor() {
    super();

    this.state = {
      name: "",
      googleAuth: "",
      userMail: "",
      biribaNotes: {},
      test: undefined
    };

    this.initClient = this.initClient.bind(this);
    this.signInFunction = this.signInFunction.bind(this);
    this.signOutFunction = this.signOutFunction.bind(this);
    this.updateSigninStatus = this.updateSigninStatus.bind(this);
    this.handleClientLoad = this.handleClientLoad.bind(this);
    this.setSigninStatus = this.setSigninStatus.bind(this);
    this.checkFileExists = this.checkFileExists.bind(this);
    this.readFile = this.readFile.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.updateBiribaNotes = this.updateBiribaNotes.bind(this);
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

  checkFileExists = async (fname) => {
    return new Promise((resolve, reject) => {
      var req = window.gapi.client.drive.files.list({q: "name = '"+fname+"'"});
      req.execute((r) => {
        if(r.files && r.files.length && r.files[0].id){
          resolve(r.files[0].id);
        } else {
          reject(null);
        }
      });
    });
  }

  readFile = async () => {
    return new Promise((resolve, reject) => {

      this.checkFileExists("biriba-notes.txt").then((fileId) => {
        var request = window.gapi.client.drive.files.get({
            fileId: fileId,
            alt: 'media'
        });
  
        request.then((r) => {
        
          console.log("file with this id found");
          resolve(r);
        
        }).catch((error) => {
          console.log("file with this id does not exist");
          reject("ID_NOT_EXIST");
        });
  
      }).catch((error) => {
        console.log("file with this name does not exist");
        reject("NAME_NOT_EXIT");
      });
    });
  }

  uploadFile = () => {
    // initalize meta data standard for the multipart method / upload the biriba notes file as json
    const boundary='foo_bar_baz'
    const delimiter = "\r\n--" + boundary + "\r\n";
    const close_delim = "\r\n--" + boundary + "--";
    var fileName = "biriba-notes";
    var fileData = JSON.stringify(this.state.biribaNotes);
    var contentType = 'text/plain';
    var metadata = {
      'name': fileName,
      'mimeType': contentType
    };

    var multipartRequestBody =
      delimiter +
      'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
      JSON.stringify(metadata) +
      delimiter +
      'Content-Type: ' + contentType + '\r\n\r\n' +
      fileData+'\r\n'+
      close_delim;

      var request = window.gapi.client.request({
        'path': 'https://www.googleapis.com/upload/drive/v3/files',
        'method': 'POST',
        'params': {'uploadType': 'multipart'},
        'headers': {
          'Content-Type': 'multipart/related; boundary=' + boundary + ''
        },
        'body': multipartRequestBody});
      request.execute(function(file) {
        if(file.id !== undefined) {
          console.log("file uploaded");
        }
      });
  };

  updateBiribaNotes(updatedBiribaNotes) {
    this.setState({
      biribaNotes: updatedBiribaNotes
    });
  }

  render() {
    
    var screen = "";
    var header = "";

    if(this.state.userMail === "" || this.state.userMail === undefined) {
      screen = <Login signInFunction={this.signInFunction} />;
    } else {
      screen = <Menu 
                biribaNotes={this.state.biribaNotes}
                updateBiribaNotes={this.updateBiribaNotes}
                readFile={this.readFile}
                uploadFile={this.uploadFile} 
                checkFileExists={this.checkFileExists}
              />;
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
