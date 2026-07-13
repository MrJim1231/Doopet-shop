import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/users/login`, {
        email,
        password,
      });
      login(res.data.token, res.data.user);
    } catch (err) {
      setError(err.response?.data?.message || "Ошибка входа");
    }
  };

  return (
    <form className="auth__form" onSubmit={handleSubmit}>
      {error && <p className="auth__error">{error}</p>}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">Войти</button>
    </form>
  );
}

export default Login;
