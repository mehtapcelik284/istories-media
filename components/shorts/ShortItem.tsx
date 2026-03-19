import { Ionicons } from "@expo/vector-icons";
import { VideoView, useVideoPlayer } from "expo-video";
import { memo, useEffect, useRef, useState } from "react";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { shortVideoUrl } from "@/constants/shorts";
import { SCREEN } from "@/utils/responsive";

type Props = {
  id: string;
  isActive: boolean;
  muted: boolean;
  itemHeight: number;
  onToggleMute: () => void;
};

export const ShortItem = memo(function ShortItem({
  id,
  isActive,
  muted,
  itemHeight,
  onToggleMute,
}: Props) {
  const [paused, setPaused] = useState(false);
  const [showTapIcon, setShowTapIcon] = useState(false);
  const insets = useSafeAreaInsets();

  const isActiveRef = useRef(isActive);
  isActiveRef.current = isActive;

  // Overlay hides the blank/black state before the first frame arrives.
  // It is removed instantly (no fade) to avoid any visible flicker.
  // Once removed it never comes back — frozen last frame is shown while inactive.
  const overlayOpacity = useSharedValue(1);
  const revealedRef = useRef(false);

  const reveal = () => {
    if (revealedRef.current) return;
    revealedRef.current = true;
    overlayOpacity.value = 0; // instant — no fade = no flicker
  };

  const player = useVideoPlayer(shortVideoUrl(id), (p) => {
    p.loop = true;
  });

  // Reveal as soon as the video has a frame ready to show.
  // On Android we wait for playingChange (isPlaying:true) so we know ExoPlayer
  // has actually pushed a frame to the SurfaceView before lifting the overlay.
  // On iOS readyToPlay is enough.
  useEffect(() => {
    if (Platform.OS === "android") {
      const sub = player.addListener("playingChange", ({ isPlaying }) => {
        if (isPlaying && isActiveRef.current) reveal();
      });
      return () => sub.remove();
    }

    if (player.status === "readyToPlay") {
      reveal();
      return;
    }
    const sub = player.addListener("statusChange", ({ status }) => {
      if (status === "readyToPlay") reveal();
    });
    return () => sub.remove();
  }, [player]);

  // Android pre-render: play briefly when the video is ready but off-screen so
  // ExoPlayer paints a frame onto the SurfaceView. Combined with
  // removeClippedSubviews={false} on the FlatList, this frame survives until the
  // user scrolls to it, preventing the black flash on swipe.
  useEffect(() => {
    if (Platform.OS !== "android") return;
    const sub = player.addListener("statusChange", ({ status }) => {
      if (status !== "readyToPlay" || isActiveRef.current) return;
      player.play();
      setTimeout(() => {
        if (!isActiveRef.current) player.pause();
      }, 300);
    });
    return () => sub.remove();
  }, [player]);

  // When active: resume and ensure overlay is gone if already loaded.
  useEffect(() => {
    if (isActive) {
      setPaused(false);
      if (revealedRef.current) overlayOpacity.value = 0;
    }
  }, [isActive]);

  // Play / pause.
  useEffect(() => {
    if (isActive && !paused) {
      player.play();
    } else {
      player.pause();
    }
  }, [isActive, paused, player]);

  // Inactive players are always muted to prevent off-screen audio bleed.
  useEffect(() => {
    player.muted = isActive ? muted : true;
  }, [isActive, muted, player]);

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
  }));

  const handleTap = () => {
    setPaused((p) => !p);
    setShowTapIcon(true);
    setTimeout(() => setShowTapIcon(false), 700);
  };

  return (
    <View style={[styles.container, { height: itemHeight }]}>
      <Pressable style={StyleSheet.absoluteFill} onPress={handleTap}>
        <VideoView
          player={player}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          nativeControls={false}
          surfaceType="textureView"
        />
      </Pressable>

      {showTapIcon && (
        <Animated.View
          entering={FadeIn.duration(100)}
          exiting={FadeOut.duration(400)}
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
        >
          <View style={styles.tapIconWrap}>
            <Ionicons
              name={paused ? "play" : "pause"}
              size={72}
              color="rgba(255,255,255,0.85)"
            />
          </View>
        </Animated.View>
      )}

      {/* Loading overlay — removed instantly on first frame, never resets */}
      <Animated.View
        style={[StyleSheet.absoluteFill, styles.overlay, overlayStyle]}
        pointerEvents="none"
      />

      <View style={[styles.controls, { bottom: insets.bottom + 24 }]}>
        <Pressable onPress={onToggleMute} hitSlop={12} style={styles.iconBtn}>
          <Ionicons
            name={muted ? "volume-mute" : "volume-high"}
            size={22}
            color="white"
          />
        </Pressable>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: SCREEN.width,
    backgroundColor: "#000",
  },
  overlay: {
    backgroundColor: "#000",
  },
  tapIconWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  controls: {
    position: "absolute",
    right: 16,
    alignItems: "center",
    gap: 12,
  },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
  },
});
