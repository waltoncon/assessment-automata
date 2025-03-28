export type Hand = "rock" | "paper" | "scissors" | "lizard" | "spock";

const winConditions: Record<Hand, Hand[]> = {
  rock: ["scissors", "lizard"],
  paper: ["rock", "spock"],
  scissors: ["paper", "lizard"],
  lizard: ["paper", "spock"],
  spock: ["rock", "scissors"],
};

export default function winLogic(player1Choice: Hand, player2Choice: Hand) {
  if (player1Choice === player2Choice) {
    return "draw";
  }

  if (winConditions[player1Choice].includes(player2Choice)) {
    return "player1";
  }

  return "player2";
}
