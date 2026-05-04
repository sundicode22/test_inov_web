"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useVoiceRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [durationMs, setDurationMs] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startAtRef = useRef(0);

  const clearTick = () => {
    if (tickRef.current) {
      clearInterval(tickRef.current);
      tickRef.current = null;
    }
  };

  const stopStream = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  };

  const stop = useCallback((): Promise<{ blob: Blob; durationMs: number } | null> => {
    return new Promise((resolve) => {
      clearTick();
      const mr = mediaRecorderRef.current;
      if (!mr || mr.state === "inactive") {
        setIsRecording(false);
        stopStream();
        resolve(null);
        return;
      }

      mr.onstop = () => {
        const elapsed = Date.now() - startAtRef.current;
        const blob = new Blob(chunksRef.current, { type: mr.mimeType || "audio/webm" });
        chunksRef.current = [];
        mediaRecorderRef.current = null;
        stopStream();
        setIsRecording(false);
        setDurationMs(0);
        resolve({ blob, durationMs: elapsed });
      };

      mr.stop();
    });
  }, []);

  const start = useCallback(async () => {
    setError(null);
    if (isRecording) return;

    if (!navigator.mediaDevices?.getUserMedia) {
      setError("Microphone non disponible dans ce navigateur.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      chunksRef.current = [];

      const mime = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : MediaRecorder.isTypeSupported("audio/webm")
          ? "audio/webm"
          : "";

      const mr = mime
        ? new MediaRecorder(stream, { mimeType: mime })
        : new MediaRecorder(stream);
      mr.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mr.start(200);
      mediaRecorderRef.current = mr;
      startAtRef.current = Date.now();
      setDurationMs(0);

      tickRef.current = setInterval(() => {
        setDurationMs(Date.now() - startAtRef.current);
      }, 200);

      setIsRecording(true);
    } catch {
      setError("Impossible d'accéder au microphone.");
      stopStream();
    }
  }, [isRecording]);

  useEffect(() => {
    return () => {
      clearTick();
      const mr = mediaRecorderRef.current;
      if (mr && mr.state !== "inactive") {
        mr.stop();
      }
      stopStream();
    };
  }, []);

  return { isRecording, durationMs, error, start, stop };
}
