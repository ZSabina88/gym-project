import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import AdminPanelUsers from "./AdminUsers";
import { useAppDispatch, useAppSelector } from "../../hooks/DispatchHook";
import { fetchUsers, updateUserRole } from "../../features/Users/UserActions";

// Define a type for the mock function
type MockUpdateUserRole = jest.MockedFunction<typeof updateUserRole>;

// Mock the hooks and action creators
jest.mock("../../hooks/DispatchHook", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock("../../features/Users/UserActions", () => ({
  fetchUsers: jest.fn(),
  updateUserRole: jest.fn(() => Promise.resolve()) as MockUpdateUserRole, // Ensure it returns a promise
}));

describe("AdminPanelUsers Component", () => {
  const dispatch = jest.fn();
  const mockUpdateUserRole = updateUserRole as MockUpdateUserRole;

  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
    (useAppSelector as jest.Mock).mockReturnValue({
      users: [
        {
          id: "1",
          name: "John Doe",
          email: "john@example.com",
          role: "CLIENT",
          activity: "Active",
          target: "10%",
        },
      ],
      loading: false,
      error: null,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("handles role change and saving", async () => {
    render(<AdminPanelUsers />);

    // Find the select element
    const selectElement = screen.getByRole("combobox");

    // Check if the select has the expected option value
    expect(selectElement).toHaveValue("CLIENT");

    // Change the role
    fireEvent.change(selectElement, { target: { value: "COACH" } });

    // Find and click the save button
    const saveButton = screen.getByText(/Change Role/i);
    fireEvent.click(saveButton);

    // Wait for the dispatch to be called
    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith(
        updateUserRole({
          userId: "1",
          role: "COACH",
          email: "john@example.com",
        })
      );
      expect(screen.getByText(/Saving/i)).toBeInTheDocument();
    });

    // Mock updateUserRole to resolve and simulate the success state
    mockUpdateUserRole.mockResolvedValueOnce(void 0); // Use `void 0` for a void return type

    // Re-render to check for success state
    render(<AdminPanelUsers />);

    // Wait for the success state to be shown
    await waitFor(() => {
      expect(screen.getByText(/Saved!/i)).toBeInTheDocument();
    });
  });
});
