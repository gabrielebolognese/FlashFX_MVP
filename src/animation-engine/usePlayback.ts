import { useRef, useCallback, useEffect } from 'react';
import { useAnimation } from './AnimationContext';

interface UsePlaybackReturn {
  play: () => void;
  pause: () => void;
  stop: () => void;
  togglePlay: () => void;
  seekTo: (time: number) => void;
  seekToFrame: (frame: number) => void;
  seekToStart: () => void;
  seekToEnd: () => void;
  stepForward: () => void;
  stepBackward: () => void;
  isPlaying: boolean;
  currentTime: number;
  currentFrame: number;
  totalFrames: number;
  duration: number;
  fps: number;
}

export function usePlayback(): UsePlaybackReturn {
  const { state, setCurrentTime, setCurrentFrame, setPlaying, stepFrame } = useAnimation();
  const { currentTime, currentFrame, duration, fps, isPlaying, loop } = state.timeline;
  const totalFrames = Math.ceil(duration * fps);

  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  const play = useCallback(() => {
    setPlaying(true);
  }, [setPlaying]);

  const pause = useCallback(() => {
    setPlaying(false);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, [setPlaying]);

  const stop = useCallback(() => {
    setPlaying(false);
    setCurrentTime(0);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, [setPlaying, setCurrentTime]);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      if (currentTime >= duration) {
        setCurrentTime(0);
      }
      play();
    }
  }, [isPlaying, currentTime, duration, play, pause, setCurrentTime]);

  const seekTo = useCallback((time: number) => {
    const clampedTime = Math.max(0, Math.min(time, duration));
    setCurrentTime(clampedTime);
  }, [duration, setCurrentTime]);

  const seekToStart = useCallback(() => {
    setCurrentTime(0);
  }, [setCurrentTime]);

  const seekToEnd = useCallback(() => {
    setCurrentTime(duration);
    if (isPlaying) {
      pause();
    }
  }, [duration, setCurrentTime, isPlaying, pause]);

  const seekToFrame = useCallback((frame: number) => {
    const clampedFrame = Math.max(0, Math.min(frame, totalFrames - 1));
    setCurrentFrame(clampedFrame);
  }, [totalFrames, setCurrentFrame]);

  const stepForward = useCallback(() => {
    stepFrame('forward');
  }, [stepFrame]);

  const stepBackward = useCallback(() => {
    stepFrame('backward');
  }, [stepFrame]);

  useEffect(() => {
    if (!isPlaying) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    lastTimeRef.current = performance.now();

    const animate = (timestamp: number) => {
      const deltaMs = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      const deltaSeconds = deltaMs / 1000;
      const newTime = currentTime + deltaSeconds;

      if (newTime >= duration) {
        if (loop) {
          setCurrentTime(0);
        } else {
          setCurrentTime(duration);
          setPlaying(false);
          return;
        }
      } else {
        setCurrentTime(newTime);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, currentTime, duration, loop, setCurrentTime, setPlaying]);

  return {
    play,
    pause,
    stop,
    togglePlay,
    seekTo,
    seekToFrame,
    seekToStart,
    seekToEnd,
    stepForward,
    stepBackward,
    isPlaying,
    currentTime,
    currentFrame,
    totalFrames,
    duration,
    fps,
  };
}
