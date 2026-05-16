"use client";

import { useEffect, useState } from "react";

export type PlayerClock = {
  white: number;
  black: number;
};

const initialClock: PlayerClock = {
  white: 5 * 60,
  black: 5 * 60,
};

export function useGameClock(activeSide: keyof PlayerClock, paused: boolean) {
  const [clock, setClock] = useState<PlayerClock>(initialClock);

  useEffect(() => {
    if (paused) {
      return;
    }

    const timer = window.setInterval(() => {
      setClock((current) => ({
        ...current,
        [activeSide]: Math.max(0, current[activeSide] - 1),
      }));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [activeSide, paused]);

  function resetClock() {
    setClock(initialClock);
  }

  const timedOutSide: keyof PlayerClock | null =
    clock.white === 0 ? "white" : clock.black === 0 ? "black" : null;

  return { clock, resetClock, timedOutSide };
}

export function formatClock(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;

  return `${minutes}:${rest.toString().padStart(2, "0")}`;
}
