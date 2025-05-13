import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const lotteryResults = {
  special: "12345",
  first: "1234",
  second: ["123", "321"],
};

const newsList = [
  { id: "1", title: "Giải độc đắc Vietlott lên tới 50 tỷ đồng" },
  { id: "2", title: "Người trúng giải 12345 chia sẻ bí quyết chọn số" },
  { id: "3", title: "Lịch mở thưởng Vietlott tuần này" },
];

export default function HomeScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 20, marginTop: 20 }}
    >
      <Text style={styles.title}>Lottery</Text>
      {/* Kết quả xổ số */}
      <Text style={styles.heading}>Kết quả xổ số</Text>
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.cell}>Giải đặc biệt</Text>
          <Text style={styles.cell}>{lotteryResults.special}</Text>
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

      {/* Tin tức */}
      <Text style={styles.heading}>Tin tức</Text>
      {newsList.map((news) => (
        <View key={news.id} style={styles.newsItem}>
          <Text style={styles.newsText}>• {news.title}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  inputRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
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
  ticket: {
    fontSize: 16,
    paddingVertical: 4,
    paddingLeft: 10,
  },
  newsItem: {
    paddingVertical: 6,
  },
  newsText: {
    fontSize: 15,
  },
});
