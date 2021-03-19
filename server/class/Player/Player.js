class Player {
  constructor(name = "", id = "") {
    this._name = name;
    this._id = id;
  }

  get name() {
    return this._name;
  }
  get id() {
    return this._id;
  }

  toObject() {
    return {
      name: this._name,
      id: this._id,
    };
  }
}
export default Player;
