import React from "react";
import { mount, shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Chat from "../../components/Chat";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import socketIOClient from "socket.io-client";

const socket = socketIOClient.connect("http://localhost:4000");

const middlewares = [thunk];

const mockJest = jest.fn();

const mockStore = configureStore(middlewares);
const initialState = {
  userData: {
    userDatas: {
      username: "ZIPHLOT",
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
        username: "ZIPHLOT",
        inGame: false,
        room: "Lobby",
      },
    ],
  },
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

it("Chat rendering upon arrival", () => {
  const wrapper = renderer
    .create(
      <Provider store={store}>
        <Chat {...props} />
      </Provider>
    )
    .toJSON();
  expect(wrapper).toMatchSnapshot();
});

it("Should send the message if its valid", () => {
  const fakeEvent = { preventDefault: () => console.log("preventDefault") };
  const wrapper = mount(
    <Provider store={store}>
      <Chat {...props} />
    </Provider>
  );
  const messageText = "Message test";
  const event = { target: { value: messageText } };
  expect(wrapper.find(".msg-new-input").simulate("change", event));
  wrapper.find("#formulaire_chat").simulate("submit", fakeEvent);
  expect(wrapper.find(".msg-new-input").props().value).toBe("");
});
