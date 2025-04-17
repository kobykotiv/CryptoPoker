import { POKER_STAGES, AI_TYPES } from '@/components/games/BitcoinPoker';

// Define the AI player factory function
export const createAiPlayer = (type, id, name, initialBitcoin, tableInfo, evaluateHand) => {
  const aiState = {
    id,
    name,
    bitcoin: initialBitcoin,
    type,
    folded: false,
    betAmount: 0,
    totalBetInHand: 0,
    isAllIn: false,
    cards: [],
  };

  const getAction = (gameState) => {
    const { currentBet, stage, communityCards = [] } = gameState;
    const callAmount = currentBet - aiState.betAmount;
    const canCall = parseFloat(aiState.bitcoin) >= callAmount;
    const canAffordMore = parseFloat(aiState.bitcoin) > callAmount;

    let estimatedStrength = 0;
    const handEvalCards = [...aiState.cards, ...communityCards.slice(0, stage === POKER_STAGES.FLOP ? 3 : stage === POKER_STAGES.TURN ? 4 : 5)];
    if (handEvalCards.length >= 2) {
      const simpleEval = evaluateHand(aiState.cards, communityCards.slice(0, stage === POKER_STAGES.FLOP ? 3 : stage === POKER_STAGES.TURN ? 4 : 5));
      if (simpleEval.rank >= 3) estimatedStrength = 2;
      else if (simpleEval.rank >= 1) estimatedStrength = 1;
    }

    let action = 'fold';
    const randomFactor = Math.random();
    let foldProb = 0.2, checkBetProb = 0.15, callProb = 0.6, raiseProb = 0.15;

    switch (aiState.type) {
      case AI_TYPES.TIGHT:
        foldProb = (stage === POKER_STAGES.PRE_FLOP && estimatedStrength === 0) ? 0.7 : 0.3;
        callProb = 0.7;
        raiseProb = (estimatedStrength >= 1) ? 0.15 : 0.05;
        checkBetProb = 0.1;
        break;
      case AI_TYPES.AGGRESSIVE:
        foldProb = 0.1;
        callProb = 0.4;
        raiseProb = (estimatedStrength >= 1) ? 0.4 : 0.2;
        checkBetProb = 0.3;
        break;
      case AI_TYPES.RANDOM:
      default:
        break;
    }

    if (callAmount <= 0) {
      if (randomFactor < checkBetProb && canAffordMore) action = 'bet';
      else action = 'check';
    } else {
      if (canCall) {
        if (randomFactor < callProb) action = 'call';
        else if (randomFactor < callProb + raiseProb && canAffordMore) action = 'raise';
        else action = 'fold';
      } else {
        action = (parseFloat(aiState.bitcoin) > 0 && randomFactor < 0.7) ? 'all-in' : 'fold';
      }
    }

    let betAmount = 0;
    switch (action) {
      case 'bet':
        betAmount = Math.min(parseFloat(aiState.bitcoin), Math.max(tableInfo.minBet * 2, Math.floor(gameState.pot * 0.5)));
        if (betAmount <= 0) action = 'check';
        break;
      case 'raise':
        const raiseBase = Math.max(currentBet, tableInfo.minBet * 2);
        let raiseAmountToAdd = Math.max(raiseBase, Math.floor(gameState.pot * 0.75));
        raiseAmountToAdd = Math.min(raiseAmountToAdd, parseFloat(aiState.bitcoin) - callAmount);
        if (raiseAmountToAdd <= 0) {
          action = 'call';
        } else {
          betAmount = currentBet + raiseAmountToAdd;
        }
        break;
      case 'all-in':
        betAmount = parseFloat(aiState.bitcoin);
        break;
      case 'call':
        betAmount = Math.min(callAmount, parseFloat(aiState.bitcoin));
        break;
    }

    return { type: action, amount: betAmount };
  };

  return { ...aiState, getAction };
};
