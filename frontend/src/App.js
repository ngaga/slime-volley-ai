import React, { useState, useEffect } from 'react';

interface Player {
  x: number;
  y: number;
}

const GameComponent: React.FC = () => {
  const [ball, setBall] = useState({ x: 50, y: 50 });
  const [player1, setPlayer1] = useState<Player>({ x: 20, y: 50 });
  const [player2, setPlayer2] = useState<Player>({ x: 80, y: 50 });
  const [dx, setDx] = useState(2);
  const [dy, setDy] = useState(2);

  const tick = () => {
    let newBallX = ball.x + dx;
    let newBallY = ball.y + dy;

    // Collision detection for the walls
    if (newBallX >= 100 || newBallX <= 0) setDx(-dx);
    if (newBallY >= 100 || newBallY <= 0) setDy(-dy);

    // Collision detection for players
    if (newBallX < 25 && Math.abs(newBallY - player1.y) < 10) setDx(-dx);
    if (newBallX > 75 && Math.abs(newBallY - player2.y) < 10) setDx(-dx);

    setBall({ x: newBallX, y: newBallY });
  };

  useEffect(() => {
    const interval = setInterval(tick, 50);
    return () => clearInterval(interval);
  }, [ball, dx, dy]);

  return (
    <svg width="100vw" height="100vh" style={{ background: 'lightblue' }}>
      <circle cx={`${player1.x}%`} cy={`${player1.y}%`} r="5%" fill="red" />
      <circle cx={`${player2.x}%`} cy={`${player2.y}%`} r="5%" fill="blue" />
      <circle cx={`${ball.x}%`} cy={`${ball.y}%`} r="2%" fill="green" />
    </svg>
  );
};

export default GameComponent;
