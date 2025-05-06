
import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResultDisplayProps {
  startPrice: number;
  endPrice: number;
  userPrediction?: 'up' | 'down' | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ startPrice, endPrice, userPrediction }) => {
  const priceDifference = endPrice - startPrice;
  const percentageChange = (priceDifference / startPrice) * 100;
  const isUp = priceDifference >= 0;
  
  // Determine if prediction was correct
  const isPredictionCorrect = 
    (userPrediction === 'up' && isUp) || 
    (userPrediction === 'down' && !isUp);

  return (
    <div className="flex flex-col items-center">
      <div className={cn(
        "flex items-center gap-2 text-lg font-bold mb-2",
        isUp ? "text-bitcoin-success" : "text-bitcoin-danger"
      )}>
        {isUp ? (
          <>
            <ArrowUpIcon className="w-5 h-5" />
            <span>Price Went Up</span>
          </>
        ) : (
          <>
            <ArrowDownIcon className="w-5 h-5" />
            <span>Price Went Down</span>
          </>
        )}
      </div>
      
      <div className="text-sm text-muted-foreground mb-4">
        Change: <span className={cn(
          "font-medium",
          isUp ? "text-bitcoin-success" : "text-bitcoin-danger"
        )}>
          {priceDifference.toFixed(2)} USD ({percentageChange.toFixed(2)}%)
        </span>
      </div>

      {userPrediction && (
        <div className={cn(
          "mt-2 py-2 px-4 rounded-full text-white font-medium",
          isPredictionCorrect ? "bg-green-500" : "bg-red-500"
        )}>
          {isPredictionCorrect ? "Correct Prediction! 🎉" : "Incorrect Prediction 😔"}
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;
