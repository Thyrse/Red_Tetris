import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Login from "./Login";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

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
    const wrapper = shallow(<Login store={store} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
