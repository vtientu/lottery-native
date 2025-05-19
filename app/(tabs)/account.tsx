import { useAuth } from "@/contexts/AuthContext";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AccountScreen() {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <MaterialIcons
          name="account-circle"
          size={64}
          color="#1976d2"
          style={{ marginBottom: 12 }}
        />
        <Text style={styles.username}>{user?.fullName || "Chưa có tên"}</Text>
        <View style={styles.infoRow}>
          <MaterialIcons
            name="email"
            size={20}
            color="#1976d2"
            style={styles.icon}
          />
          <Text style={styles.infoText}>{user?.email || "Chưa có email"}</Text>
        </View>
        <View style={styles.infoRow}>
          <Feather name="phone" size={20} color="#1976d2" style={styles.icon} />
          <Text style={styles.infoText}>
            {user?.phone || "Chưa có số điện thoại"}
          </Text>
        </View>
        <View style={styles.balanceBox}>
          <Text style={styles.balanceLabel}>Số dư</Text>
          <Text style={styles.balance}>
            {user?.balance?.toLocaleString() || 0}đ
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f6fb",
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 28,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 32,
    width: "100%",
    maxWidth: 350,
  },
  username: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1976d2",
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  icon: {
    marginRight: 8,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
  },
  balanceBox: {
    backgroundColor: "#e3f2fd",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginTop: 18,
    alignItems: "center",
    width: "100%",
  },
  balanceLabel: {
    fontSize: 14,
    color: "#1976d2",
    marginBottom: 2,
    fontWeight: "600",
  },
  balance: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1976d2",
  },
  logoutButton: {
    backgroundColor: "#e60000",
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 10,
    marginTop: 8,
    shadowColor: "#e60000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 2,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
    letterSpacing: 1,
  },
});
