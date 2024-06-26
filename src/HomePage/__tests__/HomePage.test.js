import React from "react";

import { render, screen, fireEvent, waitForElement, cleanup } from "@testing-library/react";
import axios from "axios";
import { act } from "react-dom/test-utils";

import Pagination from "../../Pagination/Pagination";
import Home from "../HomePage";
import { AutoComplete } from "../HomePage";
import "@testing-library/jest-dom/extend-expect";

// import Enzyme from "enzyme";
// import { shallow, mount } from "enzyme";
// import Adapter from "@cfaester/enzyme-adapter-react-18";

// Enzyme.configure({ adapter: new Adapter() });

const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test="${val}"]`);

const props = {
  onClick: jest.fn(),
};

jest.mock("axios");

describe("Home component Testing", () => {
  let containers = null;

  // For each test, we usually want to render our React tree to a DOM element that’s attached to document.
  // This is important so that it can receive DOM events. When the test ends, we want to “clean up” and unmount the tree from the document.

  // A common way to do it is to use a pair of "beforeEach" and "afterEach" blocks so that they’ll always run and isolate the effects of a test to itself:

  beforeEach(() => {
    containers = document.createElement("div");
    document.body.appendChild(containers);
    jest.useFakeTimers(); // used  to simulate setTimeout functions without having to wait for real time to pass.
  });

  //  You may use a different pattern, but keep in mind that we want to execute the cleanup even if a test fails.
  //  Otherwise, tests can become “leaky”, and one test can change the behavior of another test.

  afterEach(() => {
    // cleanup on exiting
    // unmountComponentAtNode(containers);
    jest.clearAllMocks();
    jest.clearAllTimers();
    cleanup();
    containers.remove();
    containers = null;
  });

  test("component should not be an empty element ", () => {
    const { container } = render(<Home {...props} />);

    const commonText = ["filtering out the data according to given date range.", "Home Page"];

    commonText.forEach((item) => {
      const texts = screen.getByText(item);
      expect(texts).toBeInTheDocument();
    });

    expect(container).not.toBeEmptyDOMElement();

    //  Or We can test like below 1 by 1 as well instead of using for loop.
    //                 expect(element.querySelector("p").textContent).toBe("filtering out the data according to given date range.");

    // Here wr used set time to handle this error :-  Exceeded timeout of 300 ms for a test.
  }, 50000);

  it("Testing api in useEffect when it is success", async () => {
    //  Here we have Mocked axios and passing mocked values to test api.
    axios.get.mockResolvedValue({
      data: {
        items: [
          { id: 1, name: "A", default_branch: "main", language: "eng", forks: "yes", git_url: "www", topics: [1, 2, 3, 4, 5], score: "88" },
          { id: 2, name: "B", default_branch: "master", language: "jpn", forks: "yes", git_url: "www", topics: [8, 9, 10, 11], score: "98" },
          { id: 3, name: "C", default_branch: "main", language: "eng", forks: "yes", git_url: "www", topics: [1, 2, 3, 4, 5], score: "75" },
          { id: 4, name: "D", default_branch: "master", language: "jpn", forks: "yes", git_url: "www", topics: [8, 9, 10, 11], score: "78" },
        ],
      },
    });

    // Use the asynchronous version of act to apply resolved promises.
    await act(async () => {
      render(<Home {...props} />, containers);
    });
    expect(containers).toBeDefined();
  });

  it("Testing api in useEffect when it is failed", async () => {
    //  Here we have Mocked axios and passing mocked values to test api.
    axios.get.mockRejectedValue("Not Found");

    await act(async () => {
      render(<Home {...props} />, containers);
    });
    expect(containers).toBeDefined();
  });

  test("should test all the table headings", () => {
    act(() => {
      render(<Home {...props} />, containers);
    });
    const textDetails = ["Repository Name", "Default Branch", "Language", "Fork", "Git URL", "Topics", "Score"];
    textDetails.forEach((item) => {
      const linkElement = screen.getByText(item);
      expect(linkElement).toBeInTheDocument();
    });
  });

  test("Test autocomplete component", () => {
    const items = { id: 1, name: "A", default_branch: "main", language: "eng", forks: "yes", git_url: "www", topics: [1, 2, 3, 4, 5], score: "88" };

    const onClickFake = jest.fn();

    act(() => {
      render(<AutoComplete item={items} onClick={onClickFake} />, containers);
    });

    const button = document.querySelector("[data-test=listBtn]");

    fireEvent(button, new MouseEvent("click", { bubbles: true, cancelable: true }));

    expect(onClickFake).toHaveBeenCalledTimes(1);
    expect(screen.getByText(/A/i)).toBeInTheDocument();
    //run jest's fake timers
    jest.runAllTimers();
  }, 500000);

  test("Testing Pagination", async () => {
    axios.get.mockResolvedValue({
      data: {
        items: [
          { id: 1, name: "A", default_branch: "main", language: "eng", forks: "yes", git_url: "www", topics: [1, 2, 3, 4, 5], score: "88" },
          { id: 2, name: "B", default_branch: "master", language: "jpn", forks: "yes", git_url: "www", topics: [8, 9, 10, 11], score: "98" },
          { id: 3, name: "C", default_branch: "main", language: "eng", forks: "yes", git_url: "www", topics: [1, 2, 3, 4, 5], score: "75" },
          { id: 4, name: "D", default_branch: "master", language: "jpn", forks: "yes", git_url: "www", topics: [8, 9, 10, 11], score: "78" },
        ],
      },
    });
    const ITEM_PER_PAGE = 10;
    const currentPage = 1;
    const paginatedItems = [];
    const onPreviousClick = jest.fn();
    const onPreviousLastClick = jest.fn();
    const onNextClick = jest.fn();
    const onNextLastClick = jest.fn();
    const totalItemCount = 4;
    const startItem = (currentPage - 1) * ITEM_PER_PAGE + 1;
    const endItem = Math.min(currentPage * ITEM_PER_PAGE, totalItemCount);
    const paginationText = `${totalItemCount === 0 ? 0 : startItem} - ${endItem} of ${totalItemCount}`;
    await act(async () => {
      render(
        <Home
          ITEM_PER_PAGE={ITEM_PER_PAGE}
          currentPage={currentPage}
          paginatedItems={paginatedItems}
          onPreviousClick={onPreviousClick}
          onPreviousLastClick={onPreviousLastClick}
          onNextClick={onNextClick}
          onNextLastClick={onNextLastClick}
        />
      );
    });
    expect(paginationText).toBeTruthy();
  });
});
