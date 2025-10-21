# Categories

Создать категорию POST - http://localhost:5000/api/categories

{
"name": "Электроника",
"description": "Все виды электроники",
"image": "https://example.com/path/to/image.jpg"
}

# Products

Создать продукт POST - http://localhost:5000/api/products

{
"name": "Продукт 1",
"description": "Описание продукта",
"price": 100,
"stock": 50,
"categoryId": "68a09deb81bd254bb9d92bfc",
"image": "https://example.com/path/to/image.jpg"
}

Получить все продукты GET - http://localhost:5000/api/products
Получение одного продукта GET - http://localhost:5000/products/{id}
Обновление одного продукта GET - http://localhost:5000/products/{id}

{
"name": "Новый продукт",
"description": "Новое описание продукта",
"price": 120,
"category": "Новая категория"
}

Удаление одного продукта DELETE - http://localhost:5000/products/{id}

# Users

Создать пользователя POST - http://localhost:5000/api/users
Установить библиотеки npm install bcryptjs jsonwebtoken

{
"name": "John Doe",
"email": "john@example.com",
"password": "123456",
"role": "user"
}

Получить всех пользователей GET - http://localhost:5000/api/users
Получить пользователя GET - http://localhost:5000/api/users{id}
Обновление пользователя PUT - http://localhost:5000/api/users{id}

{
"name": "Oleh Doe",
"email": "oleh111@example.com",
"password": "123456",
"role": "user"
}

Удалить пользователя DELETE - http://localhost:5000/api/users{id}
