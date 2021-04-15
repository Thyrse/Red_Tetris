import React from "react";
import { mount, shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Home from "../Home";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import socketIOClient from "socket.io-client";
import { string } from "yargs";

const socket = socketIOClient.connect("http://localhost:4000");

const middlewares = [thunk];

const mockJest = jest.fn();

const mockStore = configureStore(middlewares);
const initialState = {
  userData: {
    userDatas: {
      username: "Ziphlot",
      socketID: socket.id,
      inGame: false,
      ownedRooms: [],
      room: "Lobby",
    },
  },
  listUsers: {
    usersList: [
      {
        id: "1d2d3d",
        username: "Ziphlot",
        inGame: false,
        room: "Lobby",
      },
    ],
  },
  roomsList: {
    roomsList: [
      {
        id: "1d2d3d",
        name: "salut",
        owner: "Thyrse",
        members: [],
        size: 5,
      },
    ],
  },
};

const store = mockStore(initialState);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockJest,
  }),
}));

const props = {
  socket: socket,
};

it("Homepage rendering upon arrival", () => {
  const wrapper = renderer
    .create(
      <Provider store={store}>
        <Home {...props} />
      </Provider>
    )
    .toJSON();
  expect(wrapper).toMatchSnapshot();
});

it("Should validate the room creation if name valid", () => {
  const fakeEvent = { preventDefault: () => console.log("preventDefault") };
  const wrapper = mount(
    <Provider store={store}>
      <Home {...props} />
    </Provider>
  );
  const roomName = "Salut";
  const event = { target: { value: roomName } };
  expect(wrapper.find(".control-room").simulate("change", event));
  wrapper.find(".form-room").simulate("submit", fakeEvent);
  expect(wrapper.find(".control-room").props().value).toBe("");
});

// it("Should redirect on form submission if an username is provided", () => {
//   const fakeEvent = { preventDefault: () => console.log("preventDefault") };
//   const wrapper = mount(
//     <Provider store={store}>
//       <Home {...props} />
//     </Provider>
//   );
//   const username = "Ziphlot";
//   const event = { target: { value: username } };
//   expect(wrapper.find(".form-control").simulate("change", event));
//   wrapper.find(".form-login").simulate("submit", fakeEvent);
//   expect(mockJest).toHaveBeenCalledWith("/home");
// });
