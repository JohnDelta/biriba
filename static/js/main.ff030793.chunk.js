(this.webpackJsonpbiriba=this.webpackJsonpbiriba||[]).push([[0],{23:function(e,a,t){e.exports=t(44)},28:function(e,a,t){},30:function(e,a,t){},31:function(e,a,t){},32:function(e,a,t){},33:function(e,a,t){},39:function(e,a,t){},40:function(e,a,t){},41:function(e,a,t){},42:function(e,a,t){},43:function(e,a,t){},44:function(e,a,t){"use strict";t.r(a);var n=t(0),i=t.n(n),s=t(21),r=t.n(s),l=(t(28),t(13)),o=t.n(l),c=t(15),u=t(3),m=t(4),d=t(1),h=t(7),b=t(6),p=(t(30),t(31),function(e){Object(h.a)(t,e);var a=Object(b.a)(t);function t(){return Object(u.a)(this,t),a.apply(this,arguments)}return Object(m.a)(t,[{key:"render",value:function(){return i.a.createElement("div",{className:"Login"},i.a.createElement("div",{className:"login-container"},i.a.createElement("div",{className:"intro"},i.a.createElement("h1",null,"Welcome to Biriba Notes"),i.a.createElement("p",null,"Here you can keep notes on your favourite card game Biriba using your Google Drive Account")),i.a.createElement("button",{onClick:this.props.signInFunction},"Login with Google")))}}]),t}(i.a.Component)),f=(t(32),t(33),t(8)),v=t(2),E=function(e){Object(h.a)(t,e);var a=Object(b.a)(t);function t(e){var n;return Object(u.a)(this,t),(n=a.call(this,e)).state={numberOfPlayers:0,numberOfTeams:0,players:[],teams:[]},n.onChangeNumberOfPlayers=n.onChangeNumberOfPlayers.bind(Object(d.a)(n)),n.submitNumberOfPlayers=n.submitNumberOfPlayers.bind(Object(d.a)(n)),n.onChangePlayerNames=n.onChangePlayerNames.bind(Object(d.a)(n)),n.submitNumberOfTeams=n.submitNumberOfTeams.bind(Object(d.a)(n)),n.onChangeNumberOfTeams=n.onChangeNumberOfTeams.bind(Object(d.a)(n)),n.getAvailablePlayers=n.getAvailablePlayers.bind(Object(d.a)(n)),n.addPlayerToTeam=n.addPlayerToTeam.bind(Object(d.a)(n)),n.removePlayerFromTeam=n.removePlayerFromTeam.bind(Object(d.a)(n)),n.createGameNote=n.createGameNote.bind(Object(d.a)(n)),n.getDateToString=n.getDateToString.bind(Object(d.a)(n)),n}return Object(m.a)(t,[{key:"onChangeNumberOfPlayers",value:function(e){this.setState({numberOfPlayers:e.target.value,players:[]})}},{key:"submitNumberOfPlayers",value:function(){if(this.state.numberOfPlayers>1&&this.state.numberOfPlayers<=20){for(var e=[],a=0;a<this.state.numberOfPlayers;a++)e.push({id:a,name:""});this.setState({players:e})}}},{key:"onChangePlayerNames",value:function(e){var a=e.target.id.split("_")[1],t=e.target.value,n=this.state.players;n[a].name=t,this.setState({players:n})}},{key:"onChangeNumberOfTeams",value:function(e){this.setState({teams:[],numberOfTeams:e.target.value})}},{key:"submitNumberOfTeams",value:function(){if(this.state.numberOfTeams>=2&&this.state.numberOfTeams<=this.state.numberOfPlayers){var e=!1;if(this.state.players.forEach((function(a,t){""===a.name&&(e=!0)})),!e)for(var a=[],t=0;t<this.state.numberOfTeams;t++)a.push({id:t,members:[]}),this.setState({teams:a})}}},{key:"getAvailablePlayers",value:function(){var e=this;if(this.state.players!==[]&&this.state.teams!==[]&&this.state.teams.members!==[]){var a=[];return this.state.players.forEach((function(t,n){var i=!0;e.state.teams.forEach((function(e,a){e.members.forEach((function(e,a){Number(t.id)===Number(e.id)&&(i=!1)}))})),i&&a.push(t)})),a}return null}},{key:"addPlayerToTeam",value:function(e){var a=e.target.id.split("_"),t=a[1],n=a[2],i=this.state.teams;i[n].members.push({id:t}),this.setState({teams:i})}},{key:"removePlayerFromTeam",value:function(e){var a=e.target.id.split("_")[1],t=[];this.state.teams.forEach((function(e,n){var i=[];e.members.forEach((function(e,t){Number(e.id)!==Number(a)&&i.push({id:e.id})})),t.push({id:e.id,members:i})})),this.setState({teams:t})}},{key:"createGameNote",value:function(){if(this.props.biribaNotes.unfinishedGames){var e=1;this.props.biribaNotes.unfinishedGames.rounds&&(e=this.props.biribaNotes.unfinishedGames.rounds.length);var a=this.props.biribaNotes,t={round:e,scores:[],cardDealer:0,biribaDealer:Number(this.state.players.length-1),trumpNumber:1,trumpSymbol:"KA"};this.state.teams.forEach((function(e,a){t.scores.push({teamId:e.id,countCardsScore:0,biribaScore:0,penalties:0,close:!1})}));var n={id:a.unfinishedGames.length+1,date:this.getDateToString(),teams:this.state.teams,players:this.state.players,rounds:[t],finished:!1};a.unfinishedGames.push(n),this.props.updateBiribaNotes(a),console.log("calling update existing file..."),this.props.updateFile(a)}else{var i={round:1,scores:[],cardDealer:0,biribaDealer:Number(this.state.players.length-1),trumpNumber:1,trumpSymbol:"KA"};this.state.teams.forEach((function(e,a){i.scores.push({teamId:e.id,countCardsScore:0,biribaScore:0,penalties:0,close:!1})}));var s=this.props.biribaNotes;s={unfinishedGames:[{id:0,date:this.getDateToString(),teams:this.state.teams,players:this.state.players,rounds:[i],finished:!1}],finishedGames:[]},this.props.updateBiribaNotes(s),console.log("calling upload new file..."),this.props.uploadFile(s)}this.props.history.push("/biriba")}},{key:"getDateToString",value:function(){var e=new Date,a=e.getFullYear(),t=e.getMonth()+1;t=t<10?"0"+t:t;var n=e.getDate();n=n<10?"0"+n:n;var i=e.getHours()+1;i=i<10?"0"+i:i;var s=e.getMinutes();return n+"/"+t+"/"+a+"|"+i+":"+(s=s<10?"0"+s:s)}},{key:"render",value:function(){var e=this,a=[];if(this.state.players!==[]){var t=!1;this.state.players.forEach((function(n,s){t=!0,a.push(i.a.createElement("div",{className:"player-section",key:"playersDiv"+s},i.a.createElement("p",{className:"title"},"Player: ",s+1),i.a.createElement("input",{type:"text",maxLength:"20",id:"playerName_"+s,value:e.state.players[s].name,onChange:e.onChangePlayerNames,required:!0}),i.a.createElement("p",null,"Name")))})),t&&(a.unshift(i.a.createElement("div",{className:"line",key:"playersDiv_0000"})),a.push(i.a.createElement("div",{className:"section",key:"playersDiv9999"},i.a.createElement("input",{type:"number",placeholder:"2",maxLength:"2",minLength:"1",max:this.state.numberOfPlayers,min:"2",value:this.state.numberOfTeams,onChange:this.onChangeNumberOfTeams,required:!0}),i.a.createElement("p",null,"Number of teams"),i.a.createElement("button",{type:"submit",style:{height:"40px"},className:"submit-players-button",onClick:this.submitNumberOfTeams},"Submit names and number of teams"))))}var n=[];if(this.state.teams!==[]){var s=!1;this.state.teams.forEach((function(a,t){s=!0;var r=e.getAvailablePlayers(),l=[];r.forEach((function(t,n){l.push(i.a.createElement("button",{id:"availablePlayer_"+t.id+"_"+a.id,onClick:e.addPlayerToTeam,key:"availablePlayer_"+n,className:"tag"},t.name))})),r!==[]&&null!==r&&0!==r.length||(l=i.a.createElement("p",{className:"msg"},"No available players left"));var o=[];a.members.forEach((function(t,n){o.push(i.a.createElement("button",{id:"selectedPlayer_"+t.id+"_"+a.id,onClick:e.removePlayerFromTeam,key:"selectedPlayer_"+n,className:"tag"},e.state.players[t.id].name))})),0===o.length&&(o=i.a.createElement("p",{className:"msg"},"No members yet")),n.push(i.a.createElement("div",{className:"player-section",key:"teamsDiv"+t},i.a.createElement("p",{className:"title"},"Team: ",t+1),i.a.createElement("div",{className:"add-players-div"},i.a.createElement("div",{className:"player-tags"},i.a.createElement("p",null,"Selected players"),o),i.a.createElement("div",{className:"player-tags"},i.a.createElement("p",null,"Available players"),l))))})),s&&(n.unshift(i.a.createElement("div",{className:"line",key:"teamsDiv_0000"})),n.push(i.a.createElement("div",{className:"section",key:"teamsDiv9910"},i.a.createElement("button",{type:"submit",style:{height:"40px",backgroundColor:"#1B9AAA"},className:"submit-players-button",onClick:this.createGameNote},"Create game note"))))}return i.a.createElement("div",{className:"NewGame"},i.a.createElement("div",{className:"NewGame-container"},i.a.createElement("div",{className:"header"},i.a.createElement("p",null,"New Game"),i.a.createElement(f.b,{to:"/biriba"},i.a.createElement("i",{className:"fa fa-arrow-left"}))),i.a.createElement("div",{className:"line"}),i.a.createElement("div",{className:"section"},i.a.createElement("input",{type:"number",placeholder:"2",maxLength:"2",minLength:"1",max:"20",min:"2",value:this.state.numberOfPlayers,onChange:this.onChangeNumberOfPlayers}),i.a.createElement("p",null,"Number of players"),i.a.createElement("button",{type:"submit",className:"submit-players-button",onClick:this.submitNumberOfPlayers},"Submit number of players")),a,n))}}]),t}(i.a.Component),N=Object(v.f)(E),g=(t(39),function(e){Object(h.a)(t,e);var a=Object(b.a)(t);function t(e){var n;return Object(u.a)(this,t),(n=a.call(this,e)).enterUnfinishedGame=n.enterUnfinishedGame.bind(Object(d.a)(n)),n}return Object(m.a)(t,[{key:"enterUnfinishedGame",value:function(e){var a=e.target.id.split("_")[1];this.props.updateUnfinishedGameId(a),this.props.history.push("/biriba/unfinished-games/game")}},{key:"render",value:function(){var e=this,a=[];return this.props.biribaNotes&&this.props.biribaNotes.unfinishedGames&&this.props.biribaNotes.unfinishedGames.forEach((function(t,n){if(!t.finished){var s=-1;t.teams.forEach((function(e,a){var n=0;t.rounds.forEach((function(a,t){a.scores.forEach((function(a,t){Number(e.id)===Number(a.teamId)&&(n+=Number(a.biribaScore)+Number(a.countCardsScore)-Number(a.penalties),a.close&&(n+=100))}))})),s<n&&(s=n)})),a.push(i.a.createElement("div",{className:"UnfinishedGame-part",key:"UnfinishedGame-part"+n,id:"unfinishedGame_"+n,onClick:e.enterUnfinishedGame},i.a.createElement("p",{className:"title"},"Game:#",n),i.a.createElement("div",{className:"inline"},i.a.createElement("i",{className:"fa fa-calendar"}),i.a.createElement("p",{className:"date"},t.date)),i.a.createElement("p",null,"Players: ",t.players.length),i.a.createElement("p",null,"Max score: ",s),i.a.createElement("p",null,"Teams: ",t.teams.length),i.a.createElement("p",null,"Current round: ",t.rounds.length)))}})),0===a.length&&(a=i.a.createElement("p",null,"No unfinished games available")),i.a.createElement("div",{className:"UnfinishedGames"},i.a.createElement("div",{className:"UnfinishedGames-container"},i.a.createElement("div",{className:"header"},i.a.createElement("p",null,"Unfinished Games"),i.a.createElement(f.b,{to:"/biriba"},i.a.createElement("i",{className:"fa fa-arrow-left"}))),i.a.createElement("div",{className:"line"}),i.a.createElement("div",{className:"section"},a)),";")}}]),t}(i.a.Component)),y=Object(v.f)(g),O=(t(40),function(e){Object(h.a)(t,e);var a=Object(b.a)(t);function t(e){var n;return Object(u.a)(this,t),(n=a.call(this,e)).state={biribaNotes:n.props.biribaNotes,gameFinished:!1},n.toggleList=n.toggleList.bind(Object(d.a)(n)),n.onScoreChange=n.onScoreChange.bind(Object(d.a)(n)),n.updateBiribaNotes=n.updateBiribaNotes.bind(Object(d.a)(n)),n.resetBiribaNotes=n.resetBiribaNotes.bind(Object(d.a)(n)),n.onRoundInfoChange=n.onRoundInfoChange.bind(Object(d.a)(n)),n.newRound=n.newRound.bind(Object(d.a)(n)),n.hasGameFinished=n.hasGameFinished.bind(Object(d.a)(n)),n.moveGameToFinished=n.moveGameToFinished.bind(Object(d.a)(n)),n}return Object(m.a)(t,[{key:"componentDidMount",value:function(){this.hasGameFinished()}},{key:"toggleList",value:function(e){var a=document.getElementById(e.target.id),t=e.target.id.split("_")[0];a.nextElementSibling.classList.toggle(t)}},{key:"onScoreChange",value:function(e){var a=e.target.id.split("_"),t=a[0],n=a[1],i=a[2],s=this.state.biribaNotes;s.unfinishedGames[this.props.unfinishedGameId].rounds.forEach((function(a,s){Number(a.round)===Number(n)&&a.scores.forEach((function(a,n){Number(a.teamId)===Number(i)&&("biribaScore"===t?a.biribaScore=e.target.value:"countCardsScore"===t?a.countCardsScore=e.target.value:"penalties"===t?a.penalties=e.target.value:"close"===t&&(a.close=!a.close))}))})),this.setState({biribaNotes:s})}},{key:"onRoundInfoChange",value:function(e){var a=e.target.id.split("_"),t=a[0],n=a[1],i=this.state.biribaNotes;i.unfinishedGames[this.props.unfinishedGameId].rounds.forEach((function(a,i){Number(a.round)===Number(n)&&(a[t]=e.target.value)})),this.setState({biribaNotes:i})}},{key:"hasGameFinished",value:function(){var e=this,a=!1,t=this.state.biribaNotes;t.unfinishedGames[this.props.unfinishedGameId].teams.forEach((function(n,i){var s=0;t.unfinishedGames[e.props.unfinishedGameId].rounds.forEach((function(e,a){e.scores.forEach((function(e,a){Number(e.teamId)===Number(n.id)&&(s+=Number(e.biribaScore)+Number(e.countCardsScore)-Number(e.penalties),e.close&&(s+=100))}))})),s>=3010&&(a=!0)})),this.setState({gameFinished:a})}},{key:"moveGameToFinished",value:function(){var e=this.state.biribaNotes;e.unfinishedGames[this.props.unfinishedGameId].finished=!0,e.finishedGames.push(e.unfinishedGames[this.props.unfinishedGameId]),this.setState({biribaNotes:e}),this.updateBiribaNotes(e),this.props.history.push("/biriba")}},{key:"updateBiribaNotes",value:function(){this.props.updateBiribaNotes(this.state.biribaNotes),this.hasGameFinished(),console.log("File updating..."),this.props.updateFile(this.state.biribaNotes)}},{key:"resetBiribaNotes",value:function(){this.setState({biribaNotes:this.props.biribaNotes})}},{key:"newRound",value:function(){var e=this.state.biribaNotes,a=e.unfinishedGames[this.props.unfinishedGameId].players.length,t=e.unfinishedGames[this.props.unfinishedGameId].rounds.length,n=e.unfinishedGames[this.props.unfinishedGameId].rounds[t-1].cardDealer+1;n>=a&&(n=0);var i=n-1;i<0&&(i=a-1);var s={round:t+1,scores:[],cardDealer:Number(n),biribaDealer:Number(i),trumpNumber:1,trumpSymbol:"KA"};e.unfinishedGames[this.props.unfinishedGameId].teams.forEach((function(e,a){s.scores.push({teamId:e.id,countCardsScore:0,biribaScore:0,penalties:0,close:!1})})),e.unfinishedGames[this.props.unfinishedGameId].rounds.push(s),this.setState({biribaNotes:e}),this.updateBiribaNotes(e)}},{key:"render",value:function(){var e=this,a=[],t=this.state.biribaNotes.unfinishedGames[this.props.unfinishedGameId],n=(t.rounds.length,[]);t.rounds.forEach((function(a,s){var r=-1,l=[],o=0;t.teams.forEach((function(n,c){var u=[];a.scores.forEach((function(t,s){Number(t.teamId)===Number(n.id)&&(o=Number(t.biribaScore)+Number(t.countCardsScore)-Number(t.penalties),u.push(i.a.createElement("div",{className:"round-score-div",key:"roundScoreDiv"+c+s},i.a.createElement("p",null,"Round scores"),i.a.createElement("div",null,i.a.createElement("p",null,"Biriba score"),i.a.createElement("input",{id:"biribaScore_"+a.round+"_"+t.teamId,type:"number",min:"0",defaultValue:t.biribaScore,onChange:e.onScoreChange})),i.a.createElement("div",null,i.a.createElement("p",null,"Count cards score"),i.a.createElement("input",{id:"countCardsScore_"+a.round+"_"+t.teamId,type:"number",min:"0",max:"2000",defaultValue:t.countCardsScore,onChange:e.onScoreChange})),i.a.createElement("div",null,i.a.createElement("p",null,"Penalties"),i.a.createElement("input",{id:"penalties_"+a.round+"_"+t.teamId,type:"number",min:"0",defaultValue:t.countCardsScore,onChange:e.onScoreChange})),i.a.createElement("div",null,i.a.createElement("p",null,"Close"),i.a.createElement("input",{id:"close_"+a.round+"_"+t.teamId,type:"checkbox",checked:t.close,onChange:e.onScoreChange})))))}));var m=0;t.rounds.forEach((function(e,a){e.scores.forEach((function(e,a){Number(n.id)===Number(e.teamId)&&(m+=Number(e.biribaScore)+Number(e.countCardsScore)-Number(e.penalties),e.close&&(m+=100))}))})),r<m&&(r=m),u.push(i.a.createElement("div",{className:"round-score-div",key:"totalScores"+c+s},i.a.createElement("p",null,"Total scores"),i.a.createElement("div",null,i.a.createElement("p",null,"Total round score"),i.a.createElement("input",{key:o,type:"number",min:"0",readOnly:!0,defaultValue:o})),i.a.createElement("div",null,i.a.createElement("p",null,"Total score"),i.a.createElement("input",{key:m,type:"number",min:"0",readOnly:!0,defaultValue:m}))));var d=[],h=[];n.members.forEach((function(e,a){h.push(i.a.createElement("div",{key:"member"+a+c},t.players[e.id].name))})),d.push(i.a.createElement("div",{className:"team-div",key:"teamDiv"+s+c},i.a.createElement("button",{id:"team-info-div-active_"+s+"_"+c,onClick:e.toggleList},"Team ",n.id," (",m,")"),i.a.createElement("div",{className:"team-info-div"},i.a.createElement("div",{className:"team-members-div"},i.a.createElement("p",null,"Members"),i.a.createElement("div",{className:"members"},h)),u))),l.push(i.a.createElement("div",{className:"team-round-div",key:"teamRoundDiv"+s+c},d))}));var c=[],u="",m="";t.players.forEach((function(e,t){e.id===a.biribaDealer&&(u=e.id),e.id===a.cardDealer&&(m=e.id),c.push(i.a.createElement("option",{key:"candidates_"+t+s,value:e.id},e.name))}));var d=[],h=[];["1","2","3","4","5","6","7","8","9","10","J","Q","K","A","-"].forEach((function(e,a){d.push(i.a.createElement("option",{key:"candidateCardNumbers_"+s+a,value:e},e))})),["KA","TR","SP","KO","JO"].forEach((function(e,a){h.push(i.a.createElement("option",{key:"candidateCardSymbols_"+a+s,value:e},e))})),n.push(i.a.createElement("div",{className:"round-div",key:"roundDiv"+s},i.a.createElement("button",{id:"teams-round-div-active_"+s,onClick:e.toggleList},"Round ",a.round),i.a.createElement("div",{className:"teams-round-div"},l,i.a.createElement("div",{className:"round-info"},i.a.createElement("div",{className:"info"},i.a.createElement("p",null,"Biriba dealer"),i.a.createElement("select",{id:"biribaDealer_"+a.round,onChange:e.onRoundInfoChange,defaultValue:u},c)),i.a.createElement("div",{className:"info"},i.a.createElement("p",null,"Card dealer"),i.a.createElement("select",{id:"cardDealer_"+a.round,onChange:e.onRoundInfoChange,defaultValue:m},c)),i.a.createElement("div",{className:"info"},i.a.createElement("p",null,"Trump"),i.a.createElement("select",{defaultValue:a.trumpNumber,id:"trumpNumber_"+a.round,style:{gridColumn:"1/2",gridRow:"2/3"},onChange:e.onRoundInfoChange},d),i.a.createElement("select",{defaultValue:a.trumpSymbol,id:"trumpSymbol_"+a.round,style:{gridColumn:"2/3",gridRow:"2/3"},onChange:e.onRoundInfoChange},h))),i.a.createElement("div",{className:"save-options",key:"saveOption"},i.a.createElement("button",{onClick:e.updateBiribaNotes},"Save changes"),i.a.createElement("button",{onClick:e.resetBiribaNotes},"Reset data")))))}));var s=i.a.createElement("button",{key:"gameFinishedButton"+this.state.gameFinished,onClick:this.newRound},i.a.createElement("i",{className:"fa fa-plus"}));return this.state.gameFinished&&(s=i.a.createElement("button",{key:"gameFinishedButton"+this.state.gameFinished,onClick:this.moveGameToFinished,className:"new-game-div-button-ended"},"Game ended (move to finished)")),a.push(i.a.createElement("div",{className:"game-div",key:"gameDiv"},n,i.a.createElement("div",{className:"new-game-div"},s))),i.a.createElement("div",{className:"UnfinishedGame"},i.a.createElement("div",{className:"UnfinishedGame-container"},i.a.createElement("div",{className:"header"},i.a.createElement("p",null,"Unfinished Game ",this.props.unfinishedGameId),i.a.createElement(f.b,{to:"/biriba/unfinished-games"},i.a.createElement("i",{className:"fa fa-arrow-left"}))),i.a.createElement("div",{className:"line"}),i.a.createElement("div",{className:"section"},a)),";")}}]),t}(i.a.Component)),G=Object(v.f)(O),C=(t(41),function(e){Object(h.a)(t,e);var a=Object(b.a)(t);function t(e){var n;return Object(u.a)(this,t),(n=a.call(this,e)).state={biribaNotes:n.props.biribaNotes},n.toggleList=n.toggleList.bind(Object(d.a)(n)),n}return Object(m.a)(t,[{key:"toggleList",value:function(e){var a=document.getElementById(e.target.id),t=e.target.id.split("_")[0];a.nextElementSibling.classList.toggle(t)}},{key:"render",value:function(){var e=this,a=[],t=this.state.biribaNotes.finishedGames[this.props.finishedGameId],n=[];return t.rounds.forEach((function(a,s){var r=-1,l=[],o=0;t.teams.forEach((function(n,c){var u=[];a.scores.forEach((function(e,t){Number(e.teamId)===Number(n.id)&&(o=Number(e.biribaScore)+Number(e.countCardsScore)-Number(e.penalties),u.push(i.a.createElement("div",{className:"round-score-div",key:"roundScoreDiv"+c+t},i.a.createElement("p",null,"Round scores"),i.a.createElement("div",null,i.a.createElement("p",null,"Biriba score"),i.a.createElement("input",{id:"biribaScore_"+a.round+"_"+e.teamId,type:"number",min:"0",defaultValue:e.biribaScore,readOnly:!0})),i.a.createElement("div",null,i.a.createElement("p",null,"Count cards score"),i.a.createElement("input",{id:"countCardsScore_"+a.round+"_"+e.teamId,type:"number",min:"0",max:"2000",defaultValue:e.countCardsScore,readOnly:!0})),i.a.createElement("div",null,i.a.createElement("p",null,"Penalties"),i.a.createElement("input",{id:"penalties_"+a.round+"_"+e.teamId,type:"number",min:"0",defaultValue:e.countCardsScore,readOnly:!0})),i.a.createElement("div",null,i.a.createElement("p",null,"Close"),i.a.createElement("input",{id:"close_"+a.round+"_"+e.teamId,type:"checkbox",checked:e.close,unselectable:"true",readOnly:!0})))))}));var m=0;t.rounds.forEach((function(e,a){e.scores.forEach((function(e,a){Number(n.id)===Number(e.teamId)&&(m+=Number(e.biribaScore)+Number(e.countCardsScore)-Number(e.penalties),e.close&&(m+=100))}))})),r<m&&(r=m),u.push(i.a.createElement("div",{className:"round-score-div",key:"totalScores"+c+s},i.a.createElement("p",null,"Total scores"),i.a.createElement("div",null,i.a.createElement("p",null,"Total round score"),i.a.createElement("input",{key:o,type:"number",min:"0",readOnly:!0,defaultValue:o})),i.a.createElement("div",null,i.a.createElement("p",null,"Total score"),i.a.createElement("input",{key:m,type:"number",min:"0",readOnly:!0,defaultValue:m}))));var d=[],h=[];n.members.forEach((function(e,a){h.push(i.a.createElement("div",{key:"member"+a+c},t.players[e.id].name))})),d.push(i.a.createElement("div",{className:"team-div",key:"teamDiv"+s+c},i.a.createElement("button",{id:"team-info-div-active_"+s+"_"+c,onClick:e.toggleList},"Team ",n.id," (",m,")"),i.a.createElement("div",{className:"team-info-div"},i.a.createElement("div",{className:"team-members-div"},i.a.createElement("p",null,"Members"),i.a.createElement("div",{className:"members"},h)),u))),l.push(i.a.createElement("div",{className:"team-round-div",key:"teamRoundDiv"+s+c},d))}));var c=[],u="",m="";t.players.forEach((function(e,t){e.id===a.biribaDealer&&(u=e.id),e.id===a.cardDealer&&(m=e.id),c.push(i.a.createElement("option",{key:"candidates_"+t+s,value:e.id},e.name))}));var d=[],h=[];["1","2","3","4","5","6","7","8","9","10","J","Q","K","A","-"].forEach((function(e,a){d.push(i.a.createElement("option",{key:"candidateCardNumbers_"+s+a,value:e},e))})),["KA","TR","SP","KO","JO"].forEach((function(e,a){h.push(i.a.createElement("option",{key:"candidateCardSymbols_"+a+s,value:e},e))})),n.push(i.a.createElement("div",{className:"round-div",key:"roundDiv"+s},i.a.createElement("button",{id:"teams-round-div-active_"+s,onClick:e.toggleList},"Round ",a.round),i.a.createElement("div",{className:"teams-round-div"},l,i.a.createElement("div",{className:"round-info"},i.a.createElement("div",{className:"info"},i.a.createElement("p",null,"Biriba dealer"),i.a.createElement("select",{id:"biribaDealer_"+a.round,defaultValue:u,disabled:!0},c)),i.a.createElement("div",{className:"info"},i.a.createElement("p",null,"Card dealer"),i.a.createElement("select",{id:"cardDealer_"+a.round,defaultValue:m,disabled:!0},c)),i.a.createElement("div",{className:"info"},i.a.createElement("p",null,"Trump"),i.a.createElement("select",{defaultValue:a.trumpNumber,id:"trumpNumber_"+a.round,style:{gridColumn:"1/2",gridRow:"2/3"},disabled:!0},d),i.a.createElement("select",{defaultValue:a.trumpSymbol,id:"trumpSymbol_"+a.round,style:{gridColumn:"2/3",gridRow:"2/3"},disabled:!0},h))))))})),a.push(i.a.createElement("div",{className:"game-div",key:"gameDiv"},n)),i.a.createElement("div",{className:"FinishedGame"},i.a.createElement("div",{className:"FinishedGame-container"},i.a.createElement("div",{className:"header"},i.a.createElement("p",null,"Unfinished Game ",this.props.finishedGameId),i.a.createElement(f.b,{to:"/biriba/history"},i.a.createElement("i",{className:"fa fa-arrow-left"}))),i.a.createElement("div",{className:"line"}),i.a.createElement("div",{className:"section"},a)),";")}}]),t}(i.a.Component)),S=Object(v.f)(C),k=(t(42),function(e){Object(h.a)(t,e);var a=Object(b.a)(t);function t(e){var n;return Object(u.a)(this,t),(n=a.call(this,e)).enterFinishedGame=n.enterFinishedGame.bind(Object(d.a)(n)),n}return Object(m.a)(t,[{key:"enterFinishedGame",value:function(e){var a=e.target.id.split("_")[1];this.props.updateFinishedGameId(a),this.props.history.push("/biriba/history/game")}},{key:"render",value:function(){var e=this,a=[];return this.props.biribaNotes&&this.props.biribaNotes.finishedGames&&this.props.biribaNotes.finishedGames.forEach((function(t,n){if(t.finished){var s=-1;t.teams.forEach((function(e,a){var n=0;t.rounds.forEach((function(a,t){a.scores.forEach((function(a,t){Number(e.id)===Number(a.teamId)&&(n+=Number(a.biribaScore)+Number(a.countCardsScore))}))})),s<n&&(s=n)})),a.push(i.a.createElement("div",{className:"FinishedGame-part",key:"FinishedGame-part"+n,id:"FinishedGame_"+n,onClick:e.enterFinishedGame},i.a.createElement("p",{className:"title"},"Game:#",n),i.a.createElement("div",{className:"inline"},i.a.createElement("i",{className:"fa fa-calendar"}),i.a.createElement("p",{className:"date"},t.date)),i.a.createElement("p",null,"Players: ",t.players.length),i.a.createElement("p",null,"Max score: ",s),i.a.createElement("p",null,"Teams: ",t.teams.length),i.a.createElement("p",null,"Current round: ",t.rounds.length)))}})),0===a.length&&(a=i.a.createElement("p",null,"No finished games available")),i.a.createElement("div",{className:"History"},i.a.createElement("div",{className:"History-container"},i.a.createElement("div",{className:"header"},i.a.createElement("p",null,"History"),i.a.createElement(f.b,{to:"/biriba"},i.a.createElement("i",{className:"fa fa-arrow-left"}))),i.a.createElement("div",{className:"line"}),i.a.createElement("div",{className:"section"},a)),";")}}]),t}(i.a.Component)),I=Object(v.f)(k),F=function(e){Object(h.a)(t,e);var a=Object(b.a)(t);function t(e){return Object(u.a)(this,t),a.call(this,e)}return Object(m.a)(t,[{key:"render",value:function(){return i.a.createElement(f.a,null,i.a.createElement("div",{className:"Menu"},i.a.createElement(v.c,null,i.a.createElement(v.a,{exact:!0,path:"/biriba"},i.a.createElement("div",{className:"menu-container"},i.a.createElement("div",{className:"intro"},i.a.createElement("h1",null,"Menu")),i.a.createElement(f.b,{to:"/biriba/new-game"},i.a.createElement("i",{className:"fa fa-plus"}),i.a.createElement("p",null,"New Game Notes")),i.a.createElement(f.b,{to:"/biriba/unfinished-games"},i.a.createElement("i",{className:"fa fa-edit"}),i.a.createElement("p",null,"Unfinished Game Notes")),i.a.createElement(f.b,{to:"/biriba/history"},i.a.createElement("i",{className:"fa fa-clipboard"}),i.a.createElement("p",null,"History")))),i.a.createElement(v.a,{exact:!0,path:"/biriba/new-game"},i.a.createElement(N,{biribaNotes:this.props.biribaNotes,updateBiribaNotes:this.props.updateBiribaNotes,uploadFile:this.props.uploadFile,updateFile:this.props.updateFile})),i.a.createElement(v.a,{exact:!0,path:"/biriba/unfinished-games"},i.a.createElement(y,{biribaNotes:this.props.biribaNotes,updateBiribaNotes:this.props.updateBiribaNotes,uploadFile:this.props.uploadFile,updateFile:this.props.updateFile,updateUnfinishedGameId:this.props.updateUnfinishedGameId,unfinishedGameId:this.props.unfinishedGameId})),i.a.createElement(v.a,{exact:!0,path:"/biriba/history"},i.a.createElement(I,{biribaNotes:this.props.biribaNotes,finishedGameId:this.props.finishedGameId,updateFinishedGameId:this.props.updateFinishedGameId})),i.a.createElement(v.a,{exact:!0,path:"/biriba/unfinished-games/game"},i.a.createElement(G,{unfinishedGameId:this.props.unfinishedGameId,biribaNotes:this.props.biribaNotes,updateBiribaNotes:this.props.updateBiribaNotes,uploadFile:this.props.uploadFile,updateFile:this.props.updateFile})),i.a.createElement(v.a,{exact:!0,path:"/biriba/history/game"},i.a.createElement(S,{updateFinishedGameId:this.props.updateFinishedGameId,finishedGameId:this.props.finishedGameId,biribaNotes:this.props.biribaNotes})))))}}]),t}(i.a.Component),j=(t(43),function(e){Object(h.a)(t,e);var a=Object(b.a)(t);function t(){return Object(u.a)(this,t),a.apply(this,arguments)}return Object(m.a)(t,[{key:"render",value:function(){return i.a.createElement("div",{className:"Logout"},i.a.createElement("div",{className:"logout-container"},i.a.createElement("div",{className:"user"},i.a.createElement("i",{className:"fa fa-user"}),i.a.createElement("p",null,this.props.userMail)),i.a.createElement("button",{onClick:this.props.signOutFunction},i.a.createElement("i",{className:"fa fa-sign-out"}))))}}]),t}(i.a.Component)),T=function(){function e(){Object(u.a)(this,e)}return Object(m.a)(e,null,[{key:"getAPIKey",value:function(){return"AIzaSyDx-UwZd7JuuZZEKaA5OeCXpiWr4PGul9I"}},{key:"getClientID",value:function(){return"286520596166-kcoq2cmrbd0cejleemk2viuq6rguivhj.apps.googleusercontent.com"}}]),e}(),_="https://www.googleapis.com/auth/drive",w=T.getAPIKey(),P=T.getClientID(),D=function(e){Object(h.a)(t,e);var a=Object(b.a)(t);function t(){var e;return Object(u.a)(this,t),(e=a.call(this)).handleClientLoad=function(){window.gapi.load("client:auth2",e.initClient)},e.initClient=function(){try{window.gapi.client.init({apiKey:w,clientId:P,scope:_,discoveryDocs:["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"]}).then((function(){e.setState({googleAuth:window.gapi.auth2.getAuthInstance()}),e.state.googleAuth.isSignedIn.listen(e.updateSigninStatus)}))}catch(a){console.log(a)}},e.signInFunction=function(){try{e.state.googleAuth.signIn(),e.updateSigninStatus()}catch(a){console.log(a)}},e.signOutFunction=function(){e.state.googleAuth.signOut(),e.updateSigninStatus()},e.updateSigninStatus=function(){e.setSigninStatus()},e.setSigninStatus=Object(c.a)(o.a.mark((function a(){var t;return o.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return e.setState({userMail:""}),a.next=3,e.state.googleAuth.currentUser.get();case 3:t=a.sent,t.hasGrantedScopes(_)&&e.setState({userMail:t.vt.cu}),e.readFile().then((function(a){console.log("File read : "+a),e.setState({biribaNotes:JSON.parse(a.body)})})).catch((function(e){console.log("No available file : "+e)}));case 7:case"end":return a.stop()}}),a)}))),e.checkFileExists=Object(c.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,a){window.gapi.client.drive.files.list({q:"name='biriba-notes'"}).execute((function(t){t.files&&t.files.length&&t.files[0].id?e(t.files[0].id):a(null)}))})));case 1:case"end":return e.stop()}}),e)}))),e.readFile=Object(c.a)(o.a.mark((function a(){return o.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.abrupt("return",new Promise((function(a,t){e.checkFileExists().then((function(n){e.setState({fileId:n}),window.gapi.client.drive.files.get({fileId:n,alt:"media"}).then((function(e){console.log("file with this id found"),a(e)})).catch((function(e){console.log("file with this id does not exist"),t("ID_NOT_EXIST")}))})).catch((function(e){console.log("file with this name does not exist"),t("NAME_NOT_EXIT")}))})));case 1:case"end":return a.stop()}}),a)}))),e.uploadFile=function(e){var a="-------314159265358979323846264",t="\r\n--"+a+"\r\n",n=btoa(JSON.stringify(e)),i=t+"Content-Type: application/json\r\n\r\n"+JSON.stringify({title:"biriba-notes"})+t+"Content-Type: text/plain\r\nContent-Transfer-Encoding: base64\r\n\r\n"+n+"\r\n---------314159265358979323846264--";window.gapi.client.request({path:"/upload/drive/v2/files",method:"POST",params:{uploadType:"multipart"},headers:{"Content-Type":'multipart/mixed; boundary="'+a+'"'},body:i}).execute((function(e){console.log("New file upploaded!")}))},e.updateFile=function(a){var t="-------314159265358979323846264",n="\r\n--"+t+"\r\n",i=btoa(JSON.stringify(a)),s=n+"Content-Type: application/json\r\n\r\n"+JSON.stringify({title:"biriba-notes"})+n+"Content-Type: text/plain\r\nContent-Transfer-Encoding: base64\r\n\r\n"+i+"\r\n---------314159265358979323846264--";window.gapi.client.request({path:"/upload/drive/v2/files/"+e.state.fileId,method:"PUT",params:{uploadType:"multipart",alt:"json"},headers:{"Content-Type":'multipart/mixed; boundary="'+t+'"'},body:s}).execute((function(e){console.log("File updated!")}))},e.state={name:"",googleAuth:"",userMail:"",biribaNotes:{},fileId:"",unfinishedGameId:-1,finishedGameId:-1},e.initClient=e.initClient.bind(Object(d.a)(e)),e.signInFunction=e.signInFunction.bind(Object(d.a)(e)),e.signOutFunction=e.signOutFunction.bind(Object(d.a)(e)),e.updateSigninStatus=e.updateSigninStatus.bind(Object(d.a)(e)),e.handleClientLoad=e.handleClientLoad.bind(Object(d.a)(e)),e.setSigninStatus=e.setSigninStatus.bind(Object(d.a)(e)),e.checkFileExists=e.checkFileExists.bind(Object(d.a)(e)),e.readFile=e.readFile.bind(Object(d.a)(e)),e.uploadFile=e.uploadFile.bind(Object(d.a)(e)),e.updateBiribaNotes=e.updateBiribaNotes.bind(Object(d.a)(e)),e.updateFile=e.updateFile.bind(Object(d.a)(e)),e.updateUnfinishedGameId=e.updateUnfinishedGameId.bind(Object(d.a)(e)),e.updateFinishedGameId=e.updateFinishedGameId.bind(Object(d.a)(e)),e}return Object(m.a)(t,[{key:"componentDidMount",value:function(){var e=document.createElement("script");e.onload=this.handleClientLoad,e.src="https://apis.google.com/js/api.js",document.body.appendChild(e)}},{key:"updateBiribaNotes",value:function(e){this.setState({biribaNotes:e})}},{key:"updateUnfinishedGameId",value:function(e){this.setState({unfinishedGameId:e})}},{key:"updateFinishedGameId",value:function(e){this.setState({finishedGameId:e})}},{key:"render",value:function(){var e="",a="";return""===this.state.userMail||void 0===this.state.userMail?e=i.a.createElement(p,{signInFunction:this.signInFunction}):(e=i.a.createElement(F,{biribaNotes:this.state.biribaNotes,updateBiribaNotes:this.updateBiribaNotes,uploadFile:this.uploadFile,updateFile:this.updateFile,updateUnfinishedGameId:this.updateUnfinishedGameId,updateFinishedGameId:this.updateFinishedGameId,unfinishedGameId:this.state.unfinishedGameId,finishedGameId:this.state.finishedGameId}),a=i.a.createElement(j,{userMail:this.state.userMail,signOutFunction:this.signOutFunction})),i.a.createElement("div",{className:"App"},a,e)}}]),t}(i.a.Component);r.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(D,null)),document.getElementById("root"))}},[[23,1,2]]]);
//# sourceMappingURL=main.ff030793.chunk.js.map