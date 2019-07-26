class Pokemon {
    constructor(name, hp, trainer, active) {
        this.name = name
        this.hp = hp
        this.trainer = trainer
        this.active = active
        this.moves = []
    }

    addMove(move) {
        if(!this.moves.some(m => m.name == move.name))
            this.moves.push(move)
    }
}

module.exports = Pokemon