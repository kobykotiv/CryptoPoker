import React from 'react';
import { Card } from '@/lib/constants';

interface CardDisplayProps {
  card: Card | null;
  hidden?: boolean;
}

export const CardDisplay: React.FC<CardDisplayProps> = ({ card, hidden = false }) => {
  const cardSizeClasses = "w-10 h-14 md:w-12 md:h-18 lg:w-14 lg:h-20";

  if (hidden) {
    return (
      <div className={`${cardSizeClasses} bg-gradient-to-br from-blue-700 to-blue-900 rounded-md shadow-md border border-blue-600 flex items-center justify-center`}>
        <div className="w-4 h-4 rounded-full bg-blue-500 opacity-50"></div>
      </div>
    );
  }

  if (!card?.suit || !card?.value) {
    return <div className={`${cardSizeClasses} bg-gray-800 rounded-md opacity-30 border border-gray-700`}></div>;
  }

  const suitColor = card.suit === '♥' || card.suit === '♦' ? 'text-red-600' : 'text-black';

  return (
    <div className={`flex flex-col items-center justify-center ${cardSizeClasses} bg-white rounded-md shadow-lg border border-gray-400 p-1`}>
      <div className={`text-sm md:text-base lg:text-lg font-bold ${suitColor}`}>{card.value}</div>
      <div className={`text-base md:text-lg lg:text-xl ${suitColor}`}>{card.suit}</div>
    </div>
  );
};
