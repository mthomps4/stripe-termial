import { StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { useCurrentUser } from "@/contexts/CurrentUserProvider";
import { Redirect } from "expo-router";

export default function HomeScreen() {
  const { user } = useCurrentUser();

  if (!user) {
    return <Redirect href="/account" />;
  }

  return (
    <View style={styles.mainContainer}>
      <ThemedText type="title">Welcome!</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
