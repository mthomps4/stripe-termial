import { useCurrentUser } from "@/contexts/CurrentUserProvider";
import { logout } from "@/utils/auth";
import { Stack, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

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
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Complete Your Registration" }} />
      <Text style={styles.title}>Complete Your Registration</Text>
      <Text style={styles.message}>
        Please login on desktop to complete your Stripe Onboarding
      </Text>

      <Button title="Logout" onPress={() => logoutUser()} />
    </View>
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
