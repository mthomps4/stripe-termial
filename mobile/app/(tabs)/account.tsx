import { ThemedText } from "@/components/ThemedText";
import { useCurrentUser } from "@/contexts/CurrentUserProvider";
import { logout } from "@/utils/auth";
import { router } from "expo-router";
import { Button, StyleSheet, View } from "react-native";

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
      <ThemedText>Hello</ThemedText>
      <ThemedText>{user?.email}</ThemedText>
      <ThemedText>{user?.stripe_account_id}</ThemedText>

      <Button title="Logout" onPress={() => logoutUser()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
