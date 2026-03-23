import { render, screen } from "@testing-library/react";
import Button from "./Button";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";

describe("Button component", () => {
  it("renders button with correct label", () => {
    render(<Button label="Click Me" />);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });
});
