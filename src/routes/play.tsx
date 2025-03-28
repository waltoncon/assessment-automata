import { Button } from "@/components/ui/button";
import winLogic, { Hand } from "@/utils/win-logic";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/play")({
  component: RouteComponent,
});

function RouteComponent() {
  const [player1, setPlayer1] = useState<Hand>();
  const [player2, setPlayer2] = useState<Hand>();
  const [gameResult, setGameResult] = useState<
    "player1" | "player2" | "draw"
  >();

  useEffect(() => {
    if (!player1 || !player2) return;
    const result = winLogic(player1, player2);
    setGameResult(result);
  }, [player1, player2]);

  return (
    <main>
      <div>
        <Button onClick={() => setPlayer1("rock")}>✊</Button>
        <Button onClick={() => setPlayer1("paper")}>✋</Button>
        <Button onClick={() => setPlayer1("scissors")}>✌️</Button>
        <Button onClick={() => setPlayer1("lizard")}>🤏</Button>
        <Button onClick={() => setPlayer1("spock")}>🖖</Button>
      </div>
      <div>
        <Button onClick={() => setPlayer2("rock")}>✊</Button>
        <Button onClick={() => setPlayer2("paper")}>✋</Button>
        <Button onClick={() => setPlayer2("scissors")}>✌️</Button>
        <Button onClick={() => setPlayer2("lizard")}>🤏</Button>
        <Button onClick={() => setPlayer2("spock")}>🖖</Button>
      </div>
      <h1>{gameResult}</h1>
    </main>
  );
}
