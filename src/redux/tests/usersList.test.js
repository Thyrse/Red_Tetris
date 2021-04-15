import reducer, {
  listInitialState,
  selectusersList,
  setUsersList,
} from "../usersList/reducers";

describe("UsersList reducers", () => {
  it("Should return the initial state of usersList on first run", () => {
    const nextState = listInitialState;

    const result = reducer(undefined, {});

    expect(result).toEqual(nextState);
  });

  it("Should update the usersList state upon refreshing it", () => {
    const data = {
      listUsers: {
        usersList: [
          {
            id: "1d2d3d",
            username: "ZIPHLOT",
            inGame: false,
            room: "Lobby",
          },
        ],
      },
    };

    const nextState = reducer(listInitialState, setUsersList(data));

    const rootState = { usersList: nextState };
    expect(selectusersList(rootState)).toEqual(data);
  });
});
