import { useAuth } from "@/contexts/AuthContext";
import mainApiRequest from "@/services/mainApiRequest";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function BuyScreen() {
  const [ticketCode, setTicketCode] = useState("");
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useAuth();

  const handleBuy = async () => {
    if (!/^[0-9]{6}$/.test(ticketCode)) {
      Alert.alert("Lỗi", "Vui lòng nhập đúng 6 chữ số.");
      return;
    }
    const qty = parseInt(quantity, 10);
    if (!quantity || isNaN(qty) || qty < 1 || qty > 99) {
      Alert.alert("Lỗi", "Vui lòng nhập số lượng từ 1 đến 99.");
      return;
    }
    const totalCost = qty * 10000;
    if (user && user.balance < totalCost) {
      Alert.alert("Thanh toán thất bại", "Số dư không đủ để mua vé");
      return;
    }
    setLoading(true);
    try {
      const res = await mainApiRequest.post("/purchase", {
        numbers: ticketCode,
        quantity: qty,
      });
      Alert.alert("Thành công", "Bạn đã mua vé thành công.");
      if (res.data && typeof res.data.balance === "number") {
        setUser({ ...user, balance: res.data.balance });
      }
      setTicketCode("");
      setQuantity("");
    } catch (error) {
      const err = error as any;
      const msg = err?.response?.data?.message || "Vui lòng thử lại.";
      Alert.alert("Thanh toán thất bại", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>🎫 Mua Vé</Text>
        <Text style={styles.balance}>
          Số dư: {user?.balance?.toLocaleString()}đ
        </Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Mã vé (6 chữ số):</Text>
          <TextInput
            style={styles.input}
            value={ticketCode}
            onChangeText={(text) => {
              const cleaned = text.replace(/[^0-9]/g, "").slice(0, 6);
              setTicketCode(cleaned);
            }}
            placeholder="Nhập mã vé"
            keyboardType="numeric"
            maxLength={6}
            editable={!loading}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Số lượng (1 - 99):</Text>
          <TextInput
            style={styles.input}
            value={quantity}
            onChangeText={(text) => {
              const cleaned = text.replace(/[^0-9]/g, "").slice(0, 2);
              setQuantity(cleaned);
            }}
            placeholder="Số lượng"
            keyboardType="numeric"
            maxLength={2}
            editable={!loading}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.6 }]}
          onPress={handleBuy}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Mua vé ngay</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#e60000",
    textAlign: "center",
    marginBottom: 40,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#000",
  },
  button: {
    backgroundColor: "#e60000",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
  balance: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1976d2",
    marginBottom: 16,
    textAlign: "center",
  },
});
