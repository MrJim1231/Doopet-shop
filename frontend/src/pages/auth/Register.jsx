import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/users`, form);
      setMessage("Регистрация успешна! Теперь войдите.");
      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      setMessage(err.response?.data?.message || "Ошибка регистрации");
    }
  };

  return (
    <form className="auth__form" onSubmit={handleSubmit}>
      {message && <p className="auth__message">{message}</p>}

      <input
        name="name"
        type="text"
        placeholder="Имя"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Пароль"
        value={form.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Зарегистрироваться</button>
    </form>
  );
}

export default Register;
