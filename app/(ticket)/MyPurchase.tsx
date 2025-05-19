import { getMyTicketsService } from "@/services/purchase.service";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function MyPurchaseScreen() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const data = await getMyTicketsService();
      setTickets(data?.purchases);
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
        <MaterialCommunityIcons
          name="ticket-confirmation"
          size={48}
          color="#bdbdbd"
          style={{ marginBottom: 8 }}
        />
        <Text style={{ color: "#888", fontSize: 16 }}>
          Bạn chưa mua vé nào.
        </Text>
      </View>
    );
  }

  const renderStatus = (status: string, prizeWon?: string) => {
    if (status === "won")
      return (
        <View style={styles.statusRow}>
          <MaterialCommunityIcons
            name="trophy"
            size={18}
            color="#43a047"
            style={{ marginRight: 4 }}
          />
          <Text style={[styles.statusText, { color: "#43a047" }]}>
            Trúng{prizeWon ? ` (${prizeWon})` : ""}
          </Text>
        </View>
      );
    if (status === "lost")
      return (
        <View style={styles.statusRow}>
          <MaterialCommunityIcons
            name="close-circle"
            size={18}
            color="#e53935"
            style={{ marginRight: 4 }}
          />
          <Text style={[styles.statusText, { color: "#e53935" }]}>
            Không trúng
          </Text>
        </View>
      );
    return (
      <View style={styles.statusRow}>
        <Feather
          name="clock"
          size={16}
          color="#888"
          style={{ marginRight: 4 }}
        />
        <Text style={[styles.statusText, { color: "#888" }]}>Chờ kết quả</Text>
      </View>
    );
  };

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
          <View style={styles.row}>
            <MaterialCommunityIcons
              name="ticket-confirmation"
              size={28}
              color="#1976d2"
              style={{ marginRight: 10 }}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.numbers}>
                Mã vé: <Text style={{ color: "#1976d2" }}>{item?.numbers}</Text>
              </Text>
              <Text style={styles.quantity}>Số lượng: {item?.quantity}</Text>
            </View>
            {/* {renderStatus(item?.status, item?.prizeWon)} */}
          </View>
          <View style={styles.row2}>
            <Feather
              name="calendar"
              size={16}
              color="#888"
              style={{ marginRight: 6 }}
            />
            <Text style={styles.date}>
              {item?.createdAt
                ? new Date(item?.createdAt).toLocaleString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "Chưa mua"}
            </Text>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 18,
    backgroundColor: "#f4f6fb",
    minHeight: "100%",
    flexGrow: 1,
  },
  ticket: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#1976d2",
    shadowOpacity: 0.07,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  row2: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  numbers: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 2,
    color: "#222",
  },
  quantity: {
    fontSize: 15,
    color: "#555",
    marginBottom: 2,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
  },
  statusText: {
    fontWeight: "bold",
    fontSize: 14,
  },
  date: {
    fontSize: 13,
    color: "#888",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f6fb",
  },
});
