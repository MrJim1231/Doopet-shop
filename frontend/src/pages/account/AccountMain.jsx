import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  User,
  Key,
  MapPin,
  Heart,
  Clock,
  FileText,
  Gift,
  CreditCard,
  Repeat,
  Mail,
} from "lucide-react";

function AccountMain() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className="account__sections">
      {/* Моя учетная запись */}
      <div className="account__section">
        <h3 className="account__subtitle">Моя учетная запись</h3>
        <div className="account__grid">
          <div className="account__card">
            <User className="account__icon" />
            <p>Изменить контактную информацию</p>
          </div>
          <div className="account__card">
            <Key className="account__icon" />
            <p>Изменить свой пароль</p>
          </div>
          <div className="account__card">
            <MapPin className="account__icon" />
            <p>Изменить мои адреса</p>
          </div>
          <div
            className="account__card account__card--link"
            onClick={() => navigate("/account/favorites")}
          >
            <Heart className="account__icon" />
            <p>Посмотреть закладки</p>
          </div>
        </div>
      </div>

      {/* Мои заказы */}
      <div className="account__section">
        <h3 className="account__subtitle">Мои заказы</h3>
        <div className="account__grid">
          <div
            className="account__card account__card--link"
            onClick={() => navigate("/account/orders")}
          >
            <Clock className="account__icon" />
            <p>История заказов</p>
          </div>
          <div className="account__card">
            <FileText className="account__icon" />
            <p>Файлы для скачивания</p>
          </div>
          <div className="account__card">
            <Gift className="account__icon" />
            <p>Бонусные баллы</p>
          </div>
          <div className="account__card">
            <CreditCard className="account__icon" />
            <p>История транзакций</p>
          </div>
          <div className="account__card">
            <Repeat className="account__icon" />
            <p>Периодические платежи</p>
          </div>
        </div>
      </div>

      {/* Подписка */}
      <div className="account__section">
        <h3 className="account__subtitle">Подписка</h3>
        <div className="account__grid">
          <div className="account__card">
            <Mail className="account__icon" />
            <p>Подписаться или отказаться от рассылки</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountMain;
