"use client";

import { useEffect, useState, useCallback, useRef } from "react";

class SoundEngine {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = false;

  private init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public playHover() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch {
      // AudioContext could be blocked by browser policy until gesture
    }
  }

  public playClick() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(220, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(110, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {
      // Ignore audio policy errors
    }
  }

  public playShutter() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(160, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(60, this.ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);
    } catch {}
  }
}

export const globalSoundEngine = typeof window !== "undefined" ? new SoundEngine() : null;

export function useAudioFeedback() {
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (globalSoundEngine) {
      setMuted(globalSoundEngine.isMuted);
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (globalSoundEngine) {
      globalSoundEngine.isMuted = !globalSoundEngine.isMuted;
      setMuted(globalSoundEngine.isMuted);
      if (!globalSoundEngine.isMuted) {
        globalSoundEngine.playClick();
      }
    }
  }, []);

  const playHover = useCallback(() => {
    globalSoundEngine?.playHover();
  }, []);

  const playClick = useCallback(() => {
    globalSoundEngine?.playClick();
  }, []);

  const playShutter = useCallback(() => {
    globalSoundEngine?.playShutter();
  }, []);

  return { muted, toggleMute, playHover, playClick, playShutter };
}
