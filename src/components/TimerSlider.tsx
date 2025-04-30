
import React from 'react';
import { Slider } from '@/components/ui/slider';

interface TimerSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const TimerSlider: React.FC<TimerSliderProps> = ({ value, onChange }) => {
  const handleValueChange = (values: number[]) => {
    onChange(values[0]);
  };

  // Calculate progress percentage for custom styling
  const progressPercentage = ((value - 15) / 45) * 100;

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium">Prediction Timer</h3>
        <span className="text-sm font-bold text-bitcoin">{value} seconds</span>
      </div>
      <div 
        className="slider-track" 
        style={{ "--slider-progress": `${progressPercentage}%` } as React.CSSProperties}
      >
        <Slider
          defaultValue={[value]}
          min={15}
          max={60}
          step={1}
          onValueChange={handleValueChange}
          className="py-4"
        />
      </div>
      <div className="flex justify-between text-xs text-muted-foreground mt-1">
        <span>15s</span>
        <span>60s</span>
      </div>
    </div>
  );
};

export default TimerSlider;
