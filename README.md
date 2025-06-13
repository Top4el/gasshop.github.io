# GasShop - Веб-сайт газового магазина

Современный веб-сайт для газового магазина с адаптивным дизайном и интерактивным интерфейсом.

## Особенности

- Современный адаптивный дизайн
- Интерактивный пользовательский интерфейс
- Анимации и плавные переходы
- Мобильная версия
- Контактная форма
- API для продуктов и услуг

## Технологии

- Frontend:
  - HTML5
  - CSS3
  - JavaScript (ES6+)
  - Font Awesome для иконок

- Backend:
  - Python 3.8+
  - Flask
  - REST API

## Установка

1. Клонируйте репозиторий:
```bash
git clone https://github.com/Dogar/gasshop.git
cd gasshop
```

2. Создайте виртуальное окружение Python:
```bash
python -m venv venv
```

3. Активируйте виртуальное окружение:
- Windows:
```bash
venv\Scripts\activate
```
- Linux/Mac:
```bash
source venv/bin/activate
```

4. Установите зависимости:
```bash
pip install -r requirements.txt
```

## Запуск

1. Запустите Flask-сервер:
```bash
python app.py
```

2. Откройте браузер и перейдите по адресу:
```
http://localhost:5000
```

## Структура проекта

```
gasshop/
├── app.py              # Основной файл сервера
├── requirements.txt    # Зависимости Python
├── static/            # Статические файлы
│   ├── css/
│   ├── js/
│   └── images/
├── templates/         # HTML шаблоны
└── README.md         # Документация
```

## Разработка

- Для изменения стилей отредактируйте файл `static/css/styles.css`
- Для изменения JavaScript функционала отредактируйте файл `static/js/script.js`
- Для изменения HTML шаблонов отредактируйте файлы в директории `templates/`

## Лицензия

MIT License 