import React from "react";
import { mount, shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Login from "./Login";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import socketIOClient from "socket.io-client";

const socket = socketIOClient.connect("http://localhost:4000");

console.log("SOCKET IN UNIT TEST ==>", socket);

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
  // const fakeEvent = { preventDefault: () => console.log("preventDefault") };
  const wrapper = mount(
    <Provider store={store}>
      <Login {...props} />
    </Provider>
  );
  // renderer
  //   .create(
  //     <Provider store={store}>
  //       <Login />
  //     </Provider>
  //   )
  //   .toJSON();
  const username = "Ziphlot";
  const event = { target: { value: username } };
  expect(wrapper.find(".form-control").simulate("change", event));
  expect(wrapper.find(".form-control").props().value).toBe(username);

  // wrapper.find(".form-login").simulate("submit", fakeEvent);
  // console.log(wrapper.find(".form-control").name);
  // expect(wrapper.find(".form-control").name).toBeTruthy();
});

it("Should redirect on form submission if an username is provided", () => {
  const fakeEvent = { preventDefault: () => console.log("preventDefault") };
  const wrapper = mount(
    <Provider store={store}>
      <Login {...props} />
    </Provider>
  );
  // renderer
  //   .create(
  //     <Provider store={store}>
  //       <Login />
  //     </Provider>
  //   )
  //   .toJSON();
  const username = "Ziphlot";
  const event = { target: { value: username } };
  expect(wrapper.find(".form-control").simulate("change", event));
  wrapper.find(".form-login").simulate("submit", fakeEvent);
  expect(mockJest).toHaveBeenCalledWith("/home");

  // wrapper.find(".form-login").simulate("submit", fakeEvent);
  // console.log(wrapper.find(".form-control").name);
  // expect(wrapper.find(".form-control").name).toBeTruthy();
});

// it("Login rendering upon arrival ENZYME", () => {
//   const tree = mount(<Provider store={store} />);
//   expect(toJson(tree)).toMatchSnapshot();
// });
// describe("<Login />", () => {
//   test("Login rendering upon arrival", () => {
//     const wrapper = renderer.create(<Provider store={store} />).toJSON()
//     expect(wrapper).toMatchSnapshot();
//   });

// test("Should throw an error on submission without username provided", () => {
//   const fakeEvent = { preventDefault: () => console.log("preventDefault") };
//   const wrapper = shallow(
//     <Provider store={store}>
//       <Login />
//     </Provider>
//   );
//   expect(wrapper.find(".form-login").length).toBe(1);
//   wrapper.find(".form-login").simulate("submit", fakeEvent);
//   expect(wrapper.find(Notification).length).toBe(1);

// const username = "Ziphlot";
// const event = { target: { value: username } };

// wrapper.find(StyledTextField).simulate("change", event);
// expect(wrapper.find(StyledTextField).props().value).toBe(username);
// expect(wrapper.find(StyledTextField).props().error).not.toBeTruthy();
// wrapper.find(StyledForm).simulate("submit", {
//   preventDefault: () => {},
// });
// expect(props.connectPlayer.mock.calls.length).toBe(1);
// });
// });
