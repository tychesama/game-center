import { formatClock, type PlayerClock } from "@/lib/use-game-clock";

export function ClockPanel({
  clock,
  activeSide,
  labels = { white: "white", black: "black" },
}: {
  clock: PlayerClock;
  activeSide: keyof PlayerClock;
  labels?: Record<keyof PlayerClock, string>;
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {(["white", "black"] as const).map((side) => (
        <div
          key={side}
          className={[
            "rounded-2xl border-2 border-[var(--gc-ink)] bg-[var(--gc-surface)] p-4",
            activeSide === side ? "shadow-[4px_4px_0_var(--gc-accent)]" : "",
          ].join(" ")}
        >
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--gc-muted)]">
            {labels[side]}
          </p>
          <p className="mt-1 text-3xl font-black tabular-nums tracking-[-0.05em]">
            {formatClock(clock[side])}
          </p>
        </div>
      ))}
    </div>
  );
}
