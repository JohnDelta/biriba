# Biriba Notes

## description
- Web app in React.js which keeps notes for the card game "biriba" including scores, teams, etc.
- To save the notes the app utilizes the Google Drive API

## Deployment
- The app is currently deployed at http://johndelta.github.io/biriba

## Install
- First, a Google Drive API access (ClientId & APIKey) is required
- The API must have auth02 with scope to create/alter/delete files on drive
- Don't forget to whitelist the server root (ex. http://localhost:3000 in react server) from the API 
- Clone the project
- On the App.js file, you need to add your clientId & apiKey on the corresponding global vars
- Start the project on the server (ex. npm start for a localhost)