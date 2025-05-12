import { brandColors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();

  const handleStartCheckout = () => {
    router.push("/(sweet-cuts)/cart");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/sweet_cuts.png")}
        style={styles.logo}
      />
      <Text style={styles.text}>
        Some Informational text here before starting a new checkout.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleStartCheckout}>
        <Text style={styles.buttonText}>Start New Checkout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: brandColors.sky[900],
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: brandColors.neutral[50],
  },
  text: {
    textAlign: "center",
    paddingHorizontal: 50,
    fontSize: 16,
    marginBottom: 20,
    color: "black",
  },
  button: {
    backgroundColor: brandColors.sky[700],
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: brandColors.sky[50],
    fontSize: 16,
    fontWeight: "600",
  },
});
