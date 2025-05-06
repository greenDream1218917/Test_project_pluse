
import React, { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';

interface TimerSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const TimerSlider: React.FC<TimerSliderProps> = ({ value, onChange }) => {
  const [inputValue, setInputValue] = useState(value.toString());
  
  // Update input value when slider value changes from parent
  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  const handleValueChange = (values: number[]) => {
    onChange(values[0]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
  };

  const handleInputBlur = () => {
    let newValue = parseInt(inputValue, 10);
    
    // Ensure value is within range
    if (isNaN(newValue) || newValue < 15) {
      newValue = 15;
    } else if (newValue > 60) {
      newValue = 60;
    }
    
    setInputValue(newValue.toString());
    onChange(newValue);
  };

  // Calculate progress percentage for custom styling
  const progressPercentage = ((value - 15) / 45) * 100;

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium">Prediction Timer</h3>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            min={15}
            max={60}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            className="w-20 text-right text-bitcoin font-medium"
            inputMode="numeric"
          />
          <span className="text-sm font-medium text-muted-foreground">seconds</span>
        </div>
      </div>
      <div 
        className="slider-track" 
        style={{ "--slider-progress": `${progressPercentage}%` } as React.CSSProperties}
      >
        <Slider
          value={[value]}
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
