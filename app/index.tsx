import { Colors } from "@/theme/colors";
import { Radius } from "@/theme/metrics";
import { FontSize, FontWeight } from "@/theme/typography";
import { router, type Href } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={() => router.push("/shorts" as Href)}
      >
        <Text style={styles.buttonText}>Open Shorts</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background.primary,
  },
  button: {
    backgroundColor: Colors.brand.primary,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: Radius.lg,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: Colors.brand.contrast,
    fontSize: FontSize.regular,
    fontWeight: FontWeight.semibold,
  },
});
