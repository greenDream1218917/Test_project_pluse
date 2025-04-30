
import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResultDisplayProps {
  startPrice: number;
  endPrice: number;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ startPrice, endPrice }) => {
  const priceDifference = endPrice - startPrice;
  const percentageChange = (priceDifference / startPrice) * 100;
  const isUp = priceDifference >= 0;
  
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
      
      <div className="text-sm text-muted-foreground">
        Change: <span className={cn(
          "font-medium",
          isUp ? "text-bitcoin-success" : "text-bitcoin-danger"
        )}>
          {priceDifference.toFixed(2)} USD ({percentageChange.toFixed(2)}%)
        </span>
      </div>
    </div>
  );
};

export default ResultDisplay;
