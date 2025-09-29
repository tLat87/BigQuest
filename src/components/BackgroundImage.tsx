import React from 'react';
import { ImageBackground, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

interface BackgroundImageProps {
  children: React.ReactNode;
  imageSource?: any; // Можно передать require() или {uri: ''}
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({ 
  children, 
  imageSource 
}) => {
  // Подводное изображение для игры
  const defaultBackground = 
     require('../assets/img/bg.png')
  

  return (
    <ImageBackground
      source={imageSource || defaultBackground}
      style={styles.backgroundImage}
      resizeMode="cover"
      imageStyle={styles.imageStyle}
    >
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: width,
    height: height,
  },
  imageStyle: {
    // opacity: 0.4, // Делаем фон полупрозрачным, чтобы контент был читаемым
  },
});

export default BackgroundImage;
