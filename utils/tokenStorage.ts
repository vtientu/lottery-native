import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "access_token";

export const saveToken = async (token: string) => {
  try {
    const expireAt = Date.now() + 24 * 60 * 60 * 1000; // 1 ngày tính bằng ms
    const data = JSON.stringify({ token, expireAt });
    await AsyncStorage.setItem(TOKEN_KEY, data);
  } catch (error) {
    console.error("Error saving token", error);
  }
};

export const getToken = async () => {
  try {
    const data = await AsyncStorage.getItem(TOKEN_KEY);
    if (!data) return null;
    let tokenObj;
    try {
      tokenObj = JSON.parse(data);
    } catch {
      // Trường hợp cũ chỉ lưu token dạng string
      return data;
    }
    if (tokenObj.expireAt && Date.now() > tokenObj.expireAt) {
      await AsyncStorage.removeItem(TOKEN_KEY);
      return null; // Token đã hết hạn
    }
    return tokenObj.token;
  } catch (error) {
    console.error("Error getting token", error);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error("Error removing token", error);
  }
};
