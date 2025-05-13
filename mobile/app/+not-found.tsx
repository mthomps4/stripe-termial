import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { brandColors } from "@/constants/Colors";

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Oops!" }} />
      <Text style={styles.title}>This screen does not exist.</Text>
      <Link href="/" style={styles.link}>
        <Text style={styles.linkText}>Go to home screen!</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
  },
  linkText: {
    lineHeight: 30,
    fontSize: 16,
    color: brandColors.sky[700],
  },
});
