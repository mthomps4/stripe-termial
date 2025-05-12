import { brandColors } from "@/constants/Colors";
import { useCurrentUser } from "@/contexts/CurrentUserProvider";
import { logout } from "@/utils/auth";
import { router } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function AccountScreen() {
  const { user, setToken, setUser } = useCurrentUser();

  const logoutUser = async () => {
    await logout();
    setToken(null);
    setUser(null);
    router.replace("/login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        Welcome Back, {user?.first_name} {user?.last_name}
      </Text>
      <Text style={styles.stripeText}>
        Stripe: {user?.stripe_account_id || "Not Connected"}
      </Text>

      <View style={styles.buttonContainer}>
        <Button title="Logout" onPress={() => logoutUser()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: brandColors.neutral[50],
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: brandColors.sky[900],
  },
  stripeText: {
    fontSize: 16,
    marginBottom: 20,
    color: brandColors.sky[700],
  },
  buttonContainer: {
    position: "absolute",
    bottom: 100,
    left: 20,
    right: 20,
  },
});
