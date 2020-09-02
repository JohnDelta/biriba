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
            "id": "id of unifinished game",
            "date": "",
            "teams": [
              {
                "id": "id of team",
                "members": [
                  {
                    "id": "id of player"
                  },
                  {
                    "id": "id of player"
                  }
                ]
              }
            ],
            "players": [
              {
                "id": "id of player",
                "name": "john"
              },
            ],
            "rounds": [
              {
                "round": 0,
                "scores": [
                  {
                    "id": "teamId",
                    "countCardsScore": 0,
                    "biribaScore": 0
                  }
                ]
              }
            ],
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
      biribaNotes: 
      {
          unfinishedGames: [
            {
                 "id": 0,
                 "date": "01/01/2013|12:12",
                 "teams": [
                   {
                     "id": 0,
                     "members": [
                       {
                         "id": 0
                       }
                     ]
                   },
                   {
                    "id": 1,
                    "members": [
                      {
                        "id": 1
                      }
                    ]
                  }
                 ],
                 "players": [
                   {
                     "id": 0,
                     "name": "john"
                   },
                   {
                     "id": 1,
                     "name": "delta"
                   }
                 ],
                 "rounds": [
                   {
                     "round": 0,
                     "scores": [
                       {
                         "id": 0,
                         "countCardsScore": 0,
                         "biribaScore": 0
                       },
                       {
                        "id": 1,
                        "countCardsScore": 0,
                        "biribaScore": 0
                      }
                     ]
                   },
                   {
                    "round": 1,
                    "scores": [
                      {
                        "id": 0,
                        "countCardsScore": 0,
                        "biribaScore": 0
                      },
                      {
                       "id": 1,
                       "countCardsScore": 0,
                       "biribaScore": 0
                     }
                    ]
                  }
                 ],
                 "finished": false
             },
           ],
           finishedGames: [
             {
     
             },
             {
     
             }
           ]
      }
      ,
      fileId: "",
      unfinishedGameId: -1
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
    this.updateFile = this.updateFile.bind(this);
    this.updateUnfinishedGameId = this.updateUnfinishedGameId.bind(this);
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

    //load data if exist
    this.readFile().then((success) => {
      console.log("File read : "+success);
      this.setState({
        biribaNotes: JSON.parse(success.body)
      });
    }).catch((error) => {
      // no available unfinished game
      console.log("No available file : "+error);
    });
  }

  checkFileExists = async () => {
    return new Promise((resolve, reject) => {
      var req = window.gapi.client.drive.files.list({q: "name='biriba-notes'"});
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

      this.checkFileExists().then((fileId) => {
        this.setState({
          fileId: fileId
        });

        var request = window.gapi.client.drive.files.get({
            fileId: fileId,
            alt: 'media'
        });
  
        request.then((success) => {
        
          console.log("file with this id found");
          resolve(success);
        
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
    const boundary = '-------314159265358979323846264';
    const delimiter = "\r\n--" + boundary + "\r\n";
    const close_delim = "\r\n--" + boundary + "--";
    var base64Data = btoa(JSON.stringify(this.state.biribaNotes));
    var multipartRequestBody =
        delimiter +
        'Content-Type: application/json\r\n\r\n' +
        JSON.stringify({"title": "biriba-notes"}) +
        delimiter +
        'Content-Type: ' + "text/plain" + '\r\n' +
        'Content-Transfer-Encoding: base64\r\n' +
        '\r\n' +
        base64Data +
        close_delim;
    var request = window.gapi.client.request({
        'path': '/upload/drive/v2/files',
        'method': 'POST',
        'params': {'uploadType': 'multipart'},
        'headers': {
          'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
        },
        'body': multipartRequestBody});
    request.execute(function(res) {
      console.log('New file upploaded!');
    });
  };

  updateBiribaNotes(updatedBiribaNotes) {
    this.setState({
      biribaNotes: updatedBiribaNotes
    });
  }

  updateFile = () => {
    const boundary = '-------314159265358979323846264';
    const delimiter = "\r\n--" + boundary + "\r\n";
    const close_delim = "\r\n--" + boundary + "--";
    var base64Data = btoa(JSON.stringify(this.state.biribaNotes));
    var multipartRequestBody =
        delimiter +
        'Content-Type: application/json\r\n\r\n' +
        JSON.stringify({"title": "biriba-notes"}) +
        delimiter +
        'Content-Type: ' + "text/plain" + '\r\n' +
        'Content-Transfer-Encoding: base64\r\n' +
        '\r\n' +
        base64Data +
        close_delim;
    var request = window.gapi.client.request({
        'path': '/upload/drive/v2/files/' + this.state.fileId,
        'method': 'PUT',
        'params': {'uploadType': 'multipart', 'alt': 'json'},
        'headers': {
          'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
        },
        'body': multipartRequestBody});
    request.execute(function(res) {
      console.log('File updated!');
    });
  }

  updateUnfinishedGameId(id) {
    this.setState({
      unfinishedGameId: id
    });
  }

  render() {
    
    var screen = "";
    var header = "";

    if(this.state.userMail === "" && this.state.userMail === undefined) {
      screen = <Login signInFunction={this.signInFunction} />;
    } else {
      screen = <Menu 
                biribaNotes={this.state.biribaNotes}
                updateBiribaNotes={this.updateBiribaNotes}
                uploadFile={this.uploadFile} 
                updateFile={this.updateFile}
                updateUnfinishedGameId={this.updateUnfinishedGameId}
                unfinishedGameId={this.state.unfinishedGameId}
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
