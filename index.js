const PC = require('pokemon-showdown-api')
const Pokemon = require('./pokemon')

const pclient = new PC.PokeClient('ws://localhost:8000/showdown/websocket', 'https://play.pokemonshowdown.com/~~localhost/action.php')

const MT = PC.PokeClient.MESSAGE_TYPES

const ID = Math.floor(Math.random() * 100)
const USERNAME = 'pokeai'

let BATTLE_ROOM_ID

pclient.connect()

pclient.on('ready', () => {
  console.log('Connected')
  pclient.login(USERNAME + ID)
})
 
// Successful login. 
pclient.on('login', function(user) {
  console.log('Logged in as ', user.data.username)
  pclient.send('/join lobby')
})

// A battle challenge from another user has been received. 
pclient.on('self:challenges', res => {
  let challenger = Object.keys(res.data.challengesFrom)[0]
  let type = res.data.challengesFrom[challenger]  
  if(challenger) {
    console.log(challenger + ' would like to ' + type + '!')
    pclient.send('/accept ' + challenger, res.room)    
  }
})

// Login failed. 
pclient.on('error:login', function(err) {
  console.log('Error encountered while logging in:', err.message)
})

let handlerMap = {
  [MT.BATTLE.START]: onBattleStart,
  [MT.BATTLE.ACTIONS.MAJOR.SWITCH]: onSwitch,
  [MT.BATTLE.ACTIONS.MAJOR.MOVE]: onMove
}

pclient.on('message', function(res) {
  console.log(res.type)
  handlerMap[res.type](res)
  // switch(res.type) {
  //   case MT.BATTLE.POKE:
  //     console.log('pokemon')
  //   break
  //   case MT.BATTLE.START:
      
  //   break
  //   case MT.BATTLE.ACTIONS.MAJOR.MOVE:
  //     console.log('move', res)
  //   break
  //   case MT.BATTLE.ACTIONS.MAJOR.SWITCH:
  //     onSwitch(res);
  //   break
  //   case MT.BATTLE.ACTIONS.MAJOR.SWAP:
  //     console.log('swap', res)
  //   break
  //   case MT.BATTLE.ACTIONS.MAJOR.FAINT:
  //     console.log('faint', res)
  //   break
  //   case MT.BATTLE.ACTIONS.MAJOR.DETAILSCHANGE:
  //     console.log('details change', res)
  //   break
  // }
})

let pokemons = []

function onBattleStart(response) {
  BATTLE_ROOM_ID = res.room
  pclient.send('/move 1', BATTLE_ROOM_ID)
}

function onMove(response) {
  let owner = response.data.pokemon.split(':')[0]
  let pokemonName = trim( response.data.pokemon.split(':')[1] )
  let move = response.data.move
}

function onSwitch(response) {
  let pokemon = new Pokemon(
    response.data.details.split(',')[0],
    response.data.hp,
    response.data.pokemon.split(':')[0],
    true
  )
  if( !pokemons.some(p => p.name == pokemon.name) )
    pokemons.push(pokemon)
}