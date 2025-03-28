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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "./ui/button";
import { gameStore, useGameStore } from "@/utils/game-store";
import { useNavigate, UseNavigateResult } from "@tanstack/react-router";

const formSchema = z.object({
  player1: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export function PlayerSelectOneModal({
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
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    setPlayers(values.player1);
    navigate({ to: "/play" });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled} size="lg">
          1 PLAYER
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>1 Player</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="player1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Player 1 Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Play</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
