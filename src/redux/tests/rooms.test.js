import reducer, {
  listInitialState,
  selectroomsList,
  setRooms,
} from "../rooms/reducers";

describe("Rooms reducers", () => {
  it("Should return the initial state of rooms on first run", () => {
    const nextState = listInitialState;

    const result = reducer(undefined, {});

    expect(result).toEqual(nextState);
  });

  it("Should set the rooms state upon creating room", () => {
    const data = {
      roomsList: {
        roomsList: [
          {
            id: "1d2d3d",
            name: "Salut",
            owner: "Thyrse",
            members: [],
            size: 5,
          },
        ],
      },
    };

    const nextState = reducer(listInitialState, setRooms(data));

    const rootState = { roomsList: nextState };
    expect(selectroomsList(rootState)).toEqual(data);
  });
});
