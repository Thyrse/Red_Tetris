import React from "react";
import { mount } from "enzyme";
import Login from "../Login";
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
  userDatas: null,
  roomsList: [],
  usersList: null,
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
describe("Login unit test", () => {
  it("Login rendering upon arrival", () => {
    const wrapper = renderer
      .create(
        <Provider store={store}>
          <Login {...props} />
        </Provider>
      )
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it("Should throw an error on submission without username provided", () => {
    const wrapper = mount(
      <Provider store={store}>
        <Login {...props} />
      </Provider>
    );
    const username = "Ziphlot";
    const event = { target: { value: username } };
    expect(wrapper.find(".form-control").simulate("change", event));
    expect(wrapper.find(".form-control").props().value).toBe(username);
  });

  it("Should redirect to home on form submission if an username is provided", () => {
    const fakeEvent = { preventDefault: () => console.log("preventDefault") };
    const wrapper = mount(
      <Provider store={store}>
        <Login {...props} />
      </Provider>
    );
    const username = "Ziphlot";
    const event = { target: { value: username } };
    expect(wrapper.find(".form-control").simulate("change", event));
    wrapper.find(".form-login").simulate("submit", fakeEvent);
    expect(mockJest).toHaveBeenCalledWith("/home");
  });
});
