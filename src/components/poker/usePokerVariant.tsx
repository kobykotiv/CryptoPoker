import { useCallback } from 'react';
import { POKER_VARIANTS, VALUE_MAP, VALUES } from '@/lib/constants';

export interface HandEvaluationResult {
  rank: number;
  description: string;
}

export interface PokerVariantConfig {
  holeCardsCount: number;
  communityCardsCount: number;
}

export const usePokerVariant = (variant: string) => {
  const getVariantConfig = useCallback((): PokerVariantConfig => {
    switch (variant) {
      case POKER_VARIANTS.OMAHA:
        return { holeCardsCount: 4, communityCardsCount: 5 };
      case POKER_VARIANTS.FIVE_CARD_DRAW:
        return { holeCardsCount: 5, communityCardsCount: 0 };
      case POKER_VARIANTS.TEXAS_HOLDEM:
      default:
        return { holeCardsCount: 2, communityCardsCount: 5 };
    }
  }, [variant]);

  const evaluateHand = useCallback((hand, communityCards): HandEvaluationResult => {
    if (!hand || hand.length === 0) return { rank: 0, description: 'No Hand' };
    const allCards = [...hand, ...communityCards].filter(Boolean);
    if (allCards.length < 5 && variant !== POKER_VARIANTS.FIVE_CARD_DRAW) return { rank: 0, description: 'Not enough cards' };
    if (allCards.length !== 5 && variant === POKER_VARIANTS.FIVE_CARD_DRAW) return { rank: 0, description: 'Not enough cards' };

    const valueCounts: Record<string, number> = {};
    let highestCardValue = 0;
    allCards.forEach(card => {
      if (card?.value) {
        valueCounts[card.value] = (valueCounts[card.value] || 0) + 1;
        highestCardValue = Math.max(highestCardValue, VALUE_MAP[card.value] || 0);
      }
    });

    const counts = Object.values(valueCounts).map(Number).sort((a, b) => b - a);
    let rank = 0;
    const highCardForDesc = VALUES[highestCardValue - 2] || 'N/A';
    let description = `High Card (${highCardForDesc})`;

    if (counts[0] === 4) {
      rank = 7;
      description = 'Four of a Kind';
    } else if (counts[0] === 3 && counts[1] >= 2) {
      rank = 6;
      description = 'Full House';
    } else if (counts[0] === 3) {
      rank = 3;
      description = 'Three of a Kind';
    } else if (Number(counts[0]) === 2 && Number(counts[1]) === 2) {
      rank = 2;
      description = 'Two Pair';
    } else if (Number(counts[0]) === 2) {
      rank = 1;
      description = 'Pair';
    }

    return { rank, description };
  }, [variant]);

  return { getVariantConfig, evaluateHand };
};
