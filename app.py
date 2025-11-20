from flask import Flask, request, session, jsonify
from db import query
from flask_cors import CORS
import jwt
import datetime
import os
from dotenv import load_dotenv

load_dotenv() # .env faylidan o'zgaruvchilarni yuklash

app = Flask(__name__)
app.secret_key = os.environ.get('FLASK_SECRET_KEY', 'default_flask_secret_for_dev')
SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'default_jwt_secret_for_dev')
frontend_url = os.environ.get('FRONTEND_URL', 'http://localhost:5173') # Vite'ning standart porti
CORS(app, supports_credentials=True, origins=[frontend_url])

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400

    user = query("SELECT id, password FROM users WHERE username=%s", [username], fetch=True)

    if user and user[0][1] == password:
        session['user_id'] = user[0][0]
        
        token_payload = {
            'user_id': user[0][0],
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=360)
        }
        
        try:
            # Генерируем токен и сразу декодируем в строку
            token = jwt.encode(
                payload=token_payload,
                key=SECRET_KEY,
                algorithm='HS256'
            )
            
            # Преобразуем bytes в строку (если нужно)
            if isinstance(token, bytes):
                token = token.decode('utf-8')
                
            return jsonify({
                'message': 'Login successful',
                'token': token
            }), 200
        except Exception as e:
            return jsonify({'error': f'Token generation failed: {str(e)}'}), 500

    return jsonify({'error': 'Invalid username or password'}), 401



@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400

    # Проверяем, существует ли пользователь
    existing_user = query("SELECT id FROM users WHERE username = %s", [username], fetch=True)
    if existing_user:
        return jsonify({'error': 'User already exists'}), 400

    # Добавляем нового пользователя с временем регистрации
    query(
        "INSERT INTO users (username, password, created_at) VALUES (%s, %s, CURRENT_TIMESTAMP)",
        [username, password]
    )

    return jsonify({'message': 'User registered successfully'}), 200

from functools import wraps
import jwt
from flask import Flask, request, jsonify

SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'default_jwt_secret_for_dev') # Замените на ваш секретный ключ



def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'error': 'Token is missing'}), 401

        try:
            token = token.split(" ")[1]  # Убираем "Bearer"
            data = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token has expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'error': 'Invalid token'}), 401

        return f(data, *args, **kwargs)
    return decorated

@app.route('/dashboard', methods=['GET'])
def dashboard():
    # Проверка авторизации
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'error': 'Unauthorized'}), 401

    try:
        token = token.split(" ")[1]
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Token has expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid token'}), 401

    user_id = decoded_token['user_id']

    # Проверка прав ментора
    user = query("SELECT username FROM users WHERE id = %s", [user_id], fetch=True)
    if not user or user[0][0] != 'mentor':
        return jsonify({'error': 'Access denied'}), 403

    # Параметры запроса
    sort_by = request.args.get('sort_by', 'username')
    sort_order = 'ASC' if request.args.get('sort_order', 'asc') == 'asc' else 'DESC'
    search = request.args.get('search', '')
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 10))

    # Валидация параметров сортировки
    valid_sort_columns = ['username', 'test_name', 'passed']
    if sort_by not in valid_sort_columns:
        return jsonify({'error': f'Invalid sort column: {sort_by}'}), 400

    # SQL запрос (без completed_at)
    offset = (page - 1) * per_page
    progress = query(
        f"""
        SELECT u.username, t.name AS test_name, p.passed
        FROM progress p
        JOIN users u ON p.user_id = u.id
        JOIN tests t ON p.test_id = t.id
        WHERE u.username ILIKE %s OR t.name ILIKE %s
        ORDER BY {sort_by} {sort_order}
        LIMIT %s OFFSET %s
        """,
        [f'%{search}%', f'%{search}%', per_page, offset],
        fetch=True
    )

    # Формируем ответ без completed_at
    progress_data = [
        {
            'username': row[0],
            'test_name': row[1],
            'passed': row[2]
        } for row in progress
    ]

    return jsonify({
        'progress': progress_data,
        'page': page,
        'per_page': per_page
    }), 200
    

@app.route('/tests', methods=['GET'])
def get_tests():
    # Проверяем, авторизован ли пользователь
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'error': 'Unauthorized'}), 401

    try:
        token = token.split(" ")[1]  # Убираем "Bearer"
        jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Token has expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid token'}), 401

    # Возвращаем список тестов
    tests = query("SELECT id, name, level FROM tests ORDER BY level", fetch=True)
    return jsonify({'tests': [{'id': t[0], 'name': t[1], 'level': t[2]} for t in tests]}), 200


@app.route('/test/<int:test_id>', methods=['GET'])
def get_test(test_id):
    # Проверяем, авторизован ли пользователь
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'error': 'Unauthorized'}), 401

    try:
        token = token.split(" ")[1]  # Убираем "Bearer"
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Token has expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid token'}), 401

    user_id = decoded_token['user_id']

    # Получаем уровень текущего теста
    current_test = query("SELECT id, level FROM tests WHERE id = %s", [test_id], fetch=True)
    if not current_test:
        return jsonify({'error': 'Test not found'}), 404

    current_level = current_test[0][1]

    # Проверяем, прошел ли пользователь предыдущий тест
    if current_level > 1:  # Если это не первый тест
        previous_level = current_level - 1
        previous_test = query("SELECT id FROM tests WHERE level = %s", [previous_level], fetch=True)
        if not previous_test:
            return jsonify({'error': 'Previous test not found'}), 404

        previous_test_id = previous_test[0][0]
        progress = query("SELECT passed FROM progress WHERE user_id = %s AND test_id = %s", [user_id, previous_test_id], fetch=True)
        if not progress or not progress[0][0]:  # Если предыдущий тест не пройден
            return jsonify({'error': 'You must pass the previous test to access this one'}), 403

    # Получаем данные теста
    test = query("SELECT id, name, level FROM tests WHERE id = %s", [test_id], fetch=True)
    questions = query(
        "SELECT q.id, q.text, a.id, a.text, a.is_correct "
        "FROM questions q "
        "JOIN answers a ON q.id = a.question_id "
        "WHERE q.test_id = %s",
        [test_id],
        fetch=True
    )

    # Формируем структуру данных
    test_data = {
        'id': test[0][0],
        'name': test[0][1],
        'level': test[0][2],
        'questions': []
    }

    question_map = {}
    for q_id, q_text, a_id, a_text, a_is_correct in questions:
        if q_id not in question_map:
            question_map[q_id] = {'id': q_id, 'text': q_text, 'answers': []}
        question_map[q_id]['answers'].append({'id': a_id, 'text': a_text, 'is_correct': a_is_correct})

    test_data['questions'] = list(question_map.values())

    return jsonify(test_data), 200


@app.route('/test/<int:test_id>/submit', methods=['POST'])
def submit_test(test_id):
    # Проверка авторизации
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'error': 'Unauthorized'}), 401

    try:
        token = token.split(" ")[1]
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        user_id = decoded_token['user_id']
    except Exception as e:
        return jsonify({'error': 'Invalid token'}), 401

    # Получаем ответы пользователя
    answers = request.get_json().get('answers', {})

    # 1. Получаем все вопросы теста
    questions = query(
        "SELECT id FROM questions WHERE test_id = %s",
        [test_id],
        fetch=True
    )
    question_ids = [q[0] for q in questions]
    total_questions = len(question_ids)

    # 2. Получаем правильные ответы (только ID)
    correct_answers = query(
        "SELECT id FROM answers WHERE is_correct = TRUE AND question_id IN %s",
        [tuple(question_ids)],
        fetch=True
    )
    correct_answer_ids = {a[0] for a in correct_answers}

    # 3. Подсчет правильных ответов
    score = sum(1 for a_id in answers.values() if a_id in correct_answer_ids)

    # 4. Определяем результат (прошел/не прошел)
    passed = score >= total_questions / 2  # 50% для прохождения

    # 5. Сохраняем результат (только passed)
    query(
        "INSERT INTO progress (user_id, test_id, passed) VALUES (%s, %s, %s) "
        "ON CONFLICT (user_id, test_id) DO UPDATE SET passed = EXCLUDED.passed",
        [user_id, test_id, passed]
    )

    return jsonify({
        'passed': passed,
        'score': score,
        'total_questions': total_questions
    }), 200

@app.route('/admin/add_test', methods=['POST'])
def add_test():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'error': 'Unauthorized'}), 401

    try:
        token = token.split(" ")[1]
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Token has expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid token'}), 401

    user_id = decoded_token['user_id']

    # Проверяем, является ли пользователь с username = 'mentor'
    user = query("SELECT username FROM users WHERE id = %s", [user_id], fetch=True)
    if not user or user[0][0] != 'mentor':
        return jsonify({'error': 'Access denied. Only user mentor can add tests.'}), 403

    data = request.get_json()
    test_name = data.get('test_name')
    level = data.get('level')
    questions = data.get('questions')

    if not test_name or not level or not questions:
        return jsonify({'error': 'Missing required fields'}), 400

    # Синхронизация последовательности для таблицы tests
    query("SELECT setval('tests_id_seq', (SELECT MAX(id) FROM tests))")

    # Добавляем тест
    test_id = query(
        "INSERT INTO tests (name, level) VALUES (%s, %s) RETURNING id",
        [test_name, level],
        fetch=True
    )[0][0]

    # Синхронизация последовательности для таблицы questions
    query("SELECT setval('questions_id_seq', (SELECT MAX(id) FROM questions))")

    # Добавляем вопросы и ответы
    for question in questions:
        question_text = question.get('text')
        answers = question.get('answers')

        if not question_text or not answers:
            return jsonify({'error': 'Missing question or answers'}), 400

        try:
            question_id = query(
                "INSERT INTO questions (test_id, text) VALUES (%s, %s) RETURNING id",
                [test_id, question_text],
                fetch=True
            )[0][0]
        except psycopg2.errors.UniqueViolation:
            return jsonify({'error': 'Failed to add question. Duplicate primary key detected.'}), 400

        # Синхронизация последовательности для таблицы answers
        query("SELECT setval('answers_id_seq', (SELECT MAX(id) FROM answers))")

        for answer in answers:
            answer_text = answer.get('text')
            is_correct = answer.get('is_correct')

            if answer_text is None or is_correct is None:
                return jsonify({'error': 'Missing answer text or correctness'}), 400

            query(
                "INSERT INTO answers (question_id, text, is_correct) VALUES (%s, %s, %s)",
                [question_id, answer_text, is_correct]
            )

    # Синхронизация последовательности для таблицы progress
    query("SELECT setval('progress_id_seq', (SELECT MAX(id) FROM progress))")

    return jsonify({'message': 'Test added successfully', 'test_id': test_id}), 200

@app.route('/admin/edit_test', methods=['POST'])
def edit_test():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'error': 'Unauthorized'}), 401

    try:
        token = token.split(" ")[1]
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Token has expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid token'}), 401

    user_id = decoded_token['user_id']

    # Проверяем, является ли пользователь с username = 'mentor'
    user = query("SELECT username FROM users WHERE id = %s", [user_id], fetch=True)
    if not user or user[0][0] != 'mentor':
        return jsonify({'error': 'Access denied. Only user mentor can edit tests.'}), 403

    data = request.get_json()
    test_id = data.get('test_id')
    test_name = data.get('test_name')
    level = data.get('level')
    questions = data.get('questions', [])
    new_questions = data.get('new_questions', [])
    delete_questions = data.get('delete_questions', [])

    if not test_id:
        return jsonify({'error': 'Missing test_id'}), 400

    # Обновляем название и уровень теста
    if test_name or level:
        query(
            "UPDATE tests SET name = %s, level = %s WHERE id = %s",
            [test_name, level, test_id]
        )

    # Удаляем вопросы
    for question_id in delete_questions:
        query("DELETE FROM questions WHERE id = %s", [question_id])
        query("DELETE FROM answers WHERE question_id = %s", [question_id])

    # Добавляем или обновляем вопросы и ответы
    for question in questions:
        question_id = question.get('question_id')
        question_text = question.get('text')
        answers = question.get('answers', [])

        if question_id:  # Если вопрос уже существует, обновляем его
            query(
                "UPDATE questions SET text = %s WHERE id = %s",
                [question_text, question_id]
            )
        else:  # Если вопрос новый, добавляем его
            question_id = query(
                "INSERT INTO questions (test_id, text) VALUES (%s, %s) RETURNING id",
                [test_id, question_text],
                fetch=True
            )[0][0]

        # Обновляем или добавляем ответы
        for answer in answers:
            answer_id = answer.get('answer_id')
            answer_text = answer.get('text')
            is_correct = answer.get('is_correct')

            if answer_id:  # Если ответ уже существует, обновляем его
                query(
                    "UPDATE answers SET text = %s, is_correct = %s WHERE id = %s",
                    [answer_text, is_correct, answer_id]
                )
            else:  # Если ответ новый, добавляем его
                query(
                    "INSERT INTO answers (question_id, text, is_correct) VALUES (%s, %s, %s)",
                    [question_id, answer_text, is_correct]
                )

    # Добавляем новые вопросы и ответы
    for question in new_questions:
        question_text = question.get('text')
        answers = question.get('answers', [])

        if not question_text or not answers:
            return jsonify({'error': 'Missing question or answers'}), 400

        question_id = query(
            "INSERT INTO questions (test_id, text) VALUES (%s, %s) RETURNING id",
            [test_id, question_text],
            fetch=True
        )[0][0]

        for answer in answers:
            answer_text = answer.get('text')
            is_correct = answer.get('is_correct')

            if answer_text is None or is_correct is None:
                return jsonify({'error': 'Missing answer text or correctness'}), 400

            query(
                "INSERT INTO answers (question_id, text, is_correct) VALUES (%s, %s, %s)",
                [question_id, answer_text, is_correct]
            )

    return jsonify({'message': 'Test updated successfully'}), 200

@app.route('/admin/get_test_by_level', methods=['POST'])
def get_test_by_level():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'error': 'Unauthorized'}), 401

    try:
        token = token.split(" ")[1]
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Token has expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid token'}), 401

    user_id = decoded_token['user_id']

    # Проверяем, является ли пользователь с username = 'mentor'
    user = query("SELECT username FROM users WHERE id = %s", [user_id], fetch=True)
    if not user or user[0][0] != 'mentor':
        return jsonify({'error': 'Access denied. Only user mentor can access tests.'}), 403

    data = request.get_json()
    level = data.get('level')

    if not level:
        return jsonify({'error': 'Missing level'}), 400

    # Получаем тест по уровню
    test = query(
        "SELECT id, name, level FROM tests WHERE level = %s",
        [level],
        fetch=True
    )

    if not test:
        return jsonify({'error': 'Test not found'}), 404

    test_id = test[0][0]
    test_name = test[0][1]
    test_level = test[0][2]

    # Получаем вопросы и ответы для теста
    questions = query(
        """
        SELECT q.id AS question_id, q.text AS question_text, a.id AS answer_id, a.text AS answer_text, a.is_correct
        FROM questions q
        LEFT JOIN answers a ON q.id = a.question_id
        WHERE q.test_id = %s
        """,
        [test_id],
        fetch=True
    )

    # Формируем структуру данных
    question_map = {}
    for question_id, question_text, answer_id, answer_text, is_correct in questions:
        if question_id not in question_map:
            question_map[question_id] = {
                'question_id': question_id,
                'text': question_text,
                'answers': []
            }
        question_map[question_id]['answers'].append({
            'answer_id': answer_id,
            'text': answer_text,
            'is_correct': is_correct
        })

    test_data = {
        'test_id': test_id,
        'name': test_name,
        'level': test_level,
        'questions': list(question_map.values())
    }

    # Дополнение теста вопросами и ответами
    new_questions = data.get('new_questions', [])
    for question in new_questions:
        question_text = question.get('text')
        answers = question.get('answers', [])

        if not question_text or not answers:
            return jsonify({'error': 'Missing question or answers'}), 400

        question_id = query(
            "INSERT INTO questions (test_id, text) VALUES (%s, %s) RETURNING id",
            [test_id, question_text],
            fetch=True
        )[0][0]

        for answer in answers:
            answer_text = answer.get('text')
            is_correct = answer.get('is_correct')

            if answer_text is None or is_correct is None:
                return jsonify({'error': 'Missing answer text or correctness'}), 400

            query(
                "INSERT INTO answers (question_id, text, is_correct) VALUES (%s, %s, %s)",
                [question_id, answer_text, is_correct]
            )

    return jsonify({'test': test_data, 'message': 'Questions added successfully'}), 200


@app.route('/profile', methods=['GET'])
def get_profile():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'error': 'Unauthorized'}), 401

    try:
        token = token.split(" ")[1]
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Token has expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid token'}), 401

    user_id = decoded_token['user_id']

    user_data = query(
        "SELECT username, created_at FROM users WHERE id = %s",
        [user_id],
        fetch=True
    )

    if not user_data:
        return jsonify({'error': 'User not found'}), 404

    progress_data = query(
        """
        SELECT t.name, p.passed
        FROM progress p
        JOIN tests t ON p.test_id = t.id
        WHERE p.user_id = %s
        """,
        [user_id],
        fetch=True
    )

    progress_list = [{'test_name': row[0], 'passed': row[1]} for row in progress_data]

    # Форматируем дату на стороне сервера
    formatted_date = user_data[0][1].strftime('%Y-%m-%d %H:%M:%S')  # Пример: "2023-06-17 14:35:00"

    profile_data = {
        'username': user_data[0][0],
        'created_at': formatted_date,  # Передаем отформатированную дату
        'progress': progress_list
    }

    return jsonify({'profile': profile_data}), 200
def get_next_unlocked_level(user_id):
    result = query("""
        SELECT MAX(level) FROM tests t
        JOIN progress p ON t.id = p.test_id
        WHERE p.user_id = %s AND p.passed = TRUE
    """, [user_id], fetch=True)
    return (result[0][0] or 0) + 1


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)