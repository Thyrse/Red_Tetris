class Game {
  constructor() {
    this._room = [];
    this._players = [];
  }

  get rooms() {
    return this._rooms;
  }
  get players() {
    return this._players;
  }

  addRomm(room) {
    this._room.push(room);
  }

  addPlayer(player) {
    this._players.push(player);
    return player;
  }

  findRoom(roomName) {
    return this._room.find((room) => roomName.name === roomName);
  }

  findPlayer(playerId) {
    return this._players.find((player) => player.id === playerId);
  }

  toObject() {
    return;
  }
}

// const instance = new Game();

export default Game;
