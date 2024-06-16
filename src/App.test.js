import React from "react";

import { render, screen, unmountComponentAtNode, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import App from "./App";
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
    expect(datas).toBeDefined();
  });
});




// test('increment count on button click', () => {
//   const { getByText, getByTestId } = render(<App />);

//   expect(getByTestId('count')).toHaveTextContent('0');

//   fireEvent.click(getByText('Click me'));

//   expect(getByTestId('count')).toHaveTextContent('1');
// });