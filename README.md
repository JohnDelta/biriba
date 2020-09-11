# Biriba Notes

## description
- Web app in React.js which keeps notes for the card game "biriba" including scores, teams, etc.
- To save the notes the app utilizes the Google Drive API

## Deployment
- The app is currently deployed at http://johndelta.github.io/biriba

## Install
- First, a Google Drive API access (ClientId & APIKey) is required
- The API must have auth2 with scope to create/alter/delete files on drive
- Don't forget to whitelist the server root (ex. http://localhost:3000 in react server) from the API 
- Clone the project (git clone https://github.com/JohnDelta/biriba.git)
- cd to project
- On the App.js file, you need to add your clientId & apiKey on the corresponding global vars and delete the ones coming from the Keys.js file
- Type "npm update" and then "npm start" to run the project localy using npm console