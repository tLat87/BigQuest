import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { NavigationContext, RootStackParamList } from '../../App';
import { Achievement, AchievementLevel, GameElement } from '../types/game';
import { getElementImage, getElementName } from '../utils/gameLogic';
import BackgroundImage from '../components/BackgroundImage';

const { width } = Dimensions.get('window');


const AchievementScreen: React.FC = () => {
  const { navigate } = useContext(NavigationContext);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  useEffect(() => {
    // Load achievements from storage or create default ones
    const defaultAchievements: Achievement[] = [
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
        isUnlocked: true,
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
        isUnlocked: true,
        levels: [
          { level: 1, target: 20, completed: false, reward: 'Dragonfly Badge' },
          { level: 2, target: 100, completed: false, reward: 'Dragonfly Expert' },
          { level: 3, target: 200, completed: false, reward: 'Dragonfly Legend' }
        ]
      }
    ];
    
    // Validate achievements before setting
    const validAchievements = defaultAchievements.filter(achievement => 
      achievement && 
      achievement.element
    );
    
    setAchievements(validAchievements);
    if (validAchievements.length > 0) {
      setSelectedAchievement(validAchievements[0]);
    }
  }, []);

  const renderAchievementCard = (achievement: Achievement) => {
    if (!achievement || !achievement.element) {
      return null;
    }
    
    const isSelected = selectedAchievement?.id === achievement.id;
    const currentLevel = achievement.levels[achievement.currentLevel];
    const progress = currentLevel ? (achievement.currentLevel * 25) : 0;

    return (
      <TouchableOpacity
        key={achievement.id}
        style={[
          styles.achievementCard,
          isSelected && styles.selectedCard,
          !achievement.isUnlocked && styles.lockedCard,
        ]}
        onPress={() => setSelectedAchievement(achievement)}
        disabled={!achievement.isUnlocked}
      >
        <View style={styles.cardHeader}>
          <Image 
            source={getElementImage(achievement.element)} 
            style={styles.achievementIcon}
          />
          <View style={styles.cardInfo}>
            <Text style={[
              styles.achievementName,
              !achievement.isUnlocked && styles.lockedText
            ]}>
              {achievement.name}
            </Text>
            <Text style={[
              styles.achievementDescription,
              !achievement.isUnlocked && styles.lockedText
            ]}>
              {achievement.description}
            </Text>
          </View>
          {achievement.isUnlocked && (
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${progress}%` }]} />
              </View>
              <Text style={styles.progressText}>
                Level {achievement.currentLevel + 1}/3
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderLevelDetails = (achievement: Achievement) => {
    if (!achievement || !achievement.element) return null;

    return (
        <View style={styles.detailsContainer}>
        <Text style={styles.levelDetailsTitle}>Achievement Levels</Text>
        {achievement.levels.map((level, index) => (
          <View
            key={index}
            style={[
              styles.levelItem,
              index === achievement.currentLevel && styles.currentLevel,
              level.completed && styles.completedLevel,
            ]}
          >
            <View style={styles.levelHeader}>
              <Text style={styles.levelNumber}>Level {level.level}</Text>
              <Text style={styles.levelTarget}>
                {level.target} {getElementName(achievement.element)}
              </Text>
            </View>
            <View style={styles.levelReward}>
              <Text style={styles.rewardText}>Reward: {level.reward}</Text>
              {level.completed && <Text style={styles.completedIcon}>✅</Text>}
            </View>
          </View>
        ))}
      </View>
    );
  };

    return (
      <BackgroundImage>
        <View style={styles.container}>
          {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigate('Home')}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Achievements</Text>
          <Text style={styles.headerSubtitle}>Track your progress and unlock rewards</Text>
        </View>
      </View>

      {/* Achievements List */}
      <ScrollView style={styles.achievementsList} showsVerticalScrollIndicator={false}>
        {achievements.length > 0 ? achievements.map(achievement => renderAchievementCard(achievement)) : (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading achievements...</Text>
          </View>
        )}
      </ScrollView>

      {/* Level Details */}
      {selectedAchievement && (
        <View style={styles.detailsContainer}>
          {renderLevelDetails(selectedAchievement)}
        </View>
      )}

      {/* Stats Summary */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {achievements.filter(a => a.isUnlocked).length}
          </Text>
          <Text style={styles.statLabel}>Unlocked</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {achievements.reduce((total, a) => 
              total + a.levels.filter(l => l.completed).length, 0
            )}
          </Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {achievements.length}
          </Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
      </View>
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'rgba(30, 58, 138, 0.8)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  backButton: {
    backgroundColor: 'rgba(251, 191, 36, 0.2)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 15,
  },
  backButtonText: {
    color: '#fbbf24',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fbbf24',
    marginBottom: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#e2e8f0',
    fontWeight: '400',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  achievementsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  achievementCard: {
    backgroundColor: '#5E94D4',
    borderRadius: 15,
    padding: 15,
    marginVertical: 8,
    borderWidth: 2,
    borderColor: 'rgba(251, 191, 36, 0.3)',
  },
  selectedCard: {
    borderColor: '#fbbf24',
    backgroundColor: '#314D6E',
  },
  lockedCard: {
    opacity: 0.5,
    borderColor: 'rgba(100, 116, 139, 0.3)',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  achievementIcon: {
    width: 50,
    height: 50,
    marginRight: 15,
    resizeMode: 'contain',
  },
  cardInfo: {
    flex: 1,
  },
  achievementName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fbbf24',
    marginBottom: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  achievementDescription: {
    fontSize: 16,
    color: '#e2e8f0',
    fontWeight: '400',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  lockedText: {
    color: '#64748b',
  },
  progressContainer: {
    alignItems: 'center',
  },
  progressBar: {
    width: 60,
    height: 8,
    backgroundColor: 'rgba(100, 116, 139, 0.3)',
    borderRadius: 4,
    marginBottom: 5,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#fbbf24',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#e2e8f0',
  },
  detailsContainer: {
    backgroundColor: '#5E94D4',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 15,
    padding: 20,
  },
  levelDetailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fbbf24',
    marginBottom: 15,
    textAlign: 'center',
  },
  levelItem: {
    backgroundColor: 'rgba(30, 58, 138, 0.3)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(251, 191, 36, 0.3)',
  },
  currentLevel: {
    borderColor: '#fbbf24',
    backgroundColor: 'rgba(251, 191, 36, 0.1)',
  },
  completedLevel: {
    borderColor: '#22c55e',
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
  },
  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  levelNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fbbf24',
  },
  levelTarget: {
    fontSize: 14,
    color: '#e2e8f0',
  },
  levelReward: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rewardText: {
    fontSize: 14,
    color: '#e2e8f0',
  },
  completedIcon: {
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#1e3a8a',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fbbf24',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#e2e8f0',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  loadingText: {
    color: '#e2e8f0',
    fontSize: 16,
  },
});

export default AchievementScreen;

