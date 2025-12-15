"use client";

import { useState, useRef } from "react";
import { BiMicrophone } from "react-icons/bi";

interface VoiceInputProps {
  onTranscribe: (text: string) => void;
  disabled?: boolean;
}

export default function VoiceInput({ onTranscribe, disabled }: VoiceInputProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        setIsProcessing(true);
        const audioBlob = new Blob(chunksRef.current, { type: "audio/wav" });
        
        const formData = new FormData();
        formData.append("file", audioBlob, "voice_note.wav");

        try {
          const response = await fetch("/api/audio/transcribe", {
            method: "POST",
            body: formData,
          });

          if (response.ok) {
            const data = await response.json();
            if (data.success && data.text) {
              onTranscribe(data.text);
            } else {
              console.error("Transcription failed:", data.message);
              alert("Transcription failed. Please try again.");
            }
          } else {
            console.error("Transcription request failed");
            alert("Could not transcribe audio. Please try again.");
          }
        } catch (err) {
          console.error("Error uploading audio:", err);
          alert("Error processing audio. Please try again.");
        } finally {
          setIsProcessing(false);
          stream.getTracks().forEach((track) => track.stop());
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Microphone error:", err);
      alert("Microphone access denied or not available. Please check your browser settings.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <button
      type="button"
      onClick={isRecording ? stopRecording : startRecording}
      disabled={isProcessing || disabled}
      className={`transition-colors ${
        isRecording
          ? "text-red-500 animate-pulse"
          : isProcessing
          ? "text-gray-400"
          : "text-gray-400 hover:text-gray-600"
      }`}
      title={isRecording ? "Click to stop recording" : "Click to record voice"}
      aria-label="Voice input"
    >
      {isProcessing ? (
        <span className="text-xs">...</span>
      ) : (
        <BiMicrophone className={`size-4 2xl:size-5 ${isRecording ? 'scale-125' : ''}`} />
      )}
    </button>
  );
}
