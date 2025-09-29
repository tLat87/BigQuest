import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Image,
} from 'react-native';
import { NavigationContext, RootStackParamList } from '../../App';
import BackgroundImage from '../components/BackgroundImage';

const { width, height } = Dimensions.get('window');

const Onboarding2Screen: React.FC = () => {
  const { navigate } = useContext(NavigationContext);

  return (
    <BackgroundImage>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#1e3a8a" />
        
        {/* Header */}
       

        {/* Main content */}
        <View style={styles.content}>
          {/* Character card with game preview */}
          <View style={styles.characterCard}>
            <Image source={require('../assets/img/1745c73e8d0aa8a33c74efdea44b30f54093f321.png')} style={{ width: width * 0.8, height: 320, position: 'absolute'}} resizeMode='stretch' />
            <Image source={require('../assets/img/2.png')} style={{width: 300, height: 300}}/>
          </View>

          {/* Text content */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              Drag the elements to make three or more in a row.
            </Text>
            <Text style={styles.subtitle}>
              I will help you complete the level task - collect the required number of fish or hooks in time.
            </Text>
          </View>

          {/* Go button */}
          <TouchableOpacity
            style={styles.goButton}
            onPress={() => navigate('Onboarding3')}
          >
            <Text style={styles.goButtonText}>Go</Text>
          </TouchableOpacity>

          {/* Page indicator */}
          <View style={styles.indicator}>
            <View style={styles.indicatorDot} />
            <View style={[styles.indicatorDot, styles.activeDot]} />
            <View style={styles.indicatorDot} />
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
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  statusIcons: {
    flexDirection: 'row',
    gap: 10,
  },
  statusIcon: {
    color: '#ffffff',
    fontSize: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  characterCard: {
    backgroundColor: '#314D6E',
    borderRadius: 20,
    padding: 30,
    marginBottom: 40,
    width: width * 0.8,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    overflow: 'hidden',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  characterImage: {
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  characterContainer: {
    backgroundColor: '#1e3a8a',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minHeight: 200,
  },
  character: {
    fontSize: 60,
    marginBottom: 20,
  },
  gamePreview: {
    alignItems: 'center',
  },
  gameGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 120,
    justifyContent: 'center',
    gap: 5,
  },
  gameElement: {
    fontSize: 24,
    width: 35,
    height: 35,
    textAlign: 'center',
    lineHeight: 35,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 28,
  },
  subtitle: {
    fontSize: 16,
    color: '#e2e8f0',
    textAlign: 'center',
    lineHeight: 24,
  },
  goButton: {
    backgroundColor: '#60a5fa',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 60,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  goButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  indicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  indicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  activeDot: {
    backgroundColor: '#ffffff',
    width: 12,
    height: 8,
    borderRadius: 4,
  },
});

export default Onboarding2Screen;
