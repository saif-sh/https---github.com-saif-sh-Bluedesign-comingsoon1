import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [time, setTime] = useState({});
  const [cursorStyle, setCursorStyle] = useState('');
  const [particles, setParticles] = useState([]);

  const calculateTimeLeft = () => {
    const targetDate = new Date('Oct 10, 2024 14:30:0').getTime();
    const now = new Date().getTime();
    const distance = targetDate - now;

    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % 1000) / 1000),
    };
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(calculateTimeLeft());
    }, 1000);

    const newParticles = [...Array(100)].map((_, index) => ({
      id: index,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      speedX: (Math.random() - 0.5) * 0.5, // Reduced speed for smoother animation
      speedY: (Math.random() - 0.5) * 0.5, // Reduced speed for smoother animation
      radius: Math.random() * 5 + 2,
      opacity: Math.random() * 0.5 + 0.5,
    }));

    setParticles(newParticles);

    const animateParticles = () => {
      setParticles((prevParticles) =>
        prevParticles.map((particle) => {
          let newX = particle.x + particle.speedX;
          let newY = particle.y + particle.speedY;

          if (newX < 0 || newX > window.innerWidth) {
            particle.speedX = -particle.speedX;
          }

          if (newY < 0 || newY > window.innerHeight) {
            particle.speedY = -particle.speedY;
          }

          return { ...particle, x: newX, y: newY };
        })
      );

      requestAnimationFrame(animateParticles);
    };

    animateParticles();

    return () => clearInterval(timer);
  }, []);

  const handleMouseEnter = () => {
    setCursorStyle('pointer');
  };

  const handleMouseLeave = () => {
    setCursorStyle('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black flex items-center justify-center relative overflow-hidden">
      <div className="particle-container absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              width: `${particle.radius}px`,
              height: `${particle.radius}px`,
              backgroundColor: '#3B82F6',
              borderRadius: '50%',
              opacity: particle.opacity,
              transition: 'transform 1s linear', // Smooth transition for particle movement
            }}
          ></div>
        ))}
      </div>
      <div className="p-12 bg-gray-800 bg-opacity-90 rounded-lg shadow-lg text-center backdrop-filter backdrop-blur-md">
        <h1 className="text-6xl font-semibold text-white mb-4">Our Launch Is Imminent</h1>
        <p className="text-md text-gray-400 mb-6">Brace yourselves for an unparalleled experience from Blue Design!</p>
        <div className="flex justify-center space-x-8 mb-8">
          <TimeUnit value={time.days} label="Days" />
          <TimeUnit value={time.hours} label="Hours" />
          <TimeUnit value={time.minutes} label="Minutes" />
          <TimeUnit value={time.seconds} label="Seconds" />
        </div>
        <a
          href="#"
          className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded transition-transform transform hover:scale-105"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ cursor: cursorStyle }}
        >
          Stay Updated
        </a>
      </div>
    </div>
  );
};

const TimeUnit = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <div className="relative w-32 h-32 flex items-center justify-center mb-2">
      <svg className="absolute w-full h-full">
        <circle className="text-gray-700" strokeWidth="6" stroke="currentColor" fill="transparent" r="52" cx="50%" cy="50%" />
        <circle
          className="text-blue-500 hover:text-blue-400 transition-colors duration-300"
          strokeWidth="6"
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="52"
          cx="50%"
          cy="50%"
          style={{
            strokeDasharray: '326.56',
            strokeDashoffset: (326.56 * (1 - (value / (label === 'Days' ? 365 : 60)))).toFixed(1),
            transition: 'stroke-dashoffset 1s linear',
          }}
        />
      </svg>
      <span className="text-4xl text-white font-semibold z-10">{value}</span>
    </div>
    <span className="text-lg text-gray-400 font-medium">{label}</span>
  </div>
);

export default CountdownTimer;
