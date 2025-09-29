import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import { NavigationContext, RootStackParamList } from '../../App';
import BackgroundBubbles from '../components/BackgroundBubbles';
import BackgroundImage from '../components/BackgroundImage';

const { width, height } = Dimensions.get('window');

const HomeScreen: React.FC = () => {
  const { navigate } = useContext(NavigationContext);

  return (
    <BackgroundImage>
      <ScrollView style={styles.container}>
        {/* Background with underwater theme */}
        

        {/* Main content */}
        <View style={styles.content}>
          {/* Main card with character and game preview */}
        <View style={styles.mainCard}>
          {/* Character */}
          <Image source={require('../assets/img/main.png')} style={styles.mainImage} />
        </View>

        {/* Game description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.gameDescription}>
            Arrange the same elements — fish or dragonflies — in a row of three or more to make them disappear from the field. Complete the level's tasks: collect the required number of elements within the allotted time and unlock new achievements!
          </Text>
        </View>

        {/* Start button */}
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => navigate('Game')}
        >
          <Text style={styles.startButtonText}>Start</Text>
        </TouchableOpacity>

        {/* Bottom navigation icons */}
        <View style={styles.bottomNavigation}>
          <TouchableOpacity
            style={styles.navIcon}
            onPress={() => navigate('Game')}
          >
            <Image source={require('../assets/img/game.png')} style={styles.navIconImage}/>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.navIcon}
            onPress={() => navigate('Achievement')}
          >
            <Image source={require('../assets/img/achi.png')} style={styles.navIconImage}/>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.navIcon}
            onPress={() => navigate('About')}
          >
            <Image source={require('../assets/img/info.png')} style={styles.navIconImage}/>
          </TouchableOpacity>
        </View>
        </View>
        <View style={{marginBottom: 100}}/>
      </ScrollView>
    </BackgroundImage>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: 'transparent',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#0c4a6e',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  mainCard: {
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  mainImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  characterSection: {
    flex: 1,
    alignItems: 'center',
  },
  character: {
    fontSize: 80,
  },
  gamePreview: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 120,
    height: 120,
  },
  previewElement: {
    fontSize: 24,
    width: 40,
    height: 40,
    textAlign: 'center',
    lineHeight: 40,
  },
  highlightedElement: {
    backgroundColor: 'rgba(251, 191, 36, 0.3)',
    borderRadius: 8,
  },
  descriptionContainer: {
    backgroundColor: 'rgba(30, 58, 138, 0.6)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  gameDescription: {
    fontSize: 16,
    color: '#e2e8f0',
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '400',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  startButton: {
    backgroundColor: '#60a5fa',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 60,
    marginBottom: 40,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  startButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    letterSpacing: 0.5,
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    alignItems: 'center',
    // paddingHorizontal: 40,
  },
  navIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(30, 58, 138, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  navIconImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  navIconEmoji: {
    fontSize: 40,
    textAlign: 'center',
  },
});

export default HomeScreen;
