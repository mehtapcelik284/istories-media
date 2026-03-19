# IStoriesMedia — Shorts Video Player Demo

A React Native / Expo demo showcasing a TikTok-style vertical shorts video player. The home screen contains a single button that opens the full-screen shorts feed.

## Tech stack

| | |
|---|---|
| Framework | Expo SDK 54 (React Native 0.81, New Architecture) |
| Video | expo-video 3.x with `textureView` surface on Android |
| Navigation | Expo Router v6 (file-based) |
| Animations | React Native Reanimated 4 |
| i18n | i18next + react-i18next |

## Prerequisites

- Node.js 20+
- For Android: Android Studio + an Android device or emulator (API 24+)
- For iOS: Xcode 16+ and CocoaPods (`gem install cocoapods`)

## Setup

```bash
npm install
```

## Running on Android

### First-time build (native build required)

```bash
npx expo run:android
```

This compiles the native code and installs the debug APK on the connected device or emulator. Takes a few minutes on first run.

### Subsequent runs (JS-only changes)

Start Metro bundler:

```bash
npx expo start
```

Then press `a` in the Metro terminal, or open the already-installed app on your device and it will connect automatically.

### Real device

Enable USB Debugging on your Android device and connect via USB before running the command above. Confirm the device is detected:

```bash
adb devices
```

### Notes

- Test on a **real device** when possible — video hardware decoding is unavailable on emulators, which can cause sluggish playback and visual artifacts.
- The build targets `arm64-v8a` and `armeabi-v7a` by default.

## Running on iOS

### First-time build (native build required)

```bash
npx expo run:ios
```

This installs Pods (if needed) and builds the app on the iOS Simulator or a connected device.

### Subsequent runs (JS-only changes)

```bash
npx expo start
```

Then press `i` in the Metro terminal.

### Clean build (if pod install fails)

```bash
rm -rf ios/Pods ios/Podfile.lock ios/build
npx expo run:ios
```

## App flow

1. Home screen → tap **Open Shorts**
2. Full-screen vertical video feed opens
3. Swipe up/down to navigate between videos
4. Tap the video to pause/resume
5. Tap the speaker icon (bottom-right) to mute/unmute
6. Tap **✕** (top-left) to close

## Project structure

```
app/
  index.tsx          # Home screen
  shorts.tsx         # Shorts screen (full-screen modal)
  _layout.tsx        # Root layout
components/
  shorts/
    ShortsPlayer.tsx # FlatList container, paging, active-index tracking
    ShortItem.tsx    # Single video item with overlay and pre-render logic
constants/
  shorts.ts          # Video IDs and URL helper
  routes.ts          # Typed route constants
locales/
  en.json            # English strings (i18n)
utils/
  i18n.ts            # i18next setup
  responsive.ts      # Screen dimensions and scale helpers
theme/               # Colors, typography, spacing tokens
```
