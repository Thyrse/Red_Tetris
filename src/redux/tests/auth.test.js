import reducer, {
  userInitialState,
  setUserData,
  selectuserDatas,
  setDisconnectUser,
} from "../auth/reducers";

describe("Auth reducers", () => {
  it("Should return the initial state of auth on first run", () => {
    const nextState = userInitialState;

    const result = reducer(undefined, {});

    expect(result).toEqual(nextState);
  });

  it("Should set the auth state upon sign in", () => {
    const data = {
      userData: {
        userDatas: {
          username: "ZIPHLOT",
          socketID: "1d2d3d",
          inGame: false,
          ownedRooms: [],
          room: "Lobby",
        },
      },
    };

    const nextState = reducer(userInitialState, setUserData(data));

    const rootState = { userDatas: nextState };
    expect(selectuserDatas(rootState)).toEqual(data);
  });

  it("Should clean the auth state on sign out", () => {
    const data = null;

    const nextState = reducer(userInitialState, setDisconnectUser());

    const rootState = { userDatas: nextState };
    expect(selectuserDatas(rootState)).toEqual(data);
  });
});
