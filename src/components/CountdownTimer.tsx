
import React, { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';

interface CountdownTimerProps {
  duration: number;
  onComplete: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ duration, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(prev => prev - 1);
      setProgress((timeLeft - 1) / duration * 100);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, duration, onComplete]);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium">Time Remaining</h3>
        <span className="text-sm font-bold text-bitcoin">{timeLeft}s</span>
      </div>
      <Progress value={progress} className="h-3" />
    </div>
  );
};

export default CountdownTimer;
