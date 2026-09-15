"use client";

import { useCallback } from "react";

// Completely silenced & cleaned no-op audio feedback
export function useAudioFeedback() {
  const muted = true;
  const toggleMute = useCallback(() => {}, []);
  const playHover = useCallback(() => {}, []);
  const playClick = useCallback(() => {}, []);
  const playShutter = useCallback(() => {}, []);

  return { muted, toggleMute, playHover, playClick, playShutter };
}

