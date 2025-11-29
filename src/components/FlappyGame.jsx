import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, RefreshCw, Play, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

const FlappyGame = ({ onClose }) => {
    // Dynamic dimensions
    const [dimensions, setDimensions] = useState({
        width: Math.min(window.innerWidth * 0.8, 800),
        height: Math.min(window.innerHeight * 0.8, 800)
    });

    // Scale factor to keep gameplay consistent across sizes
    const scale = dimensions.height / 500;

    // Scaled Constants
    const GRAVITY = 0.6 * scale;
    const JUMP_STRENGTH = -8 * scale;
    const PIPE_SPEED = 3.5 * scale;
    const PIPE_SPAWN_RATE = 1500;
    const BIRD_SIZE = 34 * scale;
    const PIPE_WIDTH = 52 * scale;
    const PIPE_GAP = 160 * scale;

    const [gameState, setGameState] = useState('START'); // START, COUNTDOWN, PLAYING, GAME_OVER
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [countdown, setCountdown] = useState(3);

    // Refs for game loop state
    const birdY = useRef(dimensions.height / 2);
    const birdVel = useRef(0);
    const pipes = useRef([]);
    const lastPipeTime = useRef(0);
    const gameLoopRef = useRef();

    // Force render to update UI
    const [, setTick] = useState(0);

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: Math.min(window.innerWidth * 0.8, 800),
                height: Math.min(window.innerHeight * 0.8, 800)
            });
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Load high score
    useEffect(() => {
        const saved = localStorage.getItem('flappyHighScore');
        if (saved) setHighScore(parseInt(saved));
    }, []);

    // Save high score
    useEffect(() => {
        if (score > highScore) {
            setHighScore(score);
            localStorage.setItem('flappyHighScore', score.toString());
        }
    }, [score, highScore]);

    // Countdown Logic
    useEffect(() => {
        if (gameState === 'COUNTDOWN') {
            if (countdown > 0) {
                const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
                return () => clearTimeout(timer);
            } else {
                setGameState('PLAYING');
                lastPipeTime.current = performance.now();
            }
        }
    }, [gameState, countdown]);

    const startGame = () => {
        birdY.current = dimensions.height / 2;
        birdVel.current = 0;
        pipes.current = [];
        setScore(0);
        setCountdown(2); // 2 second delay
        setGameState('COUNTDOWN');
    };

    const jump = useCallback(() => {
        if (gameState === 'PLAYING') {
            birdVel.current = JUMP_STRENGTH;
        } else if (gameState === 'START' || gameState === 'GAME_OVER') {
            startGame();
        }
    }, [gameState, JUMP_STRENGTH, dimensions.height]);

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                jump();
            }
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [jump]);

    useEffect(() => {
        if (gameState !== 'PLAYING') {
            cancelAnimationFrame(gameLoopRef.current);
            return;
        }

        let lastTime = performance.now();

        const loop = (time) => {
            const now = time;
            const deltaTime = now - lastTime;
            lastTime = now;

            // Calculate time scale (1.0 at 60fps)
            // Cap at 4.0 (15fps) to prevent huge jumps
            const timeScale = Math.min(deltaTime / (1000 / 60), 4);

            // Physics
            birdVel.current += GRAVITY * timeScale;
            birdY.current += birdVel.current * timeScale;

            // Floor/Ceiling Collision
            if (birdY.current >= dimensions.height - BIRD_SIZE) {
                birdY.current = dimensions.height - BIRD_SIZE;
                setGameState('GAME_OVER');
                return;
            }
            if (birdY.current <= 0) {
                birdY.current = 0;
                birdVel.current = 0;
            }

            // Spawn Pipes
            if (now - lastPipeTime.current > PIPE_SPAWN_RATE) {
                const minPipeHeight = 50 * scale;
                const maxPipeHeight = dimensions.height - PIPE_GAP - minPipeHeight;
                const randomHeight = Math.floor(Math.random() * (maxPipeHeight - minPipeHeight + 1)) + minPipeHeight;

                pipes.current.push({
                    x: dimensions.width,
                    height: randomHeight,
                    passed: false
                });
                lastPipeTime.current = now;
            }

            // Move Pipes
            pipes.current.forEach(p => p.x -= PIPE_SPEED * timeScale);
            pipes.current = pipes.current.filter(p => p.x + PIPE_WIDTH > 0);

            // Collision Detection
            let collision = false;
            pipes.current.forEach(pipe => {
                // Horizontal overlap
                if (
                    dimensions.width / 2 - BIRD_SIZE / 2 < pipe.x + PIPE_WIDTH &&
                    dimensions.width / 2 + BIRD_SIZE / 2 > pipe.x
                ) {
                    // Vertical overlap
                    if (
                        birdY.current < pipe.height ||
                        birdY.current + BIRD_SIZE > pipe.height + PIPE_GAP
                    ) {
                        collision = true;
                    }
                }

                // Score
                if (!pipe.passed && pipe.x + PIPE_WIDTH < dimensions.width / 2 - BIRD_SIZE / 2) {
                    setScore(s => s + 1);
                    pipe.passed = true;
                }
            });

            if (collision) {
                setGameState('GAME_OVER');
                return;
            }

            setTick(t => t + 1); // Trigger render
            gameLoopRef.current = requestAnimationFrame(loop);
        };

        gameLoopRef.current = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(gameLoopRef.current);
    }, [gameState, dimensions, scale, GRAVITY, PIPE_SPEED, PIPE_WIDTH, BIRD_SIZE, PIPE_GAP]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div
                className="relative bg-light-bg dark:bg-shadowed-green rounded-2xl shadow-2xl overflow-hidden border-4 border-emerald-600 dark:border-mint-green transition-all duration-300"
                style={{ width: dimensions.width, height: dimensions.height }}
                onClick={jump}
            >
                {/* Background Elements */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute bottom-0 w-full h-24 bg-leafy-medium rounded-t-[50px]" />
                    <div className="absolute top-10 right-10 w-20 h-20 bg-yellow-400 rounded-full blur-xl" />
                </div>

                {/* Header / Score */}
                <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-10 pointer-events-none">
                    <div className="flex flex-col">
                        <span className="text-4xl font-bold text-emerald-800 dark:text-mint-green drop-shadow-md">
                            {score}
                        </span>
                        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                            <Trophy size={12} /> BEST: {highScore}
                        </span>
                    </div>
                    <button
                        onClick={(e) => { e.stopPropagation(); onClose(); }}
                        className="pointer-events-auto p-2 bg-white/20 hover:bg-white/40 rounded-full text-emerald-900 dark:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Game Area */}

                {/* Bird */}
                <div
                    className="absolute left-1/2 -translate-x-1/2"
                    style={{
                        top: birdY.current,
                        width: BIRD_SIZE,
                        height: BIRD_SIZE,
                        transform: `translate(-50%, 0) rotate(${Math.min(Math.max(birdVel.current * 3, -25), 25)}deg)`
                    }}
                >
                    <img
                        src="/duck.png"
                        alt="Flappy Duck"
                        className="w-full h-full object-contain select-none drop-shadow-sm"
                        draggable={false}
                    />
                </div>

                {/* Pipes */}
                {pipes.current.map((pipe, i) => (
                    <React.Fragment key={i}>
                        {/* Top Pipe */}
                        <div
                            className="absolute bg-leafy-medium border-x-4 border-b-4 border-leafy-dark rounded-b-lg"
                            style={{
                                left: pipe.x,
                                top: 0,
                                width: PIPE_WIDTH,
                                height: pipe.height,
                            }}
                        />
                        {/* Bottom Pipe */}
                        <div
                            className="absolute bg-leafy-medium border-x-4 border-t-4 border-leafy-dark rounded-t-lg"
                            style={{
                                left: pipe.x,
                                top: pipe.height + PIPE_GAP,
                                width: PIPE_WIDTH,
                                height: dimensions.height - (pipe.height + PIPE_GAP),
                            }}
                        />
                    </React.Fragment>
                ))}

                {/* Ground */}
                <div className="absolute bottom-0 w-full h-4 bg-leafy-dark z-20" />

                {/* Start / Game Over / Countdown Screens */}
                {gameState !== 'PLAYING' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] z-30">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl text-center max-w-[80%]"
                        >
                            {gameState === 'START' && (
                                <>
                                    <h2 className="text-2xl font-bold text-emerald-600 dark:text-mint-green mb-2">Flappy Duck</h2>
                                    <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">
                                        Press Space or Click to jump.<br />Avoid the pipes!
                                    </p>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); startGame(); }}
                                        className="flex items-center gap-2 mx-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold transition-transform hover:scale-105 active:scale-95"
                                    >
                                        <Play size={20} fill="currentColor" /> START
                                    </button>
                                </>
                            )}

                            {gameState === 'COUNTDOWN' && (
                                <div className="text-6xl font-black text-emerald-600 dark:text-mint-green animate-pulse">
                                    {countdown > 0 ? countdown : 'GO!'}
                                </div>
                            )}

                            {gameState === 'GAME_OVER' && (
                                <>
                                    <h2 className="text-3xl font-bold text-red-500 mb-1">GAME OVER</h2>
                                    <div className="text-4xl font-black text-emerald-800 dark:text-mint-green mb-4">{score}</div>
                                    <div className="flex gap-4 justify-center">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); onClose(); }}
                                            className="flex items-center gap-2 px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-full font-bold transition-transform hover:scale-105 active:scale-95"
                                        >
                                            <X size={20} /> CLOSE
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); startGame(); }}
                                            className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold transition-transform hover:scale-105 active:scale-95"
                                        >
                                            <RefreshCw size={20} /> RETRY
                                        </button>
                                    </div>
                                </>
                            )}
                        </motion.div>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default FlappyGame;
