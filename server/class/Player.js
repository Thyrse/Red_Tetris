class Player {
  constructor() {
    this._players = null;
  }

  get players() {
    return this._players;
  }

  updatePlayers(player) {
    this._players = player;
    return player;
  }
}

module.exports = Player;
