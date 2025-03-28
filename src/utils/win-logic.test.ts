import { expect, test, describe } from "vitest";
import winLogic from "./win-logic";

test("Players can draw", () => {
  expect(winLogic("scissors", "scissors")).toBe("draw");
  expect(winLogic("paper", "paper")).toBe("draw");
  expect(winLogic("rock", "rock")).toBe("draw");
  expect(winLogic("lizard", "lizard")).toBe("draw");
  expect(winLogic("spock", "spock")).toBe("draw");
});

describe("Player 1 wins", () => {
  test("Player 1 plays scissors", () => {
    expect(winLogic("scissors", "paper")).toBe("player1");
    expect(winLogic("scissors", "lizard")).toBe("player1");
  });

  test("Player 1 plays paper", () => {
    expect(winLogic("paper", "rock")).toBe("player1");
    expect(winLogic("paper", "spock")).toBe("player1");
  });

  test("Player 1 plays rock", () => {
    expect(winLogic("rock", "scissors")).toBe("player1");
    expect(winLogic("rock", "lizard")).toBe("player1");
  });

  test("Player 1 plays lizard", () => {
    expect(winLogic("lizard", "paper")).toBe("player1");
    expect(winLogic("lizard", "spock")).toBe("player1");
  });

  test("Player 1 plays spock", () => {
    expect(winLogic("spock", "scissors")).toBe("player1");
    expect(winLogic("spock", "rock")).toBe("player1");
  });
});

describe("Player 2 can win", () => {
  test("Player 2 plays scissors", () => {
    expect(winLogic("paper", "scissors")).toBe("player2");
    expect(winLogic("lizard", "scissors")).toBe("player2");
  });

  test("Player 2 plays paper", () => {
    expect(winLogic("rock", "paper")).toBe("player2");
    expect(winLogic("spock", "paper")).toBe("player2");
  });

  test("Player 2 plays rock", () => {
    expect(winLogic("scissors", "rock")).toBe("player2");
    expect(winLogic("lizard", "rock")).toBe("player2");
  });

  test("Player 2 plays lizard", () => {
    expect(winLogic("paper", "lizard")).toBe("player2");
    expect(winLogic("spock", "lizard")).toBe("player2");
  });

  test("Player 2 plays spock", () => {
    expect(winLogic("scissors", "spock")).toBe("player2");
    expect(winLogic("rock", "spock")).toBe("player2");
  });
});
