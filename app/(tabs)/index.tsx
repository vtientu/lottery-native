import { useAuth } from "@/contexts/AuthContext";
import useNews from "@/hooks/useNews";
import useResults from "@/hooks/useResults";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
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
import { WebView } from "react-native-webview";

export default function HomeScreen() {
  const { user } = useAuth();
  const { news } = useNews();
  const { results } = useResults();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 32 }}
    >
      {/* Header */}
      <View style={styles.headerWrap}>
        <View style={styles.header}>
          <View style={styles.profileInfo}>
            <View style={styles.avatar}>
              <FontAwesome name="user" size={24} color="#fff" />
            </View>
            <View>
              <Text style={styles.welcome}>Xin chào!</Text>
              <Text style={styles.username}>{user?.fullName}</Text>
            </View>
          </View>
          <View style={styles.balanceBox}>
            <MaterialCommunityIcons
              name="wallet"
              size={20}
              color="#1976d2"
              style={{ marginRight: 6 }}
            />
            <Text style={styles.balanceAmount}>
              {user?.balance?.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </Text>
          </View>
        </View>
      </View>

      {/* Quick actions */}
      <View style={styles.quickActionsWrap}>
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.actionItem}
            onPress={() => {
              router.push("/(ticket)/BuyScreen");
            }}
          >
            <MaterialCommunityIcons name={"cash-plus"} size={32} color="#fff" />
            <Text style={styles.actionLabel}>Mua vé</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionItem}
            onPress={() => {
              router.push("/(ticket)/MyPurchase");
            }}
          >
            <MaterialCommunityIcons
              name={"ticket-confirmation"}
              size={32}
              color="#fff"
            />
            <Text style={styles.actionLabel}>Vé của tôi</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Kết quả xổ số */}
      <View style={styles.lotteryCard}>
        <Text style={styles.lotteryTitle}>Kết quả xổ số miền Bắc</Text>
        <View style={styles.webviewWrap}>
          <WebView
            source={{ uri: "https://xskt.com.vn/xsmb" }}
            onError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              console.error("❌ WebView error: ", nativeEvent);
            }}
            onLoadEnd={() => {
              console.log("✅ WebView loaded");
            }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            originWhitelist={["*"]}
            style={{ borderRadius: 16, overflow: "hidden" }}
          />
        </View>
      </View>

      {/* Tin tức */}
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
  container: {
    backgroundColor: "#f4f6fb",
    paddingHorizontal: 0,
    paddingTop: 0,
  },
  headerWrap: {
    backgroundColor: "#fff",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingBottom: 18,
    paddingTop: 40,
    paddingHorizontal: 20,
    shadowColor: "#1976d2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
    marginBottom: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 44,
    height: 44,
    backgroundColor: "#1976d2",
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    shadowColor: "#1976d2",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 2,
  },
  welcome: {
    fontSize: 14,
    color: "#666",
  },
  username: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#222",
  },
  balanceBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e3f2fd",
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 18,
    shadowColor: "#1976d2",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  balanceAmount: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#1976d2",
  },
  quickActionsWrap: {
    paddingHorizontal: 20,
    marginTop: 8,
    marginBottom: 18,
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#e60000",
    padding: 16,
    borderRadius: 18,
    shadowColor: "#e60000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.13,
    shadowRadius: 10,
    elevation: 5,
  },
  actionItem: {
    alignItems: "center",
    flex: 1,
  },
  actionLabel: {
    color: "#fff",
    fontSize: 14,
    marginTop: 6,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  lotteryCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 24,
    shadowColor: "#1976d2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  lotteryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#e60000",
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  webviewWrap: {
    height: 1200,
    borderRadius: 16,
    overflow: "hidden",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 12,
    marginLeft: 20,
    color: "#1976d2",
    letterSpacing: 0.5,
  },
  newsCard: {
    flexDirection: "row",
    alignItems: "stretch",
    marginBottom: 18,
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    elevation: 3,
    marginHorizontal: 20,
    shadowColor: "#1976d2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  newsImageWrapper: {
    width: 110,
    height: 90,
    backgroundColor: "#f4f6fb",
  },
  newsImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    flex: 1,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  newsContent: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
  },
  newsTitle: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 6,
    color: "#222",
  },
  newsDescription: {
    fontSize: 13,
    color: "#555",
  },
});
