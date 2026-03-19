import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useCallback, useRef, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  View,
  type LayoutChangeEvent,
  type ViewToken,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { SHORTS_IDS } from "@/constants/shorts";
import { SCREEN } from "@/utils/responsive";
import { ShortItem } from "./ShortItem";

export function ShortsPlayer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [muted, setMuted] = useState(false);
  // Use the actual measured height of the list container so items always fill
  // the screen exactly — Dimensions.get('window') excludes nav bar on Android.
  const [itemHeight, setItemHeight] = useState(SCREEN.height);
  const insets = useSafeAreaInsets();

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    const h = e.nativeEvent.layout.height;
    if (h > 0) setItemHeight(h);
  }, []);

  const toggleMute = useCallback(() => setMuted((m) => !m), []);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setActiveIndex(viewableItems[0].index);
      }
    },
    [],
  );

  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: { itemVisiblePercentThreshold: 50 },
      onViewableItemsChanged,
    },
  ]);

  const renderItem = useCallback(
    ({ item, index }: { item: string; index: number }) => (
      <ShortItem
        id={item}
        isActive={index === activeIndex}
        muted={muted}
        itemHeight={itemHeight}
        onToggleMute={toggleMute}
      />
    ),
    [activeIndex, muted, itemHeight, toggleMute],
  );

  return (
    <View style={styles.container} onLayout={onLayout}>
      <FlatList
        data={SHORTS_IDS}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        getItemLayout={(_, index) => ({
          length: itemHeight,
          offset: itemHeight * index,
          index,
        })}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        initialNumToRender={2}
        maxToRenderPerBatch={2}
        windowSize={3}
        removeClippedSubviews={false}
        decelerationRate="fast"
      />

      <Pressable
        style={[styles.closeBtn, { top: insets.top + 8 }]}
        onPress={() => router.back()}
        hitSlop={12}
      >
        <Ionicons name="close" size={26} color="white" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  closeBtn: {
    position: "absolute",
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
  },
});
