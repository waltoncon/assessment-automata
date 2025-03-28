import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { getRandomHand, Hand, hands } from "./hand";
import winLogic from "./win-logic";
import { useLeaderboardStore } from "./leaderboard-store";

export const computer = Symbol("computer-player");

export type Player = "player1" | "player2";
export type Result = Player | "draw";

interface GameState {
  player1?: { name: string; hand?: Hand };
  player2?: { name: string | symbol; hand?: Hand };
  result?: Result;
  playerChoose: (player: Player, hand: string) => void;
  setPlayers: (player1: string, player2?: string) => void;

  getPlayerName: (player: Player) => string;
  replay(): void;
  endGame(): void;
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

      if (get().player2?.name === computer) {
        const randomHand = getRandomHand().key;
        set((state) => ({
          ...state,
          player2: { ...state.player2!, hand: randomHand },
        }));
      }

      const { player1, player2 } = get();

      if (player1?.hand && player2?.hand) {
        const result = winLogic(player1.hand, player2.hand);

        set((state) => ({
          ...state,
          result: result,
        }));

        if (result === "draw") return;

        const name = get().getPlayerName(result);
        console.log("result", result, name);

        useLeaderboardStore.getState().addScore(name, 1);
      }
    },
    setPlayers(player1, player2) {
      return set((state) => ({
        ...state,
        player1: { name: player1 },
        player2: { name: player2 || computer },
      }));
    },
    getPlayerName(player: Player) {
      const name = get()[player]?.name;

      if (name === computer) {
        return "The Computer";
      }

      return name;
    },
    replay() {
      set((state) => ({
        player1: { ...state.player1!, hand: undefined },
        player2: { ...state.player2!, hand: undefined },
        result: undefined,
      }));
    },
    endGame() {
      set(() => ({
        player1: undefined,
        player2: undefined,
        result: undefined,
      }));
    },
  })),
);
