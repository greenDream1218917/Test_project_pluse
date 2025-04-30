
import React from 'react';
import { cn } from '@/lib/utils';

interface PriceDisplayProps {
  price: number | null;
  label: string;
  isLive?: boolean;
  className?: string;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({ 
  price, 
  label,
  isLive = false,
  className
}) => {
  const formattedPrice = price !== null 
    ? price.toLocaleString('en-US', { 
        style: 'currency', 
        currency: 'USD',
        maximumFractionDigits: 2
      }) 
    : 'Loading...';

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <span className="text-sm text-muted-foreground mb-1">{label}</span>
      <div className="flex items-center gap-2">
        <span className={cn(
          "text-2xl font-bold",
          isLive && price ? "animate-pulse-slow text-bitcoin" : "text-foreground"
        )}>
          {formattedPrice}
        </span>
        {isLive && price && (
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        )}
      </div>
    </div>
  );
};

export default PriceDisplay;
