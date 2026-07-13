# DooPet Shop 🐾 — Интернет-магазин зоотоваров

**Ссылка на работающий проект (демо)**: [https://doopet-shop-1.onrender.com/](https://doopet-shop-1.onrender.com/)

Верстка проекта выполнена в соответствии с дизайном по [макету Figma](https://www.figma.com/design/CVLyEjhmF70R7sOxF6vrFC/Doopet--Copy-?node-id=0-1&m=dev&t=RballIbtEBFhYXIq-1).

DooPet Shop — это полноценное full-stack веб-приложение (E-commerce) для продажи товаров для домашних животных. Проект состоит из серверной части на Node.js/Express и клиентского приложения на React (Vite).

---

## 🛠️ Стек технологий

*   **Frontend**: React 19, Vite, Axios, React Router, Sass (SCSS), Context API (для корзины и авторизации), React Toastify.
*   **Backend**: Node.js, Express, Mongoose, JWT (авторизация), nodemailer (отправка писем), multer (загрузка файлов/картинок), Cors.
*   **База данных**: MongoDB.

---

## 📂 Структура проекта

```text
DoopetFull/
├── backend/          # Серверная часть приложения (API на Express)
│   ├── controllers/  # Контроллеры для обработки бизнес-логики
│   ├── middleware/   # Промежуточное ПО (авторизация, загрузка файлов)
│   ├── models/       # Схемы данных Mongoose (MongoDB)
│   ├── routes/       # Маршруты API
│   ├── uploads/      # Папка для загруженных изображений
│   ├── server.js     # Точка входа бэкенда
│   └── .env          # Переменные окружения бэкенда (локальные)
├── frontend/         # Клиентская часть приложения (React + Vite)
│   ├── src/
│   │   ├── admin/       # Страницы управления (админка)
│   │   ├── components/  # Компоненты интерфейса (хиты, блоги, подписка)
│   │   ├── context/     # Контексты авторизации и корзины
│   │   ├── hooks/       # Пользовательские хуки (получение товаров/статей)
│   │   ├── layout/      # Общие элементы макета (шапка, подвал, сайдбары)
│   │   ├── pages/       # Основные страницы (продукт, профиль, корзина)
│   │   ├── utils/       # Вспомогательные функции (обработка путей изображений)
│   │   ├── main.jsx     # Точка входа React
│   │   └── App.jsx      # Маршрутизация и структура приложения
│   └── .env             # Переменные окружения фронтенда (локальные)
```

---

## 🚀 Быстрый старт (Локальный запуск)

Для работы приложения на вашем компьютере должны быть установлены **Node.js** и настроена база данных **MongoDB** (локально или через MongoDB Atlas).

### 1. Настройка и запуск бэкенда (backend)

1. Перейдите в папку бэкенда:
   ```bash
   cd backend
   ```
2. Установите зависимости:
   ```bash
   npm install
   ```
3. Создайте файл `.env` в корне папки `backend/` со следующими переменными:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster...mongodb.net/backend?retryWrites=true&w=majority
   JWT_SECRET=your_jwt_secret_key_here
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_app_password
   CLIENT_URL=http://localhost:5173/
   BASE_URL=http://localhost:5000
   ```
   *Параметры EMAIL нужны для функционала восстановления пароля и отправки уведомлений.*
4. Запустите сервер:
   ```bash
   npm run dev
   # или стандартный запуск: node server.js
   ```
   Сервер запустится на порту `5000` (`http://localhost:5000`).

---

### 2. Настройка и запуск фронтенда (frontend)

1. Перейдите в папку фронтенда:
   ```bash
   cd ../frontend
   ```
2. Установите зависимости:
   ```bash
   npm install
   ```
3. Создайте файл `.env` в корне папки `frontend/` со следующими переменными:
   ```env
   VITE_API_URL=http://localhost:5000
   ```
   *Для локальной работы VITE_API_URL должен указывать на локальный адрес бэкенда.*
4. Запустите клиент в режиме разработки:
   ```bash
   npm start
   # или: npm run dev
   ```
   Приложение откроется в браузере по адресу `http://localhost:5173`.

---

## 🌐 Деплой на Render

При размещении проекта на сервисе **Render** выполните следующие настройки:

### 1. Настройки бэкенда (Web Service)
*   **Root Directory**: `backend`
*   **Build Command**: `npm install`
*   **Start Command**: `node server.js`
*   **Environment Variables**:
    *   `MONGO_URI`: Строка подключения к MongoDB Atlas.
    *   `JWT_SECRET`: Секретный ключ для JWT.
    *   `BASE_URL`: Ссылка на ваш запущенный Web Service бэкенда (например, `https://doopet-shop-2.onrender.com`). *Это необходимо для корректного формирования путей к загруженным изображениям.*

### 2. Настройки фронтенда (Static Site)
*   **Root Directory**: `frontend`
*   **Build Command**: `npm run build`
*   **Publish Directory**: `dist`
*   **Environment Variables**:
    *   `VITE_API_URL`: Ссылка на бэкенд на Render (например, `https://doopet-shop-2.onrender.com`).

---

## 🔑 Основные API-эндпоинты (Бэкенд)

### Товары (Products)
*   `GET /api/products` — Получить список всех продуктов с фильтрацией и пагинацией.
*   `GET /api/products/:id` — Получить информацию об одном товаре.
*   `POST /api/products` — Создать товар (требует Multipart-Form для загрузки изображения).
*   `DELETE /api/products/:id` — Удалить товар.

### Категории (Categories)
*   `GET /api/categories` — Список категорий товаров.
*   `POST /api/categories` — Добавить категорию.
*   `DELETE /api/categories/:id` — Удалить категорию.

### Пользователи (Users / Auth)
*   `POST /api/users` — Регистрация нового пользователя.
*   `POST /api/users/login` — Вход и получение JWT-токена.
*   `GET /api/users/profile` — Получение профиля (требует Header `Authorization: Bearer <token>`).
*   `PUT /api/users/profile` — Обновление профиля.
