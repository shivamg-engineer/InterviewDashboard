import { describe, expect, it, beforeEach } from "@jest/globals";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserComponent from "./UserComponent";

// Mock the UserApi module
jest.mock("./UserApi", () => ({
  __esModule: true,
  default: {
    getUsers: jest.fn(),
  },
}));

import { default as UserApi } from "./UserApi";

describe("UserComponent", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("displays list of users after successful API call", async () => {
    const mockUsers = [
      { id: 1, name: "John Doe", email: "john@example.com" },
      { id: 2, name: "Jane Smith", email: "jane@example.com" },
    ];

    (UserApi.getUsers as jest.Mock).mockResolvedValue(mockUsers);

    render(<UserComponent />);

    await waitFor(() => {
      expect(screen.getByText("User: John Doe")).toBeInTheDocument();
      expect(screen.getByText("User: Jane Smith")).toBeInTheDocument();
    });
  });

  it("displays error message when API call fails", async () => {
    (UserApi.getUsers as jest.Mock).mockRejectedValue(new Error("Failed to fetch users"));

    render(<UserComponent />);

    await waitFor(() => {
      expect(screen.getByText("Error: Failed to fetch users")).toBeInTheDocument();
    });
  });

  it("displays empty list when API returns empty array", async () => {
    (UserApi.getUsers as jest.Mock).mockResolvedValue([]);

    render(<UserComponent />);

    await waitFor(() => {
      // When users array is empty, ul will be rendered but no li elements
      const ul = screen.getByRole("list");
      expect(ul).toBeInTheDocument();
      expect(ul.children).toHaveLength(0);
    });
  });
});

