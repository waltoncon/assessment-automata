import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type LeaderboardState = {
  board: Record<string, number>;
  addScore: (username: string, score?: number) => void;
};

export const useLeaderboardStore = create<LeaderboardState>()(
  devtools(
    persist(
      (set) => ({
        board: {
          SuperCoolGuy: 10,
          anotherUser: 5,
          "ME!!": 2,
        },
        addScore: (username: string, score = 1) =>
          set((state) => ({
            ...state,
            board: {
              ...state.board,
              [username]: (state.board[username] || 0) + score,
            },
          })),
      }),
      {
        name: "leaderboard-store",
      },
    ),
  ),
);
