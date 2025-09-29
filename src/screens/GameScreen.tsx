import React, { useState, useEffect, useCallback, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
  Animated,
  Image,
} from 'react-native';
import { NavigationContext, RootStackParamList } from '../../App';
import { GameElement, GameCell, GameGoal, GameState } from '../types/game';
import {
  createGameGrid,
  findMatches,
  removeMatches,
  dropElements,
  fillEmptyCells,
  generateLevel,
  updateAchievements,
  createAchievements,
  getElementImage,
} from '../utils/gameLogic';
import AnimatedElement from '../components/AnimatedElement';
import BackgroundBubbles from '../components/BackgroundBubbles';
import BackgroundImage from '../components/BackgroundImage';

const { width } = Dimensions.get('window');
const GRID_SIZE = 7;
const CELL_SIZE = (width - 40) / GRID_SIZE;

const GameScreen: React.FC = () => {
  const { navigate } = useContext(NavigationContext);
  const [gameState, setGameState] = useState<GameState>({
    currentLevel: 1,
    score: 0,
    timeLeft: 120,
    isPlaying: false,
    isPaused: false,
    grid: [],
    goals: [],
    achievements: createAchievements(),
    totalElementsCollected: {
      fish_green: 0,
      fish_red: 0,
      fish_blue: 0,
      bab: 0,
    },
  });

  const [selectedCell, setSelectedCell] = useState<GameCell | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Initialize game
  useEffect(() => {
    initializeGame();
  }, []);

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameState.isPlaying && !gameState.isPaused && gameState.timeLeft > 0) {
      interval = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          timeLeft: prev.timeLeft - 1,
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState.isPlaying, gameState.isPaused, gameState.timeLeft]);

  // Check game over
  useEffect(() => {
    if (gameState.timeLeft === 0 && gameState.isPlaying) {
      endGame();
    }
  }, [gameState.timeLeft, gameState.isPlaying]);

  const initializeGame = () => {
    const level = generateLevel(gameState.currentLevel);
    const grid = createGameGrid(level.gridSize.width, level.gridSize.height);
    
    // Validate goals before setting
    const validGoals = level.goals.filter(goal => goal && goal.element);
    
    setGameState(prev => ({
      ...prev,
      grid,
      goals: validGoals,
      timeLeft: level.timeLimit,
      isPlaying: true,
      isPaused: false,
    }));
  };

  const handleCellPress = (cell: GameCell) => {
    if (!gameState.isPlaying || isAnimating || !cell.element) return;

    if (!selectedCell) {
      setSelectedCell(cell);
    } else {
      if (selectedCell.id === cell.id) {
        setSelectedCell(null);
      } else {
        // Check if cells are adjacent
        const isAdjacent = Math.abs(selectedCell.x - cell.x) + Math.abs(selectedCell.y - cell.y) === 1;
        
        if (isAdjacent) {
          swapCells(selectedCell, cell);
        } else {
          setSelectedCell(cell);
        }
      }
    }
  };

  const swapCells = (cell1: GameCell, cell2: GameCell) => {
    const newGrid = gameState.grid.map(row => [...row]);
    
    // Swap elements
    const tempElement = newGrid[cell1.y][cell1.x].element;
    newGrid[cell1.y][cell1.x].element = newGrid[cell2.y][cell2.x].element;
    newGrid[cell2.y][cell2.x].element = tempElement;

    setGameState(prev => ({
      ...prev,
      grid: newGrid,
    }));

    setSelectedCell(null);
    checkForMatches(newGrid);
  };

  const checkForMatches = (grid: GameCell[][]) => {
    const matches = findMatches(grid);
    
    if (matches.length > 0) {
      setIsAnimating(true);
      
      // Remove matches and collect elements
      const newGrid = removeMatches(grid, matches);
      const collectedElements: Record<GameElement, number> = { ...gameState.totalElementsCollected };
      
      matches.forEach(match => {
        const element = match[0].element!;
        collectedElements[element] = (collectedElements[element] || 0) + match.length;
      });

      // Update goals
      const newGoals = gameState.goals.map(goal => {
        const collected = collectedElements[goal.element] || 0;
        return {
          ...goal,
          collected: Math.min(goal.collected + collected, goal.target),
          completed: goal.collected + collected >= goal.target,
        };
      });

      // Update achievements
      const newAchievements = updateAchievements(gameState.achievements, collectedElements);

      setGameState(prev => ({
        ...prev,
        grid: newGrid,
        goals: newGoals,
        achievements: newAchievements,
        totalElementsCollected: collectedElements,
        score: prev.score + matches.length * 10,
      }));

      // Drop elements and fill empty cells
      setTimeout(() => {
        const droppedGrid = dropElements(newGrid);
        const filledGrid = fillEmptyCells(droppedGrid);
        
        setGameState(prev => ({
          ...prev,
          grid: filledGrid,
        }));

        // Check for more matches
        setTimeout(() => {
          checkForMatches(filledGrid);
          setIsAnimating(false);
        }, 500);
      }, 300);
    } else {
      setIsAnimating(false);
    }
  };

  const endGame = () => {
    const allGoalsCompleted = gameState.goals.every(goal => goal.completed);
    
    setGameState(prev => ({
      ...prev,
      isPlaying: false,
    }));

    if (allGoalsCompleted) {
      Alert.alert(
        'Level Complete! 🎉',
        `Congratulations! You completed level ${gameState.currentLevel}!`,
        [
          {
            text: 'Next Level',
            onPress: () => {
              setGameState(prev => ({
                ...prev,
                currentLevel: prev.currentLevel + 1,
              }));
              initializeGame();
            },
          },
          {
            text: 'Play Again',
            onPress: initializeGame,
          },
        ]
      );
    } else {
      Alert.alert(
        'Time\'s Up! ⏰',
        'Better luck next time!',
        [
          {
            text: 'Try Again',
            onPress: initializeGame,
          },
        ]
      );
    }
  };

  const pauseGame = () => {
    setGameState(prev => ({
      ...prev,
      isPaused: !prev.isPaused,
    }));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderCell = (cell: GameCell) => {
    const isSelected = selectedCell?.id === cell.id;
    
    return (
      <TouchableOpacity
        key={cell.id}
        style={[
          styles.cell,
          isSelected && styles.selectedCell,
          cell.isMatched && styles.matchedCell,
        ]}
        onPress={() => handleCellPress(cell)}
        disabled={!cell.element || isAnimating}
      >
        {cell.element && (
          <AnimatedElement
            element={cell.element}
            size={CELL_SIZE}
            isMatched={cell.isMatched}
            isSelected={isSelected}
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <BackgroundImage>
      <View style={styles.container}>
        {/* Background */}
        <BackgroundBubbles />
        
        {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigate('Home')}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View style={styles.levelInfo}>
          <Text style={styles.levelText}>Level {gameState.currentLevel}</Text>
          <Text style={styles.scoreText}>Score: {gameState.score}</Text>
        </View>
        <View style={styles.timerContainer}>
          <Text style={styles.timerIcon}>⏰</Text>
          <Text style={styles.timerText}>{formatTime(gameState.timeLeft)}</Text>
        </View>
        <TouchableOpacity style={styles.pauseButton} onPress={pauseGame}>
          <Text style={styles.pauseButtonText}>
            {gameState.isPaused ? '▶️' : '⏸️'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Goals */}
      <View style={styles.goalsContainer}>
        {gameState.goals.map((goal, index) => (
          <View key={index} style={styles.goalItem}>
            <Image 
              source={getElementImage(goal.element)} 
              style={styles.goalIcon}
            />
            <Text style={styles.goalText}>
              {goal.collected}/{goal.target}
            </Text>
            {goal.completed && <Text style={styles.completedIcon}>✅</Text>}
          </View>
        ))}
      </View>

      {/* Game Grid */}
      <View style={styles.gridContainer}>
        {gameState.grid.map((row, y) => (
          <View key={y} style={styles.gridRow}>
            {row.map((cell, x) => renderCell(cell))}
          </View>
        ))}
      </View>

      {/* Game Overlay */}
      {gameState.isPaused && (
        <View style={styles.pauseOverlay}>
          <Text style={styles.pauseText}>Game Paused</Text>
          <TouchableOpacity style={styles.resumeButton} onPress={pauseGame}>
            <Text style={styles.resumeButtonText}>Resume</Text>
          </TouchableOpacity>
        </View>
      )}
      </View>
    </BackgroundImage>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'rgba(30, 58, 138, 0.8)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  backButton: {
    backgroundColor: 'rgba(251, 191, 36, 0.2)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  backButtonText: {
    color: '#fbbf24',
    fontSize: 18,
    fontWeight: 'bold',
  },
  levelInfo: {
    flex: 1,
  },
  levelText: {
    color: '#fbbf24',
    fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  scoreText: {
    color: '#e2e8f0',
    fontSize: 16,
    fontWeight: '500',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(251, 191, 36, 0.2)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  timerIcon: {
    fontSize: 16,
    marginRight: 5,
  },
  timerText: {
    color: '#fbbf24',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  pauseButton: {
    backgroundColor: 'rgba(251, 191, 36, 0.2)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft: 10,
  },
  pauseButtonText: {
    color: '#fbbf24',
    fontSize: 16,
  },
  goalsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: 'rgba(30, 58, 138, 0.6)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  goalItem: {
    alignItems: 'center',
    flex: 1,
  },
  goalIcon: {
    width: 40,
    height: 40,
    marginBottom: 5,
    resizeMode: 'contain',
  },
  goalText: {
    color: '#e2e8f0',
    fontSize: 16,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  completedIcon: {
    fontSize: 16,
    marginTop: 2,
  },
  gridContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  gridRow: {
    flexDirection: 'row',
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    backgroundColor: 'rgba(30, 58, 138, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(251, 191, 36, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 1,
  },
  selectedCell: {
    backgroundColor: 'rgba(251, 191, 36, 0.5)',
    borderColor: '#fbbf24',
    borderWidth: 2,
  },
  matchedCell: {
    backgroundColor: 'rgba(34, 197, 94, 0.5)',
  },
  pauseOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pauseText: {
    color: '#fbbf24',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  resumeButton: {
    backgroundColor: '#fbbf24',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  resumeButtonText: {
    color: '#1e40af',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GameScreen;
