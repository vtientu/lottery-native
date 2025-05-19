import { useAuth } from "@/contexts/AuthContext";
import mainApiRequest from "@/services/mainApiRequest";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
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
import Toast from "react-native-toast-message";

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
      Toast.show({
        type: "success",
        text1: "Thành công",
        text2: "Bạn đã mua vé thành công.",
      });
      if (res.data && typeof res.data.balance === "number") {
        setUser({ ...user, balance: res.data.balance });
      }
      setTicketCode("");
      setQuantity("");
    } catch (error) {
      const err = error as any;
      const msg = err?.response?.data?.message || "Vui lòng thử lại.";
      Toast.show({
        type: "error",
        text1: "Thanh toán thất bại",
        text2: msg,
      });
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
        <Text style={styles.title}>🎫 Mua Vé Số</Text>
        <View style={styles.balanceBox}>
          <MaterialCommunityIcons
            name="wallet"
            size={22}
            color="#1976d2"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.balanceText}>Số dư:</Text>
          <Text style={styles.balanceAmount}>
            {user?.balance?.toLocaleString() || 0}đ
          </Text>
        </View>
        <View style={styles.card}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mã vé (6 chữ số):</Text>
            <View style={styles.inputWrapper}>
              <MaterialCommunityIcons
                name="numeric"
                size={20}
                color="#1976d2"
                style={styles.inputIcon}
              />
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
            <Text style={styles.inputHint}>
              * Vé số gồm 6 chữ số, ví dụ: 123456
            </Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Số lượng (1 - 99):</Text>
            <View style={styles.inputWrapper}>
              <Feather
                name="hash"
                size={20}
                color="#1976d2"
                style={styles.inputIcon}
              />
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
            <Text style={styles.inputHint}>
              * Mỗi vé 10.000đ, tối đa 99 vé/lần
            </Text>
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
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: "#f4f6fb",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#e60000",
    textAlign: "center",
    marginBottom: 28,
    letterSpacing: 1,
  },
  balanceBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e3f2fd",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginBottom: 24,
    alignSelf: "stretch",
    justifyContent: "center",
    shadowColor: "#1976d2",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  balanceText: {
    fontSize: 16,
    color: "#1976d2",
    fontWeight: "600",
    marginRight: 4,
  },
  balanceAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1976d2",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 28,
    width: "100%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
  },
  inputGroup: {
    marginBottom: 22,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#cfd8dc",
    paddingHorizontal: 10,
    marginBottom: 2,
  },
  inputIcon: {
    marginRight: 6,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: "#000",
    backgroundColor: "transparent",
  },
  inputHint: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
    marginLeft: 2,
  },
  button: {
    backgroundColor: "#e60000",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#e60000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});
