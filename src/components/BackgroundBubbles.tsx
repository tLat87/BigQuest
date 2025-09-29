import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

interface BubbleProps {
  delay: number;
  size: number;
  x: number;
  duration: number;
}

const Bubble: React.FC<BubbleProps> = ({ delay, size, x, duration }) => {
  const translateY = useRef(new Animated.Value(height + size)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateBubble = () => {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: -size,
          duration: duration,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 0.6,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: duration - 1000,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => {
        // Reset and restart animation
        translateY.setValue(height + size);
        opacity.setValue(0);
        setTimeout(animateBubble, delay);
      });
    };

    const timer = setTimeout(animateBubble, delay);
    return () => clearTimeout(timer);
  }, [delay, duration, translateY, opacity, size]);

  return (
    <Animated.View
      style={[
        styles.bubble,
        {
          left: x,
          width: size,
          height: size,
          transform: [{ translateY }],
          opacity,
        },
      ]}
    />
  );
};

const BackgroundBubbles: React.FC = () => {
  const bubbles = [
    { delay: 0, size: 20, x: width * 0.1, duration: 8000 },
    { delay: 2000, size: 15, x: width * 0.3, duration: 10000 },
    { delay: 4000, size: 25, x: width * 0.6, duration: 12000 },
    { delay: 1000, size: 18, x: width * 0.8, duration: 9000 },
    { delay: 3000, size: 22, x: width * 0.2, duration: 11000 },
    { delay: 5000, size: 16, x: width * 0.7, duration: 8500 },
    { delay: 1500, size: 30, x: width * 0.4, duration: 13000 },
    { delay: 3500, size: 12, x: width * 0.9, duration: 7000 },
  ];

  return (
    <View style={styles.container}>
      {bubbles.map((bubble, index) => (
        <Bubble
          key={index}
          delay={bubble.delay}
          size={bubble.size}
          x={bubble.x}
          duration={bubble.duration}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
  bubble: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
});

export default BackgroundBubbles;


