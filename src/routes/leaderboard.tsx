import { leaderboardStore } from "@/utils/game-store";
import { createFileRoute } from "@tanstack/react-router";
import { useSelector } from "@xstate/store/react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/leaderboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-10">
      <div className="p-10">
        <h1>Leaderboard</h1>
        <LeaderBoard />
      </div>
    </main>
  );
}

function LeaderBoard() {
  const leaderboard = useSelector(leaderboardStore, (state) => state.context);
  const sortedLeaderboard = Object.entries(leaderboard).sort(
    ([, scoreA], [, scoreB]) => scoreB - scoreA,
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Player</TableHead>
          <TableHead>Score</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedLeaderboard.map(([username, score]) => (
          <TableRow key={username}>
            <TableCell className="font-medium">{username}</TableCell>
            <TableCell>{score}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
