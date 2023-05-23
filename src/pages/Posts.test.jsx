import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import Posts from "./Posts";

jest.mock("axios"); // Mocking axios

describe("Posts Component", () => {
  test("should show loading when fetching posts", async () => {
    axios.get.mockResolvedValue({ data: [] });

    render(<Posts />);

    const loadingDiv = screen.getByRole("presentation");
    expect(loadingDiv).toBeInTheDocument();

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
  });

  test("should show posts when fetched successfully", async () => {
    const mockPosts = [
      { id: 1, title: "Post 1" },
      { id: 2, title: "Post 2" },
    ];

    axios.get.mockResolvedValue({ data: mockPosts });

    render(<Posts />);

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    const postElements = screen.getAllByRole("link", { name: /Post/i });
    expect(postElements).toHaveLength(2);
  });

  test("should show ErrorAlert when error occurs while fetching", async () => {
    axios.get.mockRejectedValue(new Error("Network error"));

    render(<Posts />);

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    const errorAlert = screen.getByRole("alert");
    expect(errorAlert).toBeInTheDocument();
  });
});
