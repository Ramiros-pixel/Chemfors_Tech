import os
from dotenv import load_dotenv
load_dotenv()

class Config(object):
    # Railway database URL
    database_url = os.environ.get('DATABASE_URL')
    
    if database_url:
        # Railway kasih URL lengkap, tinggal ganti driver
        if database_url.startswith('mysql://'):
            SQLALCHEMY_DATABASE_URI = database_url.replace('mysql://', 'mysql+pymysql://', 1)
        else:
            SQLALCHEMY_DATABASE_URI = database_url
    else:
        # Fallback manual build
        host = os.environ.get('DB_HOST', 'localhost')
        database = os.environ.get('DB_DATABASE', 'railway')
        username = os.environ.get('DB_USERNAME', 'root')
        password = os.environ.get('DB_PW', '')
        port = os.environ.get('DB_PORT', '36267')
        
        # Pastikan port tidak kosong
        if not port or port == '':
            port = '36267'
            
        SQLALCHEMY_DATABASE_URI = SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:JxbUDtiZHJEwjfbBtJcsvVVeQFEVFdzs@interchange.proxy.rlwy.net:36267/railway'

    
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_RECORD_QUERIES = True
    
    # Debug print
    print(f"Database URL: {os.environ.get('DATABASE_URL', 'Not set')}")
    print(f"Final URI: {SQLALCHEMY_DATABASE_URI}")
