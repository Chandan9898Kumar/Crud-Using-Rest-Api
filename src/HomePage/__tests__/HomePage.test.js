import React from "react";

import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import Home from "../HomePage";
import "@testing-library/jest-dom/extend-expect";

describe("Home component Testing", () => {
  let container = null;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
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
});
