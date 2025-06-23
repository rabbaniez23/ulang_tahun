import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      // Auto-play when component mounts
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Auto-play blocked by browser, user needs to interact first
        setIsPlaying(false);
      });
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-full p-3 shadow-lg flex items-center space-x-2">
        <button
          onClick={togglePlay}
          className="p-2 rounded-full bg-pink-500 text-white hover:bg-pink-600 transition-colors duration-200"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <button
          onClick={toggleMute}
          className="p-2 rounded-full bg-purple-500 text-white hover:bg-purple-600 transition-colors duration-200"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
        <span className="text-sm font-medium text-gray-700 hidden sm:block">
          teken play ni biar nyala
        </span>
      </div>
      
      {/* Using a simple audio element with a loop of happy birthday melody */}
      <audio
        ref={audioRef}
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        {/* In a real implementation, you'd have an actual audio file */}
        {/* For demo purposes, we'll use a data URL with a simple tone */}
        <source src="/musik/lagu.mp3" type="audio/wav" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default MusicPlayer;
