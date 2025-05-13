import { brandColors } from "@/constants/Colors";
import { useCurrentUser } from "@/contexts/CurrentUserProvider";
import { logout } from "@/utils/auth";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link, router } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SettingsScreen() {
  const { user, setToken, setUser } = useCurrentUser();

  const logoutUser = async () => {
    await logout();
    setToken(null);
    setUser(null);
    router.replace("/login");
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.welcomeText}>
          Welcome Back, {user?.first_name} {user?.last_name}
        </Text>
        <Text style={styles.stripeText}>
          Stripe: {user?.stripe_account_id || "Not Connected"}
        </Text>
        <TouchableOpacity
          onPress={() => logoutUser()}
          style={styles.logoutButton}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />
      <View style={styles.section}>
        <TouchableOpacity style={styles.sectionItem}>
          <MaterialIcons
            size={28}
            name="bluetooth"
            color={brandColors.neutral[900]}
          />
          <Link href="/settings/manage-devices" style={styles.sectionItemText}>
            Manage Devices
          </Link>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: brandColors.neutral[300],
    marginVertical: 20,
  },
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
  logoutButton: {
    backgroundColor: brandColors.sky[700],
    padding: 10,
    borderRadius: 5,
  },
  logoutButtonText: {
    textAlign: "center",
    color: brandColors.neutral[50],
    fontSize: 16,
    fontWeight: "bold",
  },
  section: {
    flexDirection: "column",
    gap: 10,
  },
  sectionItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  sectionItemText: {
    fontSize: 16,
    color: brandColors.neutral[900],
  },
  iconColor: {
    color: brandColors.neutral[900],
  },
});
