import psycopg2
def get_connection():
    return psycopg2.connect(
        dbname='learning_db', 
        user='postgres',
        password='12345678', 
        host='localhost',
        client_encoding='utf8'
    )

def query(sql, params=None, fetch=False):
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(sql, params or ())
            if fetch:
                return cur.fetchall()
