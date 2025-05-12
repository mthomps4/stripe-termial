import React, { useEffect } from "react";
import { useCurrentUser } from "@/contexts/CurrentUserProvider";
import { logout } from "@/utils/auth";
import { Stack, useRouter } from "expo-router";
import { Button, StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

export default function ConnectWarning() {
  const { user, setToken, setUser } = useCurrentUser();
  const router = useRouter();

  const logoutUser = async () => {
    setToken(null);
    setUser(null);
    await logout();
    router.replace("/login");
  };

  useEffect(() => {
    if (!user || !user.is_merchant) {
      router.replace("/");
    }
  }, [user, router]);

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: "Complete Your Registration" }} />
      <ThemedText style={styles.title}>Complete Your Registration</ThemedText>
      <ThemedText style={styles.message}>
        Please login on desktop to complete your Stripe Onboarding
      </ThemedText>

      <Button title="Logout" onPress={() => logoutUser()} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
  },
});
