import { Routes } from "@/constants/routes";
import { Colors } from "@/theme/colors";
import { Radius } from "@/theme/metrics";
import { FontSize, FontWeight } from "@/theme/typography";
import { router, type Href } from "expo-router";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={() => router.push(Routes.shorts as Href)}
      >
        <Text style={styles.buttonText}>{t("home.open_shorts")}</Text>
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
