class Game {
  constructor() {
    this._rooms = [];
    this._players = null;
  }

  get rooms() {
    return this._rooms;
  }
  get players() {
    return this._players;
  }

  updateRooms(room) {
    this._rooms = room;
    return room;
  }

  updatePlayers(player) {
    this._players = player;
    return player;
  }

  findRoom(roomName) {
    return this._room.find((room) => roomName.name === roomName);
  }

  findPlayer(playerId) {
    return this._players.find((player) => player.id === playerId);
  }
}

module.exports = Game;
