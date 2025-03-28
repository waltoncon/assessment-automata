import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useGameStore } from "@/utils/game-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseNavigateResult } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "./ui/button";

const formSchema = z.object({
  player1: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  player2: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export function PlayerSelectTwoModal({
  disabled,
  navigate,
}: {
  disabled: boolean;
  navigate: UseNavigateResult<string>;
}) {
  const setPlayers = useGameStore((state) => state.setPlayers);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      player1: "",
      player2: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    setPlayers(values.player1, values.player2);
    navigate({ to: "/play" });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled} size="lg">
          2 PLAYER
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>2 Players</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-row items-start justify-between gap-3 max-md:flex-col max-md:items-center">
              <FormField
                control={form.control}
                name="player1"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input {...field} placeholder="Player 1's Name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="py-1.5">VS</div>
              <FormField
                control={form.control}
                name="player2"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input {...field} placeholder="Player 2's Name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Play</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
