class Game {
  constructor() {
    this._rooms = [];
  }

  get rooms() {
    return this._rooms;
  }

  updateRooms(room) {
    this._rooms = room;
    return room;
  }
}

module.exports = Game;
