# Big Ocean Bass Quest 🐟

A beautiful underwater-themed match-3 puzzle game built with React Native. Dive into the deep ocean and collect colorful fish and dragonflies by matching three or more in a row!

## 🌊 Game Features

- **Classic Match-3 Gameplay**: Match three or more fish and dragonflies to clear them from the board
- **Underwater Theme**: Beautiful ocean-themed visuals with animated bubbles
- **Progressive Levels**: Each level brings new challenges with increasing difficulty
- **Achievement System**: Unlock achievements by collecting specific elements
- **Timer Challenge**: Complete your goals before time runs out
- **Animated Elements**: Smooth animations for matches and interactions
- **Multiple Element Types**: Collect different fish species and dragonflies

## 🎮 How to Play

1. **Match Elements**: Tap and drag to swap adjacent fish or dragonflies
2. **Create Matches**: Form lines of three or more identical elements
3. **Complete Goals**: Collect the required number of each element type
4. **Beat the Timer**: Finish before time runs out to advance
5. **Earn Achievements**: Progress through achievement levels by collecting elements

## 🏆 Achievement System

The game features a progressive achievement system:

- **Fish Collector**: Collect green fish to unlock bronze, silver, and gold medals
- **Clownfish Master**: Master the art of collecting clownfish
- **Dragonfly Hunter**: Hunt down those elusive dragonflies

Each achievement has multiple levels with increasing targets and better rewards.

## 🛠️ Technical Features

- **React Native**: Cross-platform mobile development
- **TypeScript**: Type-safe development
- **React Navigation**: Smooth navigation between screens
- **Animated API**: Smooth animations and transitions
- **Gesture Handling**: Touch and drag interactions
- **Modular Architecture**: Clean, maintainable code structure

## 📱 Screens

- **Home Screen**: Welcome screen with game introduction
- **Game Screen**: Main gameplay with grid and goals
- **Achievement Screen**: Track your progress and unlocked achievements
- **About Screen**: Game information and features

## 🚀 Getting Started

### Prerequisites

- Node.js (>= 18)
- React Native development environment
- iOS Simulator or Android Emulator

### Installation

1. Install dependencies:
```bash
npm install
```

2. For iOS:
```bash
cd ios && pod install && cd ..
npm run ios
```

3. For Android:
```bash
npm run android
```

## 🎨 Customization

The game uses emojis for elements, but you can easily replace them with custom images:

1. Add your images to the `assets` folder
2. Update the `ELEMENT_EMOJIS` constant in `src/types/game.ts`
3. Replace emoji usage with `Image` components

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AnimatedElement.tsx
│   └── BackgroundBubbles.tsx
├── screens/            # App screens
│   ├── HomeScreen.tsx
│   ├── GameScreen.tsx
│   ├── AchievementScreen.tsx
│   └── AboutScreen.tsx
├── types/              # TypeScript type definitions
│   └── game.ts
└── utils/              # Game logic and utilities
    └── gameLogic.ts
```

## 🎯 Game Logic

The game features sophisticated match-3 logic:

- **Grid Generation**: Random element placement with no initial matches
- **Match Detection**: Horizontal and vertical match detection
- **Element Dropping**: Gravity-based element falling
- **Goal Tracking**: Progress tracking for each element type
- **Achievement Updates**: Automatic achievement progression

## 🌟 Future Enhancements

- Custom element images and animations
- Sound effects and background music
- Power-ups and special elements
- Multiplayer mode
- Cloud save functionality
- More achievement types
- Daily challenges

## 📄 License

This project is created for educational purposes. Feel free to use and modify as needed.

---

Dive deep and enjoy the underwater adventure! 🐠🦗🌊