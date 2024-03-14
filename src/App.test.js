import React from "react";
import { render, screen, unmountComponentAtNode } from "@testing-library/react";
import App from "./App";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom/extend-expect";

describe("App component Testing", () => {
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

  test("Testing container", () => {
    act(() => {
      render(<App />, container);
    });
    expect(container).toBeDefined();
  });
});
