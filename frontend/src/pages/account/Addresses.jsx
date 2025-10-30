import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import Breadcrumbs from "../../layout/Breadcrumbs";
import SectionHeader from "../../components/SectionHeader";
import graphicIcon from "../../assets/icons/graphic-elements.svg";

function Addresses() {
  const { user, token } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    address: "",
    city: "",
    region: "",
    zip: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    fetchAddresses();
  }, [user]);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/addresses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAddresses(res.data);
    } catch (err) {
      console.error("❌ Ошибка при загрузке адресов:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    if (!newAddress.address || !newAddress.city) return;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/addresses",
        newAddress,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAddresses([...addresses, res.data]);
      setNewAddress({ address: "", city: "", region: "", zip: "" });
    } catch (err) {
      console.error("❌ Ошибка при добавлении адреса:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Удалить этот адрес?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/addresses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAddresses(addresses.filter((a) => a._id !== id));
    } catch (err) {
      console.error("❌ Ошибка при удалении адреса:", err);
    }
  };

  return (
    <div className="addresses-page">
      <section className="addresses">
        <div className="addresses__container">
          {loading ? (
            <p>Загрузка адресов...</p>
          ) : (
            <>
              {addresses.length === 0 ? (
                <p className="addresses__empty">Вы ещё не добавили адреса.</p>
              ) : (
                <ul className="addresses__list">
                  {addresses.map((addr) => (
                    <li key={addr._id} className="addresses__item">
                      <div className="addresses__info">
                        <p>
                          <strong>Адрес:</strong> {addr.address}
                        </p>
                        <p>
                          <strong>Город:</strong> {addr.city}
                        </p>
                        {addr.region && (
                          <p>
                            <strong>Регион:</strong> {addr.region}
                          </p>
                        )}
                        {addr.zip && (
                          <p>
                            <strong>Индекс:</strong> {addr.zip}
                          </p>
                        )}
                      </div>
                      <button
                        className="addresses__delete"
                        onClick={() => handleDelete(addr._id)}
                      >
                        Удалить
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {/* 🟢 Форма добавления адреса */}
              <form className="addresses__form" onSubmit={handleAddAddress}>
                <h4>Добавить новый адрес</h4>
                <input
                  type="text"
                  name="address"
                  placeholder="Адрес *"
                  value={newAddress.address}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="city"
                  placeholder="Город *"
                  value={newAddress.city}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="region"
                  placeholder="Регион / область"
                  value={newAddress.region}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="zip"
                  placeholder="Почтовый индекс"
                  value={newAddress.zip}
                  onChange={handleChange}
                />
                <button type="submit" className="addresses__add-btn">
                  Добавить адрес
                </button>
              </form>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default Addresses;
