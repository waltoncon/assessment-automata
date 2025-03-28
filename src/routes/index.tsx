import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import automataLogo from "../assets/automata.png";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <div>
        <a href="https://automata.tech/" target="_blank">
          <img
            src={String(automataLogo)}
            className="logo automata"
            alt="Automata logo"
          />
        </a>
      </div>
      <h1>Frontend Exercise</h1>
      <h2>Rock, Paper, Scissors, Lizard, Spock</h2>
      <Button>Click me</Button>
    </>
  );
}
