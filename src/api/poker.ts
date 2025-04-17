import { serve } from "bun";

let gameState = {
  players: [],
  communityCards: [],
  playerHands: {},
  pot: 0,
  currentBet: 0,
};

serve({
  fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === "/api/poker/state") {
      return new Response(JSON.stringify(gameState), {
        headers: { "Content-Type": "application/json" },
      });
    }

    if (url.pathname === "/api/poker/action" && req.method === "POST") {
      const { action, amount, name } = JSON.parse(req.body || "{}");

      if (action === "join") {
        const playerId = gameState.players.length + 1;
        gameState.players.push({ id: playerId, name, chips: 100 });
        gameState.playerHands[playerId] = [];
        return new Response(
          JSON.stringify({ message: `${name} joined the game.` }),
          { headers: { "Content-Type": "application/json" } }
        );
      }

      // Handle other actions like fold, call, raise
      // Update gameState accordingly

      return new Response(
        JSON.stringify({ message: `Action ${action} performed.` }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response("Not Found", { status: 404 });
  },
});
