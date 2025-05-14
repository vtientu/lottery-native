import { useState } from "react";

const useResults = () => {
  const [results, setResults] = useState<
    {
      _id: string;
      title: string;
      content: string;
      createdAt: string;
      updatedAt: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);
};

export default useResults;
