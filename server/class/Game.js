class Game {
  constructor() {
    this._rooms = [];
    this._players = [];
  }

  get rooms() {
    return this._rooms;
  }
  get players() {
    return this._players;
  }

  addRoom(room) {
    this._rooms.push(room);
    return room;
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

  // toObject() {
  //   return;
  // }
}

module.exports = Game;
