import React from 'react';
import { SnakeGame } from './components/SnakeGame';
import { AudioInterface } from './components/AudioInterface';
import { GlitchText } from './components/GlitchText';

export default function App() {
  return (
    <div className="min-h-screen bg-neo-black text-neo-cyan flex flex-col relative crt-flicker p-6 overflow-hidden">
      <header className="mb-8 w-full flex justify-between items-start z-10 flex-wrap gap-4">
        <div>
          <GlitchText element="h1" text="NEXUS_CORE // OS v9.9.9" className="text-3xl lg:text-4xl font-bold tracking-widest text-[#00ffff] mb-2" />
          <div className="text-neo-magenta text-sm tracking-widest opacity-80">&gt; SYNTHETIC_RECREATION_PROTOCOL_ENGAGED</div>
        </div>
        <div className="text-right text-xs opacity-60 font-mono tracking-widest border border-neo-cyan/20 p-2 shadow-[0_0_10px_#00ffff_inset]">
          <p className="text-neo-cyan">MEM: 0xFF49A0</p>
          <p className="text-neo-magenta">CPU: 99.9%</p>
          <p className="text-neo-cyan animate-pulse">NET: ESTABLISHED</p>
        </div>
      </header>

      <main className="flex-1 w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-16 items-center justify-center z-10 relative">
        <div className="flex-1 flex justify-center order-2 lg:order-1 w-full max-w-sm lg:max-w-md">
          <SnakeGame />
        </div>
        
        <div className="w-full lg:w-96 flex flex-col justify-center order-1 lg:order-2 shrink-0 lg:mt-0 mt-4">
          <AudioInterface />
          
          <div className="mt-8 border border-neo-cyan/30 p-4 bg-black/40 text-xs shadow-[0_0_10px_#00ffff_inset]">
            <p className="text-neo-magenta mb-2 font-bold tracking-widest text-sm">&gt;&gt; SYSTEM_LOG:</p>
            <ul className="space-y-2 text-neo-cyan/70 font-mono list-none p-0 m-0 tracking-widest">
              <li>&gt; [INIT] AUDIAL CORTEX ... OK</li>
              <li>&gt; [INIT] VISUAL RENDERER ... OK</li>
              <li className="text-[#ffff00]">&gt; [WARN] KINESTIC OVERRIDE DETECTED</li>
              <li className="text-[#ff00ff]">&gt; [WARN] NEURAL DECAY AT 14.8%</li>
              <li>&gt; [INFO] WAITING FOR USER INPUT</li>
            </ul>
          </div>
        </div>
      </main>
      
      <footer className="mt-8 text-center text-xs opacity-40 z-10 pt-4 border-t border-neo-cyan/20 tracking-widest">
        (C) 2099 CYBERDYNE SYS // AESTHETIC COMPLIANCE MANDATED
      </footer>
    </div>
  );
}
