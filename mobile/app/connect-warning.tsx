import { useCurrentUser } from "@/contexts/CurrentUserProvider";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ConnectWarning() {
  const { user } = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (!user || !user.is_merchant) {
      router.replace("/");
    }
  }, [user, router]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Complete Your Registration</Text>
      <Text style={styles.message}>
        Please login on desktop to complete your Stripe Onboarding
      </Text>
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
