import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function ChangePassword() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return setError("Новые пароли не совпадают");
    }

    try {
      const res = await axios.post(
        `${API_URL}/api/password/change`, // ✅ абсолютный путь
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(res.data.message);
      setError("");
      setTimeout(() => navigate("/account"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Ошибка при смене пароля");
      setSuccess("");
    }
  };

  return (
    <div className="change">
      <h2 className="change__password-title">Изменить пароль</h2>

      <form onSubmit={handleSubmit} className="change__password-form">
        {error && (
          <div className="change__password-message change__password-message--error">
            {error}
          </div>
        )}
        {success && (
          <div className="change__password-message change__password-message--success">
            {success}
          </div>
        )}

        <div className="change__password-field">
          <label className="change__password-label">Текущий пароль</label>
          <input
            type="password"
            className="change__password-input"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>

        <div className="change__password-field">
          <label className="change__password-label">Новый пароль</label>
          <input
            type="password"
            className="change__password-input"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <div className="change__password-field">
          <label className="change__password-label">
            Подтвердите новый пароль
          </label>
          <input
            type="password"
            className="change__password-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="change__password-btn">
          Сменить пароль
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;
