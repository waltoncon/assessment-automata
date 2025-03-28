import { toast } from "sonner";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type LeaderboardState = {
  board: Record<string, number>;
  addScore: (username: string, score?: number) => void;
  clearBoard: () => void;
};

export const useLeaderboardStore = create<LeaderboardState>()(
  devtools(
    persist(
      (set) => ({
        board: {},
        addScore: (username: string, score = 1) =>
          set((state) => ({
            ...state,
            board: {
              ...state.board,
              [username]: (state.board[username] || 0) + score,
            },
          })),
        clearBoard() {
          set(() => ({
            board: {},
          }));
          toast("Leaderboard cleared");
        },
      }),
      {
        name: "leaderboard-store",
      },
    ),
  ),
);
