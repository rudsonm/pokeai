const PC = require('pokemon-showdown-api');
//const https = require("https");

const pclient = new PC.PokeClient('ws://localhost:8000/showdown/websocket', 'http://localhost:8000/action.php');

const ID = Math.floor(Math.random() * 100);
const USERNAME = 'pokeai';

pclient.connect();

pclient.on('ready', () => {
  console.log('Connected');
  pclient.login(USERNAME + ID);
});
 
// Successful login. 
pclient.on('login', function(user) {
  console.log('Logged in as:', user.data.username, user);
});

// A battle challenge from another user has been received. 
pclient.on('self:challenges', res => {
  let challenger = Object.keys(res.data.challengesFrom)[0];
  let type = res.data.challengesFrom[challenger];
  console.log(challenger + ' would like to ' + type + '!', res);
  pclient.send('accept ' + challenger, res.room);
});

// Login failed. 
pclient.on('error:login', function(err) {
  console.log('Error encountered while logging in:', err.message);
});