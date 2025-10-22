import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function CategoryProducts() {
  const { id } = useParams(); // id категории
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, [id]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/products?category=${id}`
      );
      setProducts(res.data);
    } catch (error) {
      console.error("Ошибка при загрузке продуктов:", error);
    }
  };

  return (
    <div>
      <h2>Продукты категории</h2>
      {products.map((p) => (
        <div key={p._id}>
          <h3>{p.name}</h3>
          <p>Цена: {p.price} грн</p>
        </div>
      ))}
    </div>
  );
}

export default CategoryProducts;
