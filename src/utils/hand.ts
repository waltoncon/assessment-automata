export type Hand = "rock" | "paper" | "scissors" | "lizard" | "spock";

type Hands = {
  [key in Hand]: { key: key; icon: string; name: string };
};

export const hands: Hands = {
  rock: { key: "rock", icon: "✊", name: "Rock" },
  paper: { key: "paper", icon: "✋", name: "Paper" },
  scissors: { key: "scissors", icon: "✌️", name: "Scissors" },
  lizard: { key: "lizard", icon: "🤏", name: "Lizard" },
  spock: { key: "spock", icon: "🖖", name: "Spock" },
};

export function getRandomHand() {
  const keys = Object.keys(hands);
  const randomIndex = Math.floor(Math.random() * keys.length);
  const hand = keys[randomIndex];
  return hands[hand as Hand];
}
