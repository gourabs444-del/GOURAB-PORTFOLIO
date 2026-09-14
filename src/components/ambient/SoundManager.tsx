"use client";

import React from "react";
import { useAudioFeedback } from "@/hooks/useAudioFeedback";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

export function SoundManager({ className }: { className?: string }) {
  const { muted, toggleMute } = useAudioFeedback();

  return (
    <button
      onClick={toggleMute}
      data-cursor="pointer"
      data-cursor-text={muted ? "SOUND ON" : "MUTE"}
      className={cn(
        "group flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md transition-all duration-300 hover:border-accent/40 hover:bg-white/[0.07]",
        className
      )}
      aria-label={muted ? "Unmute sound effects" : "Mute sound effects"}
    >
      <div className="flex items-center gap-[3px] h-3 w-3.5">
        <span
          className={cn(
            "w-[2px] bg-accent rounded-full transition-all duration-300",
            muted ? "h-1 opacity-30" : "h-3 animate-[pulse_0.8s_ease-in-out_infinite]"
          )}
        />
        <span
          className={cn(
            "w-[2px] bg-accent rounded-full transition-all duration-300",
            muted ? "h-1 opacity-30" : "h-2 animate-[pulse_1.1s_ease-in-out_infinite_0.2s]"
          )}
        />
        <span
          className={cn(
            "w-[2px] bg-accent rounded-full transition-all duration-300",
            muted ? "h-1 opacity-30" : "h-3.5 animate-[pulse_0.9s_ease-in-out_infinite_0.4s]"
          )}
        />
      </div>
      <span className="font-mono text-[10px] uppercase tracking-widest text-mist group-hover:text-foreground transition-colors">
        {muted ? "AUDIO OFF" : "AUDIO FX"}
      </span>
      {muted ? (
        <VolumeX className="w-3 h-3 text-mist/60 group-hover:text-mist" />
      ) : (
        <Volume2 className="w-3 h-3 text-accent" />
      )}
    </button>
  );
}
