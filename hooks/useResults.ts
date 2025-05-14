import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { getResults } from "../services/result.service";

const useResults = () => {
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchResults = async () => {
    try {
      const response = await getResults();
      setResults(response.results);
      setLoading(false);
    } catch (error: any) {
      Alert.alert("Failed to fetch results:", error?.response?.data?.message);
      console.error("Failed to fetch results:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  return { results, loading };
};

export default useResults;
