
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import PriceDisplay from '@/components/PriceDisplay';
import TimerSlider from '@/components/TimerSlider';
import CountdownTimer from '@/components/CountdownTimer';
import ResultDisplay from '@/components/ResultDisplay';
import { fetchBitcoinPrice } from '@/lib/api';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';

enum GameState {
  IDLE = 'idle',
  PREDICTING = 'predicting',
  RESULT = 'result'
}

type PredictionType = 'up' | 'down' | null;

const PredictionGame: React.FC = () => {
  // Game state
  const [gameState, setGameState] = useState<GameState>(GameState.IDLE);
  
  // Price data
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [lockedPrice, setLockedPrice] = useState<number | null>(null);
  const [finalPrice, setFinalPrice] = useState<number | null>(null);
  
  // Prediction
  const [userPrediction, setUserPrediction] = useState<PredictionType>(null);
  
  // Timer settings
  const [timerDuration, setTimerDuration] = useState<number>(30);
  
  // Function to fetch current BTC price
  const fetchPrice = useCallback(async () => {
    try {
      const price = await fetchBitcoinPrice();
      setCurrentPrice(price);
      return price;
    } catch (error) {
      toast.error("Failed to fetch Bitcoin price");
      return null;
    }
  }, []);
  
  // Price polling effect
  useEffect(() => {
    // Only poll for price updates in IDLE state
    if (gameState !== GameState.IDLE) return;
    
    // Immediately fetch price on mount
    fetchPrice();
    
    // Set up interval for price updates
    const intervalId = setInterval(() => {
      fetchPrice();
    }, 500); // Update every 500ms
    
    // Clean up interval on unmount or state change
    return () => clearInterval(intervalId);
  }, [fetchPrice, gameState]);
  
  // Handle prediction selection
  const handlePrediction = (prediction: PredictionType) => {
    setUserPrediction(prediction);
    handleStartPrediction();
  };
  
  // Handle start prediction
  const handleStartPrediction = async () => {
    try {
      const price = await fetchPrice();
      if (price) {
        setLockedPrice(price);
        setGameState(GameState.PREDICTING);
        toast.success("Price locked! Prediction started.");
      }
    } catch (error) {
      toast.error("Failed to start prediction");
    }
  };
  
  // Handle prediction complete
  const handlePredictionComplete = async () => {
    try {
      const price = await fetchPrice();
      if (price) {
        setFinalPrice(price);
        setGameState(GameState.RESULT);
      }
    } catch (error) {
      toast.error("Failed to complete prediction");
    }
  };
  
  // Handle reset game
  const handleReset = () => {
    setGameState(GameState.IDLE);
    setLockedPrice(null);
    setFinalPrice(null);
    setUserPrediction(null);
  };
  
  return (
    <div className="flex flex-col gap-8 w-full max-w-md mx-auto">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">
          <span className="text-bitcoin">BTC</span> Price Lock
        </h1>
        <p className="text-sm text-muted-foreground">
          Predict if Bitcoin price will go up or down
        </p>
      </div>
      
      {/* Current Price Display */}
      <div className="bg-bitcoin-gray/20 rounded-lg p-4">
        {gameState === GameState.IDLE && (
          <PriceDisplay 
            price={currentPrice} 
            label="Current BTC Price" 
            isLive={true}
          />
        )}
        
        {gameState === GameState.PREDICTING && (
          <div className="flex flex-col gap-4">
            <PriceDisplay 
              price={lockedPrice} 
              label="Locked BTC Price" 
            />
            <CountdownTimer 
              duration={timerDuration} 
              onComplete={handlePredictionComplete} 
            />
          </div>
        )}
        
        {gameState === GameState.RESULT && (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between">
              <PriceDisplay 
                price={lockedPrice} 
                label="Start Price" 
                className="flex-1"
              />
              <PriceDisplay 
                price={finalPrice} 
                label="End Price" 
                className="flex-1"
              />
            </div>
            <ResultDisplay 
              startPrice={lockedPrice!} 
              endPrice={finalPrice!} 
              userPrediction={userPrediction}
            />
          </div>
        )}
      </div>
      
      {/* Timer Slider */}
      {gameState === GameState.IDLE && (
        <TimerSlider value={timerDuration} onChange={setTimerDuration} />
      )}
      
      {/* Action Button */}
      <div className="text-center">
        {gameState === GameState.IDLE && (
          <div className="flex flex-col gap-4 items-center">
            <p className="text-sm text-muted-foreground mb-2">Make your prediction:</p>
            <div className="flex gap-4">
              <Button
                onClick={() => handlePrediction('up')}
                disabled={!currentPrice}
                className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-4 flex items-center gap-2"
              >
                <ArrowUpIcon size={20} />
                Up
              </Button>
              
              <Button
                onClick={() => handlePrediction('down')}
                disabled={!currentPrice}
                className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-4 flex items-center gap-2"
              >
                <ArrowDownIcon size={20} />
                Down
              </Button>
            </div>
          </div>
        )}
        
        {gameState === GameState.PREDICTING && (
          <p className="text-sm text-muted-foreground">
            Waiting for prediction result...
          </p>
        )}
        
        {gameState === GameState.RESULT && (
          <Button
            onClick={handleReset}
            className="bg-bitcoin hover:bg-bitcoin/80 text-black font-bold"
          >
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
};

export default PredictionGame;
