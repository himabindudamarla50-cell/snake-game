import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GlitchText } from './GlitchText';

function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);
  
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay !== null) {
      const id = setInterval(() => savedCallback.current(), delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

type Point = { x: number; y: number };

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 0, y: -1 };
const BASE_SPEED = 150;

const generateFood = (snake: Point[]): Point => {
  let newFood: Point;
  while (true) {
    newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    const collision = snake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
    if (!collision) break;
  }
  return newFood;
};

export const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [dir, setDir] = useState<Point>(INITIAL_DIRECTION);
  const [food, setFood] = useState<Point>({ x: 15, y: 5 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    setFood(generateFood(INITIAL_SNAKE));
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDir(INITIAL_DIRECTION);
    setFood(generateFood(INITIAL_SNAKE));
    setGameOver(false);
    setScore(0);
    setHasStarted(false);
    setIsPaused(false);
  };

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
      e.preventDefault();
    }

    if (gameOver && e.key === 'Enter') {
      resetGame();
      return;
    }

    if (e.key === ' ' && hasStarted && !gameOver) {
      setIsPaused(p => !p);
      return;
    }

    if (!hasStarted && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd'].includes(e.key)) {
        setHasStarted(true);
    }

    switch (e.key) {
      case 'ArrowUp':
      case 'w':
        if (dir.y !== 1) setDir({ x: 0, y: -1 });
        break;
      case 'ArrowDown':
      case 's':
        if (dir.y !== -1) setDir({ x: 0, y: 1 });
        break;
      case 'ArrowLeft':
      case 'a':
        if (dir.x !== 1) setDir({ x: -1, y: 0 });
        break;
      case 'ArrowRight':
      case 'd':
        if (dir.x !== -1) setDir({ x: 1, y: 0 });
        break;
    }
  }, [dir, gameOver, hasStarted]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress, { passive: false });
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const gameLoop = () => {
    if (gameOver || isPaused || !hasStarted) return;

    const newSnake = [...snake];
    const head = { ...newSnake[0] };

    head.x += dir.x;
    head.y += dir.y;

    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      setGameOver(true);
      return;
    }

    if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
      setGameOver(true);
      return;
    }

    newSnake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      setScore(s => s + 10);
      setFood(generateFood(newSnake));
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  };

  useInterval(gameLoop, (gameOver || isPaused || !hasStarted) ? null : Math.max(50, BASE_SPEED - Math.floor(score / 50) * 10));

  return (
    <div className="flex flex-col items-center w-full max-w-md">
      <div className="flex justify-between w-full mb-4 border-b-2 border-neo-cyan pb-2 text-2xl">
        <GlitchText text={`SCORE:${score.toString().padStart(4, '0')}`} className="text-neo-cyan" />
        <GlitchText text={gameOver ? 'ERR_FATAL' : 'SYS_NOMINAL'} className={gameOver ? 'text-[#ff0000]' : 'text-neo-cyan'} />
      </div>

      <div
        className="w-full aspect-square bg-neo-black border-4 border-neo-cyan relative outline outline-2 outline-neo-magenta outline-offset-4 shadow-[0_0_30px_#00ffff_inset,0_0_30px_#ff00ff]"
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:5%_5%] pointer-events-none" />

        {!hasStarted && !gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 z-20">
            <GlitchText text="AWAITING_INPUT" className="text-3xl text-neo-cyan mb-4 animate-[pulse_2s_ease-in-out_infinite]" />
            <p className="text-neo-magenta">PRESS ANY DIRECTIONAL KEY</p>
            <p className="text-neo-magenta">TO INITIATE SEQUENCE</p>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-20">
            <GlitchText text="SYSTEM_FAILURE" className="text-4xl text-[#ff0000] mb-4" />
            <p className="text-neo-cyan mb-2">FINAL_SCORE: {score}</p>
            <p className="text-neo-magenta animate-[pulse_1.5s_infinite] mt-4">PRESS [ENTER] TO REBOOT</p>
          </div>
        )}

        {isPaused && !gameOver && hasStarted && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 z-20">
            <GlitchText text="PAUSED" className="text-4xl text-neo-cyan animate-[pulse_1s_infinite]" />
          </div>
        )}

        {snake.map((segment, index) => {
          const isHead = index === 0;
          return (
            <div
              key={index}
              className="absolute bg-neo-cyan"
              style={{
                left: `${(segment.x / GRID_SIZE) * 100}%`,
                top: `${(segment.y / GRID_SIZE) * 100}%`,
                width: `${100 / GRID_SIZE}%`,
                height: `${100 / GRID_SIZE}%`,
                boxShadow: isHead ? '0 0 12px #00ffff' : 'none',
                opacity: isHead ? 1 : 0.8
              }}
            />
          )
        })}

        <div
          className="absolute bg-neo-magenta outline outline-1 outline-white/50 animate-[pulse_0.5s_infinite]"
          style={{
            left: `${(food.x / GRID_SIZE) * 100}%`,
            top: `${(food.y / GRID_SIZE) * 100}%`,
            width: `${100 / GRID_SIZE}%`,
            height: `${100 / GRID_SIZE}%`,
            boxShadow: '0 0 15px #ff00ff'
          }}
        />
      </div>
      
      <div className="mt-8 text-neo-cyan/70 text-sm flex gap-6 tracking-widest text-center justify-center">
        <span>[W,A,S,D/ARROWS] NAVIGATE</span>
        <span className="text-neo-cyan/40">|</span>
        <span>[SPACE] SUSPEND</span>
      </div>
    </div>
  );
};
