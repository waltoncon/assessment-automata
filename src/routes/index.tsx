import LeaderboardModal from "@/components/leaderboard-modal";
import { PlayerSelectOneModal } from "@/components/player-select-one-modal";
import { PlayerSelectTwoModal } from "@/components/player-select-two-modal";
import SettingsModal from "@/components/settings-modal";
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
    <main
      className="flex h-screen flex-col items-center justify-center gap-10"
      style={{
        background: `linear-gradient(
          to right,
          color-mix(in oklab, var(--color-red-700) 50%, transparent) 0%,
          color-mix(in oklab, var(--color-red-700) 50%, transparent) 50%,
          color-mix(in oklab, var(--color-blue-700) 50%, transparent) 50%,
          color-mix(in oklab, var(--color-blue-700) 50%, transparent) 100%
        )`,
      }}
    >
      <div className="p-10">
        <motion.h1
          className="text-center text-6xl font-bold"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.2,
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
      className="flex w-40 flex-col gap-5"
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
      <LeaderboardModal />
      <SettingsModal />
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
      className="flex w-40 flex-col gap-5"
    >
      <PlayerSelectOneModal disabled={!isPresent} navigate={navigate} />
      <PlayerSelectTwoModal disabled={!isPresent} navigate={navigate} />
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
