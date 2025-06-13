from flask import Flask, render_template, request, jsonify
import os

app = Flask(__name__)

# Конфигурация
app.config['SECRET_KEY'] = 'your-secret-key-here'  # Замените на реальный секретный ключ

# Маршруты
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.json
    # Здесь можно добавить логику обработки данных формы
    # Например, отправку email или сохранение в базу данных
    return jsonify({'status': 'success', 'message': 'Сообщение успешно отправлено'})

@app.route('/api/products')
def get_products():
    # Здесь можно добавить получение данных из базы данных
    products = [
        {
            'id': 1,
            'name': 'Баллоны 50л',
            'description': 'Стандартные газовые баллоны для бытового использования',
            'price': '1500 ₽',
            'image': 'images/gas-cylinder.jpg'
        },
        {
            'id': 2,
            'name': 'Баллоны 100л',
            'description': 'Большие газовые баллоны для промышленного использования',
            'price': '2500 ₽',
            'image': 'images/gas-cylinder-large.jpg'
        },
        {
            'id': 3,
            'name': 'Оборудование',
            'description': 'Газовое оборудование и комплектующие',
            'price': 'от 5000 ₽',
            'image': 'images/gas-equipment.jpg'
        }
    ]
    return jsonify(products)

@app.route('/api/services')
def get_services():
    # Здесь можно добавить получение данных из базы данных
    services = [
        {
            'id': 1,
            'name': 'Доставка',
            'description': 'Быстрая доставка в любую точку города',
            'icon': 'truck'
        },
        {
            'id': 2,
            'name': 'Монтаж',
            'description': 'Профессиональный монтаж газового оборудования',
            'icon': 'tools'
        },
        {
            'id': 3,
            'name': 'Обслуживание',
            'description': 'Регулярное техническое обслуживание',
            'icon': 'shield-alt'
        }
    ]
    return jsonify(services)

if __name__ == '__main__':
    # Создаем необходимые директории, если они не существуют
    os.makedirs('templates', exist_ok=True)
    os.makedirs('static', exist_ok=True)
    os.makedirs('static/images', exist_ok=True)
    
    # Запускаем сервер
    app.run(host='0.0.0.0', port=5000) 
