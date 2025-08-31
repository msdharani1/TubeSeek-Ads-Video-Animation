"use client";

import { useState, useEffect, useRef } from "react";
import {
  generateAmbientSoundscape,
  type GenerateAmbientSoundscapeInput,
} from "@/ai/flows/generate-ambient-soundscape";
import { Button } from "@/components/ui/button";
import { Loader2, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AmbientSound({
  timeOfDay,
}: {
  timeOfDay: "day" | "night";
}) {
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    let isCancelled = false;
    const generateSound = async () => {
      setIsLoading(true);
      setAudioSrc(null);
      if (audioRef.current) {
        audioRef.current.pause();
      }

      try {
        const input: GenerateAmbientSoundscapeInput = { timeOfDay };
        const result = await generateAmbientSoundscape(input);
        if (!isCancelled) {
          setAudioSrc(result.media);
        }
      } catch (error) {
        if (!isCancelled) {
          console.error("Failed to generate ambient soundscape:", error);
          toast({
            variant: "destructive",
            title: "Sound Generation Failed",
            description:
              "Could not create the ambient soundscape. Please try again later.",
          });
          setIsLoading(false);
        }
      }
    };
    generateSound();
    return () => {
      isCancelled = true;
    };
  }, [timeOfDay, toast]);

  useEffect(() => {
    if (audioRef.current && audioSrc) {
      audioRef.current.src = audioSrc;
      audioRef.current.load();
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsLoading(false);
        })
        .catch(() => {
          // Autoplay was blocked, user needs to interact first.
          setIsPlaying(false);
          setIsLoading(false);
        });
    }
  }, [audioSrc]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
           toast({
            variant: "destructive",
            title: "Playback Error",
            description: "Could not play audio.",
          });
        });
      }
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="flex items-center space-x-2 rounded-full border bg-card/50 p-2 backdrop-blur-sm">
      <audio
        ref={audioRef}
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <Button
        variant="ghost"
        size="icon"
        onClick={togglePlayPause}
        disabled={isLoading || !audioSrc}
        aria-label={isPlaying ? "Pause sound" : "Play sound"}
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : isPlaying ? (
          <Pause className="h-5 w-5" />
        ) : (
          <Play className="h-5 w-5" />
        )}
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMute}
        disabled={isLoading || !audioSrc}
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? (
          <VolumeX className="h-5 w-5" />
        ) : (
          <Volume2 className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
}
