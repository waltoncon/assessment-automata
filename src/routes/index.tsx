import { PlayerSelectOneModal } from "@/components/player-select-one-modal";
import { Button } from "@/components/ui/button";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion, useIsPresent } from "motion/react";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

type Menu = "play" | undefined;

function RouteComponent() {
  const [menu, setMenu] = useState<Menu>();

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-10">
      <div className="p-10">
        <motion.h1
          className="text-center text-6xl font-bold"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.2,
            ease: "easeInOut",
          }}
        >
          ROCK PAPER SCISSORS LIZARD SPOCK
        </motion.h1>
      </div>
      <div className="flex flex-col items-center justify-center gap-5">
        <AnimatePresence mode="wait">
          {menu === undefined ? (
            <MainMenu key="main-menu" setMenu={setMenu} />
          ) : null}
          {menu === "play" ? (
            <PlayMenu key="play-menu" setMenu={setMenu} />
          ) : null}
        </AnimatePresence>
      </div>
    </main>
  );
}

interface MenuProps {
  setMenu: (menu: Menu) => void;
}

function MainMenu(props: MenuProps) {
  const isPresent = useIsPresent();
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.1 }}
      className="flex flex-col gap-5"
    >
      <Button
        disabled={!isPresent}
        onClick={() => {
          props.setMenu("play");
          console.log("Click");
        }}
        size="lg"
      >
        PLAY
      </Button>
      <Button disabled={!isPresent} asChild size="lg" variant="secondary">
        <Link to="/leaderboard">LEADERBOARD</Link>
      </Button>
      <Button disabled={!isPresent} asChild size="lg" variant="secondary">
        <Link to="/settings">SETTINGS</Link>
      </Button>
    </motion.div>
  );
}

function PlayMenu(props: MenuProps) {
  const isPresent = useIsPresent();
  const navigate = useNavigate({ from: "/" });
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.1 }}
      className="flex flex-col gap-5"
    >
      <PlayerSelectOneModal disabled={!isPresent} navigate={navigate} />
      <Button disabled={!isPresent} size="lg">
        2 PLAYER
      </Button>
      <Button
        disabled={!isPresent}
        size="lg"
        variant="secondary"
        onClick={() => props.setMenu(undefined)}
      >
        BACK
      </Button>
    </motion.div>
  );
}
