import { Button } from "@/components/ui/button";
import { useGameStore } from "@/utils/game-store";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/play")({
  component: RouteComponent,
});

function RouteComponent() {
  const playerChoose = useGameStore((state) => state.playerChoose);
  const result = useGameStore((state) => state.result);

  const state = useGameStore((state) =>
    JSON.stringify({
      player1: state.player1,
      player2: state.player2,
    }),
  );

  return (
    <main>
      <div>
        <Button onClick={() => playerChoose("player1", "rock")}>✊</Button>
        <Button onClick={() => playerChoose("player1", "paper")}>✋</Button>
        <Button onClick={() => playerChoose("player1", "scissors")}>✌️</Button>
        <Button onClick={() => playerChoose("player1", "lizard")}>🤏</Button>
        <Button onClick={() => playerChoose("player1", "spock")}>🖖</Button>
      </div>
      <div>
        <Button onClick={() => playerChoose("player2", "rock")}>✊</Button>
        <Button onClick={() => playerChoose("player2", "paper")}>✋</Button>
        <Button onClick={() => playerChoose("player2", "scissors")}>✌️</Button>
        <Button onClick={() => playerChoose("player2", "lizard")}>🤏</Button>
        <Button onClick={() => playerChoose("player2", "spock")}>🖖</Button>
      </div>
      <h1>{result}</h1>
      <pre>{state}</pre>
    </main>
  );
}
