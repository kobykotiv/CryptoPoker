import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { App } from "./App";

describe("PokerGame Component", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renders PokerGame component", () => {
    render(<App />);
    expect(screen.getByText("LAN Poker Game")).toBeInTheDocument();
  });

  test("allows player to enter name and join the game", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ message: "Player joined the game." }),
    });

    render(<App />);
    const input = screen.getByPlaceholderText("Enter your name");
    const joinButton = screen.getByText("Join Game");

    fireEvent.change(input, { target: { value: "Alice" } });
    fireEvent.click(joinButton);

    await waitFor(() =>
      expect(screen.getByText("Player joined the game.")).toBeInTheDocument()
    );
  });

  test("displays game state fetched from the server", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        players: [{ id: 1, name: "Alice", chips: 100 }],
        communityCards: ["2H", "3D", "5S"],
        playerHand: ["KH", "QC"],
        pot: 50,
        currentBet: 10,
      }),
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Pot: 50 BTC")).toBeInTheDocument();
      expect(screen.getByText("Current Bet: 10 BTC")).toBeInTheDocument();
      expect(screen.getByText("Community Cards: 2H, 3D, 5S")).toBeInTheDocument();
      expect(screen.getByText("Your Hand: KH, QC")).toBeInTheDocument();
      expect(screen.getByText("Alice - 100 BTC")).toBeInTheDocument();
    });
  });

  test("handles player actions (fold, call, raise)", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ message: "Action performed." }),
    });

    render(<App />);
    const foldButton = screen.getByText("Fold");
    const callButton = screen.getByText("Call");
    const raiseButton = screen.getByText("Raise 10 BTC");

    fireEvent.click(foldButton);
    await waitFor(() =>
      expect(screen.getByText("Action performed.")).toBeInTheDocument()
    );

    fireEvent.click(callButton);
    await waitFor(() =>
      expect(screen.getByText("Action performed.")).toBeInTheDocument()
    );

    fireEvent.click(raiseButton);
    await waitFor(() =>
      expect(screen.getByText("Action performed.")).toBeInTheDocument()
    );
  });

  test("displays error message if fetch fails", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    render(<App />);
    await waitFor(() =>
      expect(screen.getByText("Failed to fetch game state.")).toBeInTheDocument()
    );
  });
});
