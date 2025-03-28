import { create } from "zustand";
import winLogic, { Hand } from "./win-logic";
import { devtools } from "zustand/middleware";

export const computer = Symbol("computer-player");

interface GameState {
  player1?: { name: string; hand?: Hand };
  player2?: { name: string | symbol; hand?: Hand };
  result: string | undefined;
  playerChoose: (player: "player1" | "player2", hand: string) => void;
  setPlayers: (player1: string, player2?: string) => void;
}

export const useGameStore = create<GameState>()(
  devtools((set, get) => ({
    player1: { name: "Someone" },
    player2: { name: "Other" },
    result: undefined,
    playerChoose(player, hand) {
      console.log("playerChoose", player, hand);

      set((state) => ({
        ...state,
        [player]: {
          ...state[player],
          hand: hand as Hand,
        },
      }));

      const { player1, player2 } = get();

      if (player1?.hand && player2?.hand) {
        const result = winLogic(player1.hand, player2.hand);
        set((state) => ({
          ...state,
          result: result,
        }));
      }
    },
    setPlayers(player1, player2) {
      return set((state) => ({
        ...state,
        player1: { name: player1 },
        player2: { name: player2 || computer },
      }));
    },
  })),
);
