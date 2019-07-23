const PC = require('pokemon-showdown-api')

const SERVER_URI = 'ws://localhost:8000/showdown/websocket',
      LOGIN_URI = 'http://localhost:8000/action.php'

class PokeClientAdapter {

    constructor(username) {
        this.pClient = new PC.PokeClient(SERVER_URI, LOGIN_URI)
        this.username = username

        this.pClient.on('ready', this.onReady)
        this.pClient.on('login', this.onLogin)
        this.pClient.on('self:challenges', this.onChallenge)
        this.pClient.on('error:login', this.onErrorLogin)

        this.pClient.connect()
    }

    connect() {
        this.pClient.connect()
    }

    onLogin(user) {
        console.log('Logged in as:', user.data.username, user)
    }

    onReady() {
        
        this.pClient.login(this.username)
    }

    onChallenge(res) {
        let challenger = Object.keys(res.data.challengesFrom)[0]
        let type = res.data.challengesFrom[challenger]
        console.log(challenger + ' would like to ' + type + '!', res)
        this.pClient.send('accept ' + challenger, res.room)
    }

    onErrorLogin(err) {
        console.log('Error encountered while logging in:', err.message)
    }
}

module.exports = PokeClientAdapter