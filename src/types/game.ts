export type GameElement = 'fish_green' | 'fish_red' | 'fish_blue' | 'bab';

export interface GameCell {
  id: string;
  element: GameElement | null;
  x: number;
  y: number;
  isMatched?: boolean;
}

export interface GameGoal {
  element: GameElement;
  target: number;
  collected: number;
  completed: boolean;
}

export interface GameLevel {
  id: number;
  timeLimit: number; // in seconds
  goals: GameGoal[];
  gridSize: { width: number; height: number };
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  element: GameElement;
  levels: AchievementLevel[];
  currentLevel: number;
  isUnlocked: boolean;
}

export interface AchievementLevel {
  level: number;
  target: number;
  completed: boolean;
  reward: string;
}

export interface GameState {
  currentLevel: number;
  score: number;
  timeLeft: number;
  isPlaying: boolean;
  isPaused: boolean;
  grid: GameCell[][];
  goals: GameGoal[];
  achievements: Achievement[];
  totalElementsCollected: Record<GameElement, number>;
}

export const ELEMENT_EMOJIS: Record<GameElement, string> = {
  fish_green: '🐟',
  fish_red: '🐠',
  fish_blue: '🐟',
  bab: '🦗',
};

export const ELEMENT_NAMES: Record<GameElement, string> = {
  fish_green: 'Green Fish',
  fish_red: 'Clownfish',
  fish_blue: 'Blue Fish',
  bab: 'Bab',
};

