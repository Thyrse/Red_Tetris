import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Login from "./Login";
import { describe } from "yargs";

console.log("Salut");

describe("<Login />", () => {
  test("Login rederinng upon arrival", () => {
    const wrapper = shallow(<Login />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
