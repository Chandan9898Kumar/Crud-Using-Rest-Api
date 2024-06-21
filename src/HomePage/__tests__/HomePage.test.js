import React from "react";

import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import Home from "../HomePage";

import "@testing-library/jest-dom/extend-expect";
import Enzyme from "enzyme";
import { shallow, mount } from "enzyme";
import Adapter from "@cfaester/enzyme-adapter-react-18";
Enzyme.configure({ adapter: new Adapter() });

const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test="${val}"]`);

const props = {
  onClick: jest.fn(),
};

describe("Home component Testing", () => {
  let wrapper;
  let container = null;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    wrapper = mount(<Home {...props} />);
  });

  afterEach(() => {
    // cleanup on exiting
    // unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  test("Testing Home Page ", () => {
    act(() => {
      render(<Home />, container);
    });
    expect(container).toBeDefined();
  });

  test("should test all the table headings", () => {
    act(() => {
      render(<Home />, container);
    });
    const textDetails = ["Repository Name", "Default Branch", "Language", "Fork", "Git URL", "Topics", "Score"];
    textDetails.forEach((item) => {
      const linkElement = screen.getByText(item);
      expect(linkElement).toBeInTheDocument();
    });
  });
});
