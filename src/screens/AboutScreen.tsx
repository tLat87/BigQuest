import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Share,
  Alert,
  Image,
} from 'react-native';
import { NavigationContext, RootStackParamList } from '../../App';
import BackgroundImage from '../components/BackgroundImage';

const { width } = Dimensions.get('window');


const AboutScreen: React.FC = () => {
  const { navigate } = useContext(NavigationContext);

  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Check out Big Ocean Bass Quest! 🐟 A fun underwater match-3 game with amazing achievements and challenges!',
        title: 'Big Ocean Bass Quest',
      });
    } catch (error) {
      Alert.alert('Error', 'Unable to share at this time.');
    }
  };

  const gameFeatures = [
    {
      icon: require('../assets/img/fish/green.png'),
      title: 'Collect Fish',
      description: 'Match three or more colorful fish to collect them and complete your goals.',
      isImage: true
    },
    {
      icon: '🦗',
      title: 'Catch Dragonflies',
      description: 'Hunt down those elusive dragonflies that fly through the underwater world.',
      isImage: false
    },
    {
      icon: '🏅',
      title: 'Earn Achievements',
      description: 'Unlock progressive achievements as you collect more elements and complete levels.',
      isImage: false
    },
    {
      icon: '⏰',
      title: 'Beat the Timer',
      description: 'Complete your goals before time runs out to advance to the next level.',
      isImage: false
    },
    {
      icon: '🌟',
      title: 'Progressive Levels',
      description: 'Each level brings new challenges with increased difficulty and rewards.',
      isImage: false
    },
    {
      icon: '🎮',
      title: 'Fun Gameplay',
      description: 'Simple yet engaging match-3 mechanics with beautiful underwater visuals.',
      isImage: false
    }
  ];

  const achievements = [
    {
      icon: '🥉',
      title: 'Bronze Medal',
      description: 'Complete your first achievement level'
    },
    {
      icon: '🥈',
      title: 'Silver Medal',
      description: 'Reach intermediate achievement levels'
    },
    {
      icon: '🥇',
      title: 'Gold Medal',
      description: 'Master the highest achievement levels'
    }
  ];

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
          <Text style={styles.headerTitle}>About</Text>
          <Text style={styles.headerSubtitle}>Big Ocean Bass Quest</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Game Logo/Title */}
        <View style={styles.logoContainer}>
          <Image source={require('../assets/img/c972f508819cd933e04a25d379fb13c77000ecc7.png')} style={{width: 300, height: 300, borderRadius: 15}}/>
        </View>

        {/* Game Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Embark on an underwater adventure with Big Ocean Bass Quest! 
            Collect fish and dragonflies by matching them in rows of three or more. 
            Complete level challenges, unlock new achievements, and enjoy the magic of the ocean world!
          </Text>
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Game Features</Text>
        {gameFeatures.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            {feature.isImage ? (
              <Image source={feature.icon} style={styles.featureIcon} />
            ) : (
              <Text style={styles.featureEmoji}>{feature.icon}</Text>
            )}
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </View>
          </View>
        ))}
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievement System</Text>
          <Text style={styles.sectionDescription}>
            Progress through achievement levels by collecting specific elements. 
            Each achievement has multiple levels with increasing difficulty and better rewards.
          </Text>
          {achievements.map((achievement, index) => (
            <View key={index} style={styles.achievementItem}>
              <Text style={styles.achievementIcon}>{achievement.icon}</Text>
              <View style={styles.achievementContent}>
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
                <Text style={styles.achievementDescription}>{achievement.description}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* How to Play */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How to Play</Text>
          <View style={styles.howToPlayContainer}>
            <View style={styles.stepItem}>
              <Text style={styles.stepNumber}>1</Text>
              <Text style={styles.stepText}>Match three or more fish or dragonflies in a row</Text>
            </View>
            <View style={styles.stepItem}>
              <Text style={styles.stepNumber}>2</Text>
              <Text style={styles.stepText}>Complete the level goals before time runs out</Text>
            </View>
            <View style={styles.stepItem}>
              <Text style={styles.stepNumber}>3</Text>
              <Text style={styles.stepText}>Earn achievements and unlock new levels</Text>
            </View>
            <View style={styles.stepItem}>
              <Text style={styles.stepNumber}>4</Text>
              <Text style={styles.stepText}>Progress through increasingly challenging levels</Text>
            </View>
          </View>
        </View>

        {/* Share Button */}
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Text style={styles.shareButtonText}>Share Game</Text>
        </TouchableOpacity>

        {/* Version Info */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
          <Text style={styles.copyrightText}>© 2024 Big Ocean Bass Quest</Text>
        </View>
      </ScrollView>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  gameTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fbbf24',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 6,
    letterSpacing: 1,
  },
  gameSubtitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#60a5fa',
    textAlign: 'center',
    marginTop: -5,
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 6,
    letterSpacing: 1,
  },
  characterContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  character: {
    fontSize: 60,
    marginBottom: 10,
  },
  characterName: {
    fontSize: 16,
    color: '#e2e8f0',
    fontStyle: 'italic',
  },
  descriptionContainer: {
    backgroundColor: 'rgba(30, 58, 138, 0.3)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
  },
  description: {
    fontSize: 18,
    color: '#e2e8f0',
    textAlign: 'center',
    lineHeight: 28,
    fontWeight: '400',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fbbf24',
    marginBottom: 15,
    textAlign: 'center',
  },
  sectionDescription: {
    fontSize: 14,
    color: '#e2e8f0',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 58, 138, 0.2)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  featureIcon: {
    width: 40,
    height: 40,
    marginRight: 15,
    resizeMode: 'contain',
  },
  featureEmoji: {
    fontSize: 30,
    marginRight: 15,
    textAlign: 'center',
    width: 40,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fbbf24',
    marginBottom: 5,
  },
  featureDescription: {
    fontSize: 14,
    color: '#e2e8f0',
    lineHeight: 18,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 58, 138, 0.2)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  achievementIcon: {
    fontSize: 30,
    marginRight: 15,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fbbf24',
    marginBottom: 5,
  },
  achievementDescription: {
    fontSize: 14,
    color: '#e2e8f0',
    lineHeight: 18,
  },
  howToPlayContainer: {
    backgroundColor: 'rgba(30, 58, 138, 0.2)',
    borderRadius: 15,
    padding: 20,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  stepNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fbbf24',
    backgroundColor: 'rgba(251, 191, 36, 0.2)',
    width: 30,
    height: 30,
    borderRadius: 15,
    textAlign: 'center',
    lineHeight: 30,
    marginRight: 15,
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: '#e2e8f0',
    lineHeight: 20,
  },
  shareButton: {
    backgroundColor: '#fbbf24',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  shareButtonText: {
    color: '#1e40af',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  versionText: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 5,
  },
  copyrightText: {
    fontSize: 12,
    color: '#64748b',
  },
});

export default AboutScreen;

