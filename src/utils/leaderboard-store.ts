import { createStore } from "@xstate/store";

export const leaderboardStore = createStore({
  context: {
    SuperCoolGuy: 10,
    anotherUser: 5,
    "ME!!": 2,
  } as Record<string, number>,
  on: {
    inc: (context, event: { username: string }) => ({
      ...context,
      [event.username]: context[event.username]
        ? context[event.username] + 1
        : 0,
    }),
  },
});
