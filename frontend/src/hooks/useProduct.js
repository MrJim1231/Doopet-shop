import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const useProduct = (productId) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${API_URL}/api/products/${productId}`
        );

        // 🟢 Защита от пустого ответа или некорректной структуры
        const data = res?.data || {};

        // 🟢 Нормализуем описание — убираем лишние пробелы, если есть
        if (typeof data.description === "string") {
          data.description = data.description.trim();
        }

        setProduct(data);
        setError(null);
      } catch (err) {
        console.error("❌ Ошибка при загрузке товара:", err);
        setError("Не удалось загрузить товар. Попробуйте позже.");
      } finally {
        setLoading(false);
        window.scrollTo(0, 0);
      }
    };

    fetchProduct();
  }, [productId]);

  return { product, loading, error };
};
