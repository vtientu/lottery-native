import useNews from "@/hooks/useNews";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function NewsDetailScreen() {
  const { id } = useLocalSearchParams();
  const { news } = useNews();
  const newsDetail = news.find((item: any) => item._id === id);

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: newsDetail?.image }} style={styles.image} />

      <View style={styles.contentContainer}>
        <Text style={styles.date}>
          {newsDetail?.createdAt
            ? new Date(newsDetail?.createdAt).toLocaleDateString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
            : ""}
        </Text>
        <Text style={styles.title}>{newsDetail?.title}</Text>
        <Text style={styles.content}>{newsDetail?.content}</Text>
      </View>
    </ScrollView>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: width,
    height: 220,
    resizeMode: "cover",
  },
  contentContainer: {
    padding: 16,
  },
  date: {
    color: "#999",
    fontSize: 14,
    marginBottom: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: "#444",
  },
});
