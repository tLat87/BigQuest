import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Image } from 'react-native';
import { GameElement } from '../types/game';
import { getElementImage } from '../utils/gameLogic';

interface AnimatedElementProps {
  element: GameElement;
  size: number;
  isMatched?: boolean;
  isSelected?: boolean;
  onAnimationComplete?: () => void;
}

const AnimatedElement: React.FC<AnimatedElementProps> = ({
  element,
  size,
  isMatched = false,
  isSelected = false,
  onAnimationComplete,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const rotationAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isMatched) {
      // Match animation
      Animated.parallel([
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.2,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.timing(rotationAnim, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onAnimationComplete?.();
      });
    } else if (isSelected) {
      // Selection animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      // Reset animations
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(rotationAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isMatched, isSelected, scaleAnim, opacityAnim, rotationAnim, onAnimationComplete]);

  const spin = rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            { scale: scaleAnim },
            { rotate: spin },
          ],
          opacity: opacityAnim,
        },
      ]}
    >
      <Image 
        source={getElementImage(element)} 
        style={[styles.element, { width: size * 0.8, height: size * 0.8 }]}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  element: {
    resizeMode: 'contain',
  },
});

export default AnimatedElement;

