import { useLeaderboardStore } from "@/utils/leaderboard-store";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export default function SettingsModal() {
  const clearLeaderboard = useLeaderboardStore((state) => state.clearBoard);

  return (
    <Dialog>
      <Button size="lg" variant="ghost" asChild>
        <DialogTrigger>SETTINGS</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <div className="flex flex-row items-center justify-between">
          <div> Clear leaderboard</div>
          <Button onClick={clearLeaderboard}>Clear</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
