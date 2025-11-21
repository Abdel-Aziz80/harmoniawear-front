import { useEffect, useState } from "react";
import { listProducts } from "../services/products";

export default function useProducts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    listProducts().then(setData).catch(setError).finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
