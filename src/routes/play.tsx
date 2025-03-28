import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { computer, useGameStore } from "@/utils/game-store";
import { Hand, hands } from "@/utils/hand";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ComputerIcon } from "lucide-react";
import { useEffect } from "react";

export const Route = createFileRoute("/play")({
  component: RouteComponent,
});

function RouteComponent() {
  const getPlayerName = useGameStore((state) => state.getPlayerName);
  const againstComputed = useGameStore(
    (state) => state.player2?.name === computer,
  );

  const computersChoice = useGameStore((state) => {
    if (
      !state.player2 ||
      state.player2.name !== computer ||
      !state.player2.hand
    ) {
      return undefined;
    }
    return hands[state.player2.hand];
  });

  return (
    <main className="min-h-screen flex-col items-center justify-center">
      <div className="flex h-screen w-screen flex-row max-md:flex-col-reverse">
        <div className="flex flex-1 flex-col items-center justify-center bg-red-700/50 p-10 md:pr-20">
          <h1 className="mb-10 text-4xl">{getPlayerName("player1")}</h1>
          <div className="flex max-w-[calc(var(--spacing)*20*4)] grid-cols-3 flex-wrap justify-center gap-4">
            <HandButton player="player1" hand="rock" keyCode="q" />
            <HandButton player="player1" hand="paper" keyCode="w" />
            <HandButton player="player1" hand="scissors" keyCode="e" />
            <HandButton player="player1" hand="lizard" keyCode="a" />
            <HandButton player="player1" hand="spock" keyCode="s" />
          </div>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center bg-blue-700/50 p-10 md:pl-20">
          <h1 className="mb-10 text-4xl">{getPlayerName("player2")}</h1>
          {againstComputed ? (
            <div className="relative">
              <ComputerIcon className="animate-wobble size-40" />
              {computersChoice?.icon ? (
                <div className="bg-background absolute right-2 bottom-2 flex aspect-square items-center justify-center rounded-full border-2 border-white/50 text-5xl text-white">
                  {computersChoice.icon}
                </div>
              ) : null}
            </div>
          ) : (
            <div className="flex max-w-[calc(var(--spacing)*20*4)] grid-cols-3 flex-wrap justify-center gap-4">
              <HandButton player="player2" hand="rock" keyCode="i" />
              <HandButton player="player2" hand="paper" keyCode="o" />
              <HandButton player="player2" hand="scissors" keyCode="p" />
              <HandButton player="player2" hand="lizard" keyCode="k" />
              <HandButton player="player2" hand="spock" keyCode="l" />
            </div>
          )}
        </div>
      </div>
      <ResultModal />
    </main>
  );
}

function ResultModal() {
  const result = useGameStore((state) => state.result);
  const navigate = useNavigate({ from: "/play" });
  const isOpen = !!result;

  const winner = useGameStore((state) => {
    if (!state.result || state.result === "draw") {
      return undefined;
    }

    return state.getPlayerName(state.result);
  });

  const replay = useGameStore((state) => state.replay);
  const endGame = useGameStore((state) => state.endGame);
  const newPlayers = () => {
    endGame();
    navigate({ to: "/" });
  };

  const title = (() => {
    if (result === "draw") {
      return "It's a draw!";
    }

    if (result === "player1") {
      return `Player 1 wins!`;
    }

    if (result === "player2") {
      return `Player 2 wins!`;
    }

    return "Game Over";
  })();

  return (
    <Dialog open={isOpen}>
      <DialogContent
        onEscapeKeyDown={replay}
        aria-describedby={undefined}
        className="[&>button]:hidden"
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {result === "draw" ? <p>It's a draw!</p> : <p>{winner} wins!</p>}
        <DialogFooter className="justify-center">
          <Button onClick={replay}>Play again</Button>
          <Button variant="secondary" onClick={newPlayers}>
            Menu
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function HandButton({
  hand,
  player,
  keyCode,
}: {
  hand: Hand;
  player: "player1" | "player2";
  keyCode?: string;
}) {
  const playerChoose = useGameStore((state) => state.playerChoose);
  const disabled = useGameStore((state) => !!state[player]?.hand);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === keyCode) {
        event.preventDefault();
        playerChoose(player, hand);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [keyCode, player, hand, playerChoose]);

  return (
    <Tooltip disableHoverableContent>
      <Button
        disabled={disabled}
        onClick={() => playerChoose(player, hand)}
        asChild
        size="icon"
        className="relative size-20 text-3xl"
      >
        <TooltipTrigger>
          {hands[hand].icon}
          {keyCode ? (
            <div className="absolute right-2 bottom-1 text-2xl">
              {keyCode.toUpperCase()}
            </div>
          ) : null}
        </TooltipTrigger>
      </Button>
      <TooltipContent>
        <p>{hands[hand].name}</p>
      </TooltipContent>
    </Tooltip>
  );
}
