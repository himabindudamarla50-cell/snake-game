import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { GlitchText } from './GlitchText';

const TRACKS = [
  { id: 'trk-01', title: 'SYNTH_PULSE_ALPHA', src: 'https://actions.google.com/sounds/v1/science_fiction/telemetry_fast.ogg' },
  { id: 'trk-02', title: 'VOID_RESONANCE_BETA', src: 'https://actions.google.com/sounds/v1/science_fiction/drone_pulse.ogg' },
  { id: 'trk-03', title: 'NEURAL_LINK_GAMMA', src: 'https://actions.google.com/sounds/v1/science_fiction/matrix_room.ogg' }
];

export const AudioInterface: React.FC = () => {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log('PLAY_ERROR::', e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : 0.5;
    }
  }, [isMuted]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % TRACKS.length);
    setIsPlaying(true);
  };
  const toggleMute = () => setIsMuted(!isMuted);

  const handleEnded = () => {
    nextTrack();
  }

  return (
    <div className="border-2 border-neo-magenta p-4 bg-black/60 shadow-[0_0_15px_#ff00ff_inset] w-full max-w-md relative before:absolute before:inset-0 before:bg-neo-magenta/5 before:pointer-events-none">
      <audio ref={audioRef} src={TRACKS[currentTrack].src} onEnded={handleEnded} loop={false} />
      
      <GlitchText text="AUDIO_SUBSYSTEM" className="text-xl text-neo-magenta mb-4 border-b border-neo-magenta/50 pb-2 block w-full" />

      <div className="flex flex-col gap-4">
        <div className="bg-neo-black border border-neo-cyan/50 p-3 flex justify-between items-center relative overflow-hidden shadow-[0_0_8px_#00ffff_inset]">
            <div className="absolute top-0 left-0 h-full bg-neo-cyan/10 animate-pulse w-full pointer-events-none"></div>
            <span className="z-10 text-neo-cyan text-lg select-none truncate pr-4">TRK: {TRACKS[currentTrack].title}</span>
            <span className="z-10 text-xs text-neo-cyan font-bold select-none whitespace-nowrap animate-pulse">
              {isPlaying ? 'ACTIVE' : 'IDLE'}
            </span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <button
              onClick={togglePlay}
              className="p-2 border border-neo-cyan text-neo-cyan hover:bg-neo-cyan hover:text-black hover:shadow-[0_0_15px_#00ffff] transition-all duration-200 focus:outline-none"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <button
              onClick={nextTrack}
              className="p-2 border border-neo-cyan text-neo-cyan hover:bg-neo-cyan hover:text-black hover:shadow-[0_0_15px_#00ffff] transition-all duration-200 focus:outline-none relative overflow-hidden group"
            >
              <SkipForward size={24} className="relative z-10" />
            </button>
          </div>

          <button
            onClick={toggleMute}
            className="p-2 text-neo-magenta hover:text-white transition-colors focus:outline-none"
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
        </div>
      </div>
    </div>
  );
}
