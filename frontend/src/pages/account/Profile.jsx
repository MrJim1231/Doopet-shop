import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import graphicIcon from "../../assets/icons/graphic-elements.svg";
import SectionHeader from "../../components/SectionHeader";

function Profile() {
  const { user, token, logout } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.put(
        "http://localhost:5000/api/users/profile",
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("✅ Данные успешно обновлены!", {
        position: "bottom-right",
      });
      console.log("📦 Обновленный профиль:", res.data);
    } catch (err) {
      console.error("❌ Ошибка при обновлении профиля:", err);
      toast.error("❌ Не удалось обновить данные", {
        position: "bottom-right",
      });

      // если токен недействителен
      if (err.response?.status === 401 || err.response?.status === 403) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="profile__unauthorized">
        <p>⚠️ Пожалуйста, авторизуйтесь, чтобы редактировать профиль.</p>
      </div>
    );
  }

  return (
    <section className="profile">
      <div className="profile__container">
        <form className="profile__form" onSubmit={handleSubmit}>
          <div className="profile__field">
            <label>Имя</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Ваше имя"
              required
            />
          </div>

          <div className="profile__field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Ваш email"
              required
            />
          </div>

          <div className="profile__field">
            <label>Телефон</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+380..."
            />
          </div>

          <div className="profile__field">
            <label>Адрес доставки</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Ваш адрес"
            />
          </div>

          <button type="submit" className="profile__btn" disabled={loading}>
            {loading ? "Сохраняем..." : "Сохранить изменения"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Profile;
