import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { brandColors } from "@/constants/Colors";
import { useCart } from "@/contexts/CartProvider";

export default function CheckoutScreen() {
  const { items, total } = useCart();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backLink}>
        <Ionicons name="arrow-back" size={12} color={brandColors.navy[700]} />
        <Text style={styles.backLinkText}>Manage Cart</Text>
      </TouchableOpacity>
      <View style={styles.summaryContainer}>
        <ThemedText type="title" style={styles.summaryTitle}>
          Order Summary
        </ThemedText>

        {items.map((item) => (
          <View key={item.product.id} style={styles.itemRow}>
            <View style={styles.itemNameContainer}>
              <ThemedText style={styles.itemName}>
                {item.product.name}
              </ThemedText>
              <ThemedText style={styles.quantity}>x{item.quantity}</ThemedText>
            </View>
            <View style={styles.quantityPrice}>
              <ThemedText style={styles.price}>
                ${(item.product.price * item.quantity).toFixed(2)}
              </ThemedText>
            </View>
          </View>
        ))}

        <View style={styles.divider} />

        <View style={styles.totalRow}>
          <ThemedText style={styles.totalLabel}>Total</ThemedText>
          <ThemedText style={styles.totalAmount}>
            ${total.toFixed(2)}
          </ThemedText>
        </View>

        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => {
            // TODO: Implement checkout logic
            alert("Checkout functionality coming soon!");
          }}
        >
          <ThemedText style={styles.checkoutButtonText}>
            Complete Purchase
          </ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  backLinkText: {
    color: brandColors.navy[700],
  },
  container: {
    flex: 1,
    padding: 16,
  },
  summaryContainer: {
    flex: 1,
    padding: 16,
  },
  summaryTitle: {
    marginBottom: 16,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  itemNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  quantityPrice: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantity: {
    marginRight: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
  },
  divider: {
    height: 1,
    backgroundColor: brandColors.navy[200],
    marginVertical: 16,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  checkoutButton: {
    backgroundColor: brandColors.lime[500],
    padding: 16,
    borderRadius: 8,
  },
  checkoutButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
