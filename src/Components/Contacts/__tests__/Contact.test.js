import React from "react";

import { render, screen, fireEvent, waitForElement, cleanup, renderHook, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { act } from "react-dom/test-utils";

import useFetch from "../../../Hooks/UseFetch";
import Contact from "../Contact";
import "@testing-library/jest-dom/extend-expect";

jest.mock("axios");

function mockFetch(data) {
  return jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => data,
    })
  );
}

describe("Testing Contact Page", () => {
  let containers = null;

  beforeEach(() => {
    containers = document.createElement("div");
    document.body.appendChild(containers);
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
    cleanup();
    containers.remove();
    containers = null;
  });

  test("Test Contact Page Should Be In The Document", () => {
    const container = render(<Contact />);
    expect(container).toBeDefined();
  }, 1000);

  test("Test Input Field Should Be In The Document and Check Its Events", async () => {
    await act(async () => {
      render(<Contact />);
    });

    const inputField = document.querySelector("[data-testid=input-field]");
    expect(inputField).toBeInTheDocument();

    inputField.focus();

    fireEvent.change(inputField, {
      target: { value: "my testing filed", name: "usage" },
    });

    userEvent.tab();

    expect(inputField).toHaveValue("my testing filed");
  });

  test("Testing Custom UseFetch Hook", async () => {
    const headers = [
      { Name: "Name", value: "name" },
      { Name: "Phone Number", value: "phone" },
      { Name: "Email", value: "email" },
      { Name: "website", value: "website" },
    ];
    window.fetch = mockFetch(headers);

    const data = renderHook(() => useFetch());
    await waitFor(() => expect(data).toBeDefined());

    await act(async () => {
      render(<Contact />);
    });
  },1000);
});
