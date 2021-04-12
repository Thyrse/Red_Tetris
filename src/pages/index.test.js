import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Login from "./Login";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

const middlewares = [thunk];

const mockStore = configureStore(middlewares);
const initialState = {
  userDatas: null,
  roomsList: [],
  usersList: null,
};

const store = mockStore(initialState);

describe("<Login />", () => {
  test("Login redering upon arrival", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
