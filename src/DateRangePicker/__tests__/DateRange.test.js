import React from "react";

import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import DateRange from "../DateRange";

import "@testing-library/jest-dom/extend-expect";
import Enzyme from "enzyme";
import { shallow, mount } from "enzyme";
import Adapter from "@cfaester/enzyme-adapter-react-18";
Enzyme.configure({ adapter: new Adapter() });

const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test="${val}"]`);

const props = {
  selectionRange: {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection Date",
  },
  handleSelect: jest.fn(),
  onchange: jest.fn(),
  onclick: jest.fn(),
};

describe("Testing Date Range Picker", () => {
  let container = null;
  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    jest.useFakeTimers();
  });

  afterEach(() => {
    // cleanup on exiting
    // unmountComponentAtNode(container);
    jest.clearAllMocks();
    jest.clearAllTimers();
    container.remove();
    container = null;
  });

  test("Testing DateRange Page ", () => {
    act(() => {
      render(<DateRange {...props} />, container);
    });
    expect(container).toBeDefined();
  });

  test("Test click Event", () => {
    // render is responsible for rendering your app to the JS Dom, and screen allows you to interact with it and see what's there.
    act(() => {
      render(<DateRange {...props} />, container);
    });
    fireEvent.click(screen.getByText(/Select Date/i));
    const removeDate = screen.getByText(/Remove Date/i);
    expect(removeDate).toBeDefined();
  });
});
