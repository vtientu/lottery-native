import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

// Tạm thời hardcode dữ liệu (có thể nhận qua props hoặc navigation params)
const mockNews = {
  title: "Chuyến du lịch kỳ thú tại miền Trung Việt Nam",
  date: "13/05/2025",
  image:
    "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  content: `Miền Trung Việt Nam nổi tiếng với những bãi biển đẹp như tranh vẽ, di sản văn hóa thế giới và ẩm thực phong phú. 
    Trong hành trình lần này, du khách sẽ được khám phá Hội An cổ kính, Huế mộng mơ và Đà Nẵng sôi động. 
    
    Ngoài ra, đừng bỏ lỡ cơ hội thưởng thức các món ăn đặc sản như mì Quảng, bún bò Huế và cao lầu. 
    Đây chắc chắn là trải nghiệm không thể nào quên đối với mọi du khách yêu thích văn hóa và thiên nhiên.`,
};

export default function NewsDetailScreen() {
  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: mockNews.image }} style={styles.image} />

      <View style={styles.contentContainer}>
        <Text style={styles.date}>{mockNews.date}</Text>
        <Text style={styles.title}>{mockNews.title}</Text>
        <Text style={styles.content}>{mockNews.content}</Text>
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
