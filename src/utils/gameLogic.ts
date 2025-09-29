import { GameElement, GameCell, GameGoal, GameLevel, Achievement, AchievementLevel } from '../types/game';

export const GAME_ELEMENTS: GameElement[] = [
  'fish_green',
  'fish_red', 
  'fish_blue',
  'bab'
];

export function generateRandomElement(): GameElement {
  return GAME_ELEMENTS[Math.floor(Math.random() * GAME_ELEMENTS.length)];
}

export function getElementEmoji(element: GameElement | undefined | null): string {
  if (!element) return '❓';
  
  const emojiMap: Record<GameElement, string> = {
    fish_green: '🐟',
    fish_red: '🐠',
    fish_blue: '🐟',
    bab: '🦗',
  };
  
  return emojiMap[element] || '❓';
}

export function getElementName(element: GameElement | undefined | null): string {
  if (!element) return 'Unknown Element';
  
  const nameMap: Record<GameElement, string> = {
    fish_green: 'Green Fish',
    fish_red: 'Clownfish',
    fish_blue: 'Blue Fish',
    bab: 'Bab',
  };
  
  return nameMap[element] || 'Unknown Element';
}

export function getElementImage(element: GameElement | undefined | null): any {
  if (!element) return require('../assets/img/fish/green.png');
  
  const imageMap: Record<GameElement, any> = {
    fish_green: require('../assets/img/fish/green.png'),
    fish_red: require('../assets/img/fish/red.png'),
    fish_blue: require('../assets/img/fish/blue.png'),
    bab: require('../assets/img/fish/bab.png'),
  };
  
  return imageMap[element] || require('../assets/img/fish/green.png');
}

export function createGameGrid(width: number, height: number): GameCell[][] {
  const grid: GameCell[][] = [];
  
  for (let y = 0; y < height; y++) {
    const row: GameCell[] = [];
    for (let x = 0; x < width; x++) {
      row.push({
        id: `${x}-${y}`,
        element: generateRandomElement(),
        x,
        y,
        isMatched: false
      });
    }
    grid.push(row);
  }
  
  return grid;
}

export function findMatches(grid: GameCell[][]): GameCell[][] {
  const matches: GameCell[][] = [];
  const width = grid[0].length;
  const height = grid.length;
  
  // Check horizontal matches
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width - 2; x++) {
      const cell1 = grid[y][x];
      const cell2 = grid[y][x + 1];
      const cell3 = grid[y][x + 2];
      
      if (cell1.element && cell2.element && cell3.element &&
          cell1.element === cell2.element && cell2.element === cell3.element) {
        matches.push([cell1, cell2, cell3]);
      }
    }
  }
  
  // Check vertical matches
  for (let y = 0; y < height - 2; y++) {
    for (let x = 0; x < width; x++) {
      const cell1 = grid[y][x];
      const cell2 = grid[y + 1][x];
      const cell3 = grid[y + 2][x];
      
      if (cell1.element && cell2.element && cell3.element &&
          cell1.element === cell2.element && cell2.element === cell3.element) {
        matches.push([cell1, cell2, cell3]);
      }
    }
  }
  
  return matches;
}

export function removeMatches(grid: GameCell[][], matches: GameCell[][]): GameCell[][] {
  const newGrid = grid.map(row => [...row]);
  
  matches.forEach(match => {
    match.forEach(cell => {
      newGrid[cell.y][cell.x].element = null;
      newGrid[cell.y][cell.x].isMatched = true;
    });
  });
  
  return newGrid;
}

export function dropElements(grid: GameCell[][]): GameCell[][] {
  const newGrid = grid.map(row => [...row]);
  const width = newGrid[0].length;
  const height = newGrid.length;
  
  // Drop elements down
  for (let x = 0; x < width; x++) {
    const column: (GameCell | null)[] = [];
    
    // Collect non-null elements
    for (let y = 0; y < height; y++) {
      if (newGrid[y][x].element) {
        column.push(newGrid[y][x]);
      }
    }
    
    // Fill from bottom
    for (let y = height - 1; y >= 0; y--) {
      const elementIndex = height - 1 - y;
      if (elementIndex < column.length) {
        newGrid[y][x] = {
          ...column[elementIndex],
          y,
          isMatched: false,
          id: column[elementIndex]?.id || `${x}-${y}`,
          x,
          element: column[elementIndex]?.element || null
        };
      } else {
        newGrid[y][x] = {
          id: `${x}-${y}`,
          element: null,
          x,
          y,
          isMatched: false
        };
      }
    }
  }
  
  return newGrid;
}

export function fillEmptyCells(grid: GameCell[][]): GameCell[][] {
  const newGrid = grid.map(row => [...row]);
  
  for (let y = 0; y < newGrid.length; y++) {
    for (let x = 0; x < newGrid[y].length; x++) {
      if (!newGrid[y][x].element) {
        newGrid[y][x].element = generateRandomElement();
        newGrid[y][x].isMatched = false;
      }
    }
  }
  
  return newGrid;
}

export function generateLevelGoals(level: number): GameGoal[] {
  const goals: GameGoal[] = [];
  const numGoals = Math.min(3, Math.floor(level / 3) + 1);
  
  for (let i = 0; i < numGoals; i++) {
    const element = GAME_ELEMENTS[Math.floor(Math.random() * GAME_ELEMENTS.length)];
    const target = Math.floor(Math.random() * 10) + 5 + level * 2; // 5-15 + level*2
    
    // Validate element before adding
    if (element && GAME_ELEMENTS.includes(element)) {
      goals.push({
        element,
        target,
        collected: 0,
        completed: false
      });
    }
  }
  
  return goals;
}

export function generateLevel(levelNumber: number): GameLevel {
  return {
    id: levelNumber,
    timeLimit: Math.max(60, 120 - levelNumber * 5), // 60-120 seconds
    goals: generateLevelGoals(levelNumber),
    gridSize: { width: 7, height: 9 }
  };
}

export function createAchievements(): Achievement[] {
  return [
    {
      id: 'fish_collector',
      name: 'Fish Collector',
      description: 'Collect fish to unlock achievements',
      element: 'fish_green',
      currentLevel: 0,
      isUnlocked: true,
      levels: [
        { level: 1, target: 10, completed: false, reward: 'Bronze Medal' },
        { level: 2, target: 50, completed: false, reward: 'Silver Medal' },
        { level: 3, target: 100, completed: false, reward: 'Gold Medal' }
      ]
    },
    {
      id: 'clownfish_master',
      name: 'Clownfish Master',
      description: 'Master the art of collecting clownfish',
      element: 'fish_red',
      currentLevel: 0,
      isUnlocked: false,
      levels: [
        { level: 1, target: 15, completed: false, reward: 'Clownfish Badge' },
        { level: 2, target: 75, completed: false, reward: 'Clownfish Expert' },
        { level: 3, target: 150, completed: false, reward: 'Clownfish Legend' }
      ]
    },
    {
      id: 'dragonfly_hunter',
      name: 'Dragonfly Hunter',
      description: 'Hunt down those elusive dragonflies',
      element: 'bab',
      currentLevel: 0,
      isUnlocked: false,
      levels: [
        { level: 1, target: 20, completed: false, reward: 'Dragonfly Badge' },
        { level: 2, target: 100, completed: false, reward: 'Dragonfly Expert' },
        { level: 3, target: 200, completed: false, reward: 'Dragonfly Legend' }
      ]
    }
  ];
}

export function updateAchievements(
  achievements: Achievement[],
  collectedElements: Record<GameElement, number>
): Achievement[] {
  return achievements.map(achievement => {
    const totalCollected = collectedElements[achievement.element] || 0;
    const currentLevel = achievement.levels[achievement.currentLevel];
    
    if (currentLevel && totalCollected >= currentLevel.target && !currentLevel.completed) {
      const newLevels = achievement.levels.map((level, index) => {
        if (index === achievement.currentLevel) {
          return { ...level, completed: true };
        }
        return level;
      });
      
      const nextLevel = achievement.currentLevel + 1;
      const isUnlocked = nextLevel < achievement.levels.length;
      
      return {
        ...achievement,
        levels: newLevels,
        currentLevel: nextLevel,
        isUnlocked: isUnlocked || achievement.isUnlocked
      };
    }
    
    return achievement;
  });
}

