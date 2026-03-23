/// <reference types="jest" />
import { createElement } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/jest-globals";
import Counter from "./Counter";
import { describe, expect, test } from "@jest/globals";

describe("Counter", () => {
  test("renders initial count", () => {
    render(createElement(Counter));
    expect(screen.getByText(/count:\s*0/i)).toBeInTheDocument();
  });

  test("increments count when button is clicked", () => {
    render(createElement(Counter));
    const button = screen.getByRole("button", { name: /increment/i });

    fireEvent.click(button);
    expect(screen.getByText(/count:\s*1/i)).toBeInTheDocument();
  });
});
