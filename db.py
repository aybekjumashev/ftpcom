# db.py
import psycopg2
import os
from dotenv import load_dotenv

# .env faylidan muhit o'zgaruvchilarini yuklash
load_dotenv() 

def get_connection():
    # Muhit o'zgaruvchisidan ulanish manzilini olish
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        raise ValueError("DATABASE_URL muhit o'zgaruvchisi topilmadi!")
        
    return psycopg2.connect(database_url)

def query(sql, params=None, fetch=False):
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(sql, params or ())
            if fetch:
                return cur.fetchall()