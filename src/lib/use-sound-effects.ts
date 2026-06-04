import { useCallback, useEffect, useRef } from "react";

const soundSources = {
  boardgameTap: "/assets/sounds/boardgame_tap.mp3",
  boardgameWin: "/assets/sounds/boardgame_win.mp3",
  click: "/assets/sounds/click.mp3",
  error: "/assets/sounds/error.mp3",
  fail: "/assets/sounds/fail.mp3",
  hover: "/assets/sounds/hover.mp3",
  rpsCountOne: "/assets/sounds/rps_count_1.mp3",
  rpsCountTwo: "/assets/sounds/rps_count_2.mp3",
  ticTacToeTap: "/assets/sounds/tictactoe_tap.mp3",
  win: "/assets/sounds/win.mp3",
} as const;

type SoundName = keyof typeof soundSources;

export function useSoundEffects() {
  const audioRefs = useRef<Partial<Record<SoundName, HTMLAudioElement>>>({});

  useEffect(() => {
    audioRefs.current = Object.fromEntries(
      Object.entries(soundSources).map(([name, src]) => {
        const audio = new Audio(src);
        audio.preload = "auto";
        return [name, audio];
      }),
    ) as Partial<Record<SoundName, HTMLAudioElement>>;

    return () => {
      Object.values(audioRefs.current).forEach((audio) => {
        audio.pause();
        audio.src = "";
      });
      audioRefs.current = {};
    };
  }, []);

  return useCallback((name: SoundName) => {
    const audio = audioRefs.current[name];
    if (!audio) {
      return;
    }

    audio.currentTime = 0;
    void audio.play().catch(() => {
      // Browsers can block audio until the first user gesture; ignore failed play attempts.
    });
  }, []);
}
