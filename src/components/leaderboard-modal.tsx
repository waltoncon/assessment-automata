import { useLeaderboardStore } from "@/utils/leaderboard-store";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "./ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";

export default function LeaderboardModal() {
  const leaderboard = useLeaderboardStore((state) => state.board);
  const sortedLeaderboard = Object.entries(leaderboard).sort(
    ([, scoreA], [, scoreB]) => scoreB - scoreA,
  );

  return (
    <Dialog>
      <Button size="lg" variant="ghost" asChild>
        <DialogTrigger>LEADERBOARD</DialogTrigger>
      </Button>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Leaderboard</DialogTitle>
        </DialogHeader>
        {sortedLeaderboard.length === 0 ? (
          <p className="text-muted-foreground text-center text-sm">
            No scores yet. Be the first to play!
          </p>
        ) : (
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
        )}
      </DialogContent>
    </Dialog>
  );
}
