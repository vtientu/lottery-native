import { getMyTicketsService } from "@/services/purchase.service";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function MyTicketsScreen() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const data = await getMyTicketsService();
      setTickets(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchTickets();
    setRefreshing(false);
  };

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  if (!tickets.length) {
    return (
      <View style={styles.center}>
        <Text>Bạn chưa mua vé nào.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={tickets}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      renderItem={({ item }) => (
        <View style={styles.ticket}>
          <Text style={styles.numbers}>Mã vé: {item.numbers}</Text>
          <Text>Số lượng: {item.quantity}</Text>
          <Text>
            Trạng thái:{" "}
            <Text
              style={{
                color:
                  item.status === "won"
                    ? "green"
                    : item.status === "lost"
                    ? "red"
                    : "#888",
                fontWeight: "bold",
              }}
            >
              {item.status === "won"
                ? `Trúng (${item.prizeWon})`
                : item.status === "lost"
                ? "Không trúng"
                : "Chờ kết quả"}
            </Text>
          </Text>
          <Text>Mua lúc: {new Date(item.createdAt).toLocaleString()}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  ticket: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  numbers: { fontWeight: "bold", fontSize: 16, marginBottom: 4 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
