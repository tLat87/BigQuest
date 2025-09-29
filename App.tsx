import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import GameScreen from './src/screens/GameScreen';
import AchievementScreen from './src/screens/AchievementScreen';
import AboutScreen from './src/screens/AboutScreen';
import Onboarding1Screen from './src/screens/Onboarding1Screen';
import Onboarding2Screen from './src/screens/Onboarding2Screen';
import Onboarding3Screen from './src/screens/Onboarding3Screen';

// Types
export type RootStackParamList = {
  Onboarding1: undefined;
  Onboarding2: undefined;
  Onboarding3: undefined;
  Home: undefined;
  Game: undefined;
  Achievement: undefined;
  About: undefined;
};

// Simple navigation context
export const NavigationContext = React.createContext<{
  navigate: (screen: keyof RootStackParamList) => void;
  currentScreen: keyof RootStackParamList;
}>({
  navigate: () => {},
  currentScreen: 'Onboarding1',
});

function App() {
  const [currentScreen, setCurrentScreen] = useState<keyof RootStackParamList>('Onboarding1');

  const navigate = (screen: keyof RootStackParamList) => {
    setCurrentScreen(screen);
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'Onboarding1':
        return <Onboarding1Screen />;
      case 'Onboarding2':
        return <Onboarding2Screen />;
      case 'Onboarding3':
        return <Onboarding3Screen />;
      case 'Home':
        return <HomeScreen />;
      case 'Game':
        return <GameScreen />;
      case 'Achievement':
        return <AchievementScreen />;
      case 'About':
        return <AboutScreen />;
      default:
        return <Onboarding1Screen />;
    }
  };

  return (
    <View style={styles.container}>
      <NavigationContext.Provider value={{ navigate, currentScreen }}>
        {renderCurrentScreen()}
      </NavigationContext.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
});

export default App;