import React from "react";

import { render, screen, fireEvent, waitForElement, cleanup } from "@testing-library/react";
import axios from "axios";
import { act } from "react-dom/test-utils";

import * as allApiCalls from "../../Apis/Api";
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

jest.mock("axios");

describe("Home component Testing", () => {
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
    cleanup();
    container.remove();
    container = null;
  });

  test("Testing Home Page ", () => {
    act(() => {
      render(<Home {...props} />, container);
      expect(container).toBeDefined();
    });
  });

  it("Testing api in useEffect when it is success", async () => {
    //  Here we have Mocked axios and passing mocked values to test api.
    axios.get.mockResolvedValue({
      data: {
        items: [
          { id: 1, name: "A", default_branch: "main", language: "eng", forks: "yes", git_url: "www", topics: [1, 2, 3, 4, 5], score: "88" },
          { id: 2, name: "B", default_branch: "master", language: "jpn", forks: "yes", git_url: "www", topics: [8, 9, 10, 11], score: "98" },
        ],
      },
    });

    await act(async () => {
      render(<Home {...props} />, container);
      expect(container).toBeDefined();
    });
  });

  it("Testing api in useEffect when it is failed", async () => {
    //  Here we have Mocked axios and passing mocked values to test api.
    axios.get.mockRejectedValue("Not Found");

    await act(async () => {
      render(<Home {...props} />, container);
      expect(container).toBeDefined();
    });
  });

  test("should test all the table headings", () => {
    act(() => {
      render(<Home {...props} />, container);
    });
    const textDetails = ["Repository Name", "Default Branch", "Language", "Fork", "Git URL", "Topics", "Score"];
    textDetails.forEach((item) => {
      const linkElement = screen.getByText(item);
      expect(linkElement).toBeInTheDocument();
    });
  });
});
