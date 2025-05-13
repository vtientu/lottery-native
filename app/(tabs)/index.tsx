import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const lotteryResults = {
    special: "12345",
    first: "1234",
    second: ["123", "321"],
  };
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.profileInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>H</Text>
          </View>
          <View>
            <Text style={styles.welcome}>Xin chào!</Text>
            <Text style={styles.username}>NGUYỄN</Text>
            <Text style={styles.subText}>TK Hạn mức dự thưởng</Text>
          </View>
        </View>
        <View>
          <Text style={styles.balance}>54.000đ</Text>
        </View>
      </View>

      {/* Quick actions */}
      <View style={styles.quickActions}>
        {[
          { icon: "gift-outline", label: "Giải thưởng" },
          { icon: "cash-plus", label: "Mua vé" },
          { icon: "cash-minus", label: "Vé của tôi" },
        ].map((item, idx) => (
          <TouchableOpacity key={idx} style={styles.actionItem}>
            <MaterialCommunityIcons
              name={item.icon as any}
              size={28}
              color="#fff"
            />
            <Text style={styles.actionLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Kết quả xổ số */}
      <Text style={styles.heading}>Kết quả xổ số</Text>
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.cell}>Giải đặc biệt</Text>
          <Text style={{ ...styles.cell, fontWeight: "bold", color: "red" }}>
            {lotteryResults.special}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cell}>Giải nhất</Text>
          <Text style={styles.cell}>{lotteryResults.first}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cell}>Giải nhì</Text>
          <Text style={styles.cell}>{lotteryResults.second.join(", ")}</Text>
        </View>
      </View>
      {/* Power 6/55 */}
      <View style={styles.drawCard}>
        <Text style={styles.drawTitle}>Kỳ QSMT: 03/10/2023</Text>
        <Text style={styles.money}>
          Jackpot 1 ước tính:{" "}
          <Text style={{ fontWeight: "bold" }}>87.320.545.500đ</Text>
        </Text>
        <Text style={styles.money}>
          Jackpot 2 ước tính:{" "}
          <Text style={{ fontWeight: "bold" }}>3.000.000.000đ</Text>
        </Text>
        <Text style={styles.countdown}>Thời gian 01:56:53</Text>
      </View>

      {/* Max 3D */}
      <View style={styles.drawCard}>
        <Text style={styles.drawTitle}>Kỳ QSMT: 04/10/2023</Text>
        <Text style={styles.money}>Max 3D / Max 3D+</Text>
        <Text style={styles.countdown}>Thời gian 25:56:53</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    backgroundColor: "#f2a900",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  avatarText: {
    color: "#fff",
    fontWeight: "bold",
  },
  welcome: {
    fontSize: 14,
    color: "#666",
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subText: {
    fontSize: 12,
    color: "#999",
  },
  balance: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#e60000",
  },
  table: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  cell: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#e60000",
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
  actionItem: {
    alignItems: "center",
    flex: 1,
  },
  actionLabel: {
    color: "#fff",
    fontSize: 12,
    marginTop: 4,
  },
  banner: {
    backgroundColor: "#ffcc00",
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  bannerText: {
    flex: 1,
    fontWeight: "600",
  },
  bannerHighlight: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#e60000",
  },
  bannerImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },
  lotteryCard: {
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  mascot: {
    width: 60,
    height: 60,
    marginRight: 12,
  },
  lotteryInfo: {
    flex: 1,
  },
  drawId: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },
  resultRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 4,
  },
  resultBall: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#ff9933",
    justifyContent: "center",
    alignItems: "center",
  },
  resultText: {
    color: "#fff",
    fontWeight: "bold",
  },
  countdown: {
    fontSize: 12,
    color: "#555",
  },
  drawCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  drawTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  money: {
    fontSize: 13,
    marginBottom: 2,
  },
});
