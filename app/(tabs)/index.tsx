import { useAuth } from "@/contexts/AuthContext";
import useNews from "@/hooks/useNews";
import useResults from "@/hooks/useResults";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const { user } = useAuth();
  const { news } = useNews();
  const { results } = useResults();

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
            <Text style={styles.username}>{user?.fullName}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.balance}>
            {user?.balance?.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </Text>
        </View>
      </View>

      {/* Quick actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity
          style={styles.actionItem}
          onPress={() => {
            router.push("/(ticket)/BuyScreen");
          }}
        >
          <MaterialCommunityIcons name={"cash-plus"} size={28} color="#fff" />
          <Text style={styles.actionLabel}>Mua vé</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionItem}
          onPress={() => {
            router.push("/(ticket)/MyPurchase");
          }}
        >
          <MaterialCommunityIcons name={"cash-minus"} size={28} color="#fff" />
          <Text style={styles.actionLabel}>Vé của tôi</Text>
        </TouchableOpacity>
      </View>

      {/* Kết quả xổ số */}
      {results ? (
        <>
          <Text style={styles.heading}>Kết quả xổ số</Text>
          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.cell}>Giải đặc biệt</Text>
              <Text
                style={{
                  ...styles.cellCenter,
                  fontWeight: "bold",
                  color: "red",
                }}
              >
                {results?.prizes?.jackpot?.join(", ")}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cell}>Giải nhất</Text>
              <Text
                style={{
                  ...styles.cellCenter,
                  fontWeight: "bold",
                }}
              >
                {results?.prizes?.first?.join(", ")}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cell}>Giải nhất</Text>
              <Text
                style={{
                  ...styles.cellCenter,
                  fontWeight: "bold",
                }}
              >
                {results?.prizes?.second?.join(", ")}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cell}>Giải ba</Text>
              <Text
                style={{
                  ...styles.cellCenter,
                  fontWeight: "bold",
                }}
              >
                {results?.prizes?.third?.join(", ")}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cell}>Giải tư</Text>
              <Text
                style={{
                  ...styles.cellCenter,
                  fontWeight: "bold",
                }}
              >
                {results?.prizes?.fourth?.join(", ")}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cell}>Giải năm</Text>
              <Text
                style={{
                  ...styles.cellCenter,
                  fontWeight: "bold",
                }}
              >
                {results?.prizes?.fifth?.join(", ")}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cell}>Giải sáu</Text>
              <Text
                style={{
                  ...styles.cellCenter,
                  fontWeight: "bold",
                }}
              >
                {results?.prizes?.sixth?.join(", ")}
              </Text>
            </View>
          </View>
        </>
      ) : (
        <Text style={styles.heading}>Chưa có kết quả</Text>
      )}
      <Text style={styles.heading}>Tin tức</Text>
      {news.map((news) => (
        <TouchableOpacity
          key={news._id}
          style={styles.newsCard}
          onPress={() => {
            router.push({
              pathname: "/(news)/NewsDetailsScreen",
              params: { id: news._id },
            });
          }}
        >
          <View style={styles.newsImageWrapper}>
            <Image source={{ uri: news.image }} style={styles.newsImage} />
          </View>
          <View style={styles.newsContent}>
            <Text style={styles.newsTitle}>{news.title}</Text>
            <Text style={styles.newsDescription} numberOfLines={2}>
              {news.content}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
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
  newsCard: {
    flexDirection: "row",
    alignItems: "stretch",
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    overflow: "hidden",
    elevation: 2,
  },
  newsImageWrapper: {
    width: 100,
  },
  newsImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    flex: 1,
  },
  newsContent: {
    flex: 1,
    padding: 8,
    justifyContent: "center",
  },
  newsTitle: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 4,
  },
  newsDescription: {
    fontSize: 12,
    color: "#555",
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
  cellCenter: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    textAlign: "center",
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
