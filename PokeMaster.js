// http://naimcommand.blogspot.com/2014/07/pokemon-showdown-commands.html
// https://pokemondb.net/pokebase/252493/what-are-all-the-commands-in-pokemon-showdown

const PokeClientAdapter = require('./PokeClientAdapter')

class PokeMaster {
    constructor(username = 'pokeai') {
        this.pokeClient = new PokeClientAdapter(username)
        this.pokemons = []
    }

    move(moveNumber) {
        let command = '\move '.concat(moveNumber)
        this.pokeClient.send(command)
    }

    swap(pokeId) {
        let command = '\swap '.concat(pokeId)
        this.pokeClient.send(command)
    }
}

module.exports = PokeMaster