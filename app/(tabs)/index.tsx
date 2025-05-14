import useNews from "@/hooks/useNews";
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
  const { news } = useNews();
  const lotteryResults = [
    {
      id: 1,
      label: "Giải đặc biệt",
      value: ["12345"],
    },
    {
      id: 2,
      label: "Giải nhất",
      value: ["1234"],
    },
    {
      id: 3,
      label: "Giải nhì",
      value: ["123", "321"],
    },
    {
      id: 4,
      label: "Giải ba",
      value: ["123", "321", "123", "321"],
    },
    {
      id: 5,
      label: "Giải tư",
      value: ["12", "32", "12", "32", "12", "32"],
    },
  ];

  const newsData = [
    {
      id: 1,
      title: "Gần 3 triệu tài khoản tham gia xổ số qua điện thoại của Vietlott",
      description:
        "Qua gần 5 năm triển khai kênh phân phối xổ số qua điện thoại (ứng dụng hỗ trợ Vietlott SMS)...",
      image:
        "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      title: "Thêm 1 khách hàng nữa ở TP.HCM trúng Jackpot của Vietlott",
      description:
        "Liên tiếp từ đầu năm tới nay, cả ba khách hàng trúng thưởng vé số ở Vietlott đều ở TP.HCM.",
      image:
        "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      title:
        "Từng trúng số 6 triệu đồng, nay người đàn ông ở TP.HCM trúng Vietlott hơn 152 tỉ",
      description:
        "Anh N.V.N - một thuê bao MobiFone đến từ TP.HCM - đã nhận giải Jackpot xổ số tự chọn Mega 6/45...",
      image:
        "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

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
          <Text style={styles.balance}>100.000đ</Text>
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
              onPress={() => {
                router.push("/(ticket)/BuyScreen");
              }}
            />
            <Text style={styles.actionLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Kết quả xổ số */}
      <Text style={styles.heading}>Kết quả xổ số</Text>
      <View style={styles.table}>
        {lotteryResults.map((item, idx) => (
          <View style={styles.row} key={idx}>
            <Text style={styles.cell}>{item.label}</Text>
            <Text
              style={{
                ...styles.cellCenter,
                fontWeight: "bold",
                color: item.id === 1 ? "red" : "black",
              }}
            >
              {item.value.join(", ")}
            </Text>
          </View>
        ))}
      </View>
      <Text style={styles.heading}>Tin tức</Text>
      {news.map((news) => (
        <TouchableOpacity
          key={news._id}
          style={styles.newsCard}
          onPress={() => {
            router.push("/(news)/NewsDetailsScreen");
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
