import { writable } from "svelte/store";

export type GameState = {
  stacks: Card[][],
  spare: Card | null,
  deck: Card[],
}

export type Suit = 'clubs' | 'diamonds' | 'hearts' | 'spades';
export type Rank = 6 | 7 | 8 | 9 | 10 | 'A' | 'J' | 'K' | 'Q';

export type Card = {
  suit: Suit,
  rank: Rank,
};

export const CARDS: Card[] = [];

export const SUITS = ['clubs', 'diamonds', 'hearts', 'spades'] as const;
export const RANKS = [6, 7, 8, 9, 10, 'A', 'J', 'K', 'Q'] as const;

for (const suit of SUITS)
  for (const rank of RANKS)
    CARDS.push({ suit, rank })


const sample = <T>(array: T[]): T | null =>
  array.length > 0
    ? array[Math.floor(Math.random() * array.length)]
    : null;


const shuffle = <T>(array: T[]) => {
  const shuffled = array.slice(0);
  for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = shuffled[i];
      shuffled[i] = shuffled[j];
      shuffled[j] = temp;
  }
  return shuffled;
};

const modifyAt = <T>(array: T[], i: number, f: (x: T) => T): T[] =>
  array.map((x, j) => j == i ? f(x) : x);


const allCards = ({ stacks, spare, deck }: GameState): Card[] => {
  const cards = stacks.flat();
  cards.push(...deck);
  if (spare)
    cards.push(spare);

  return cards;
}


const newGameState = () => {
  const stacks = Array.from(Array(9)).map<Card[]>(() => []);
  const deck = shuffle(CARDS);

  return {
    stacks,
    spare: null,
    deck
  }
}

export const createGameStore = () => {

  const { subscribe, set, update } = writable<GameState>(newGameState());

  const dealOne = () => update(s => {
    const { stacks, spare, deck } = s
    if (!deck.length) return s;

    const is = stacks.map((x, i) => x.length < 4 ? i : -1).filter(x => x >= 0);
    const i = sample(is);
    if (i == null) return s;

    const c = deck[deck.length - 1];
    return {
      stacks: modifyAt(stacks, i, x => [...x, c]),
      spare,
      deck: deck.slice(0, -1),
    };
  });

  return {
    subscribe,
    dealOne,
    reset: () => update(() => newGameState())
  }
};

export const store = createGameStore();
