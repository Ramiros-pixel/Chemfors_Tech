from flask_sqlalchemy import SQLAlchemy
from flask import Flask 
from flask_migrate import Migrate
from config import Config
from flask_jwt_extended import JWTManager
from flask_cors import CORS

app = Flask(__name__)
app.config.from_object(Config)
app.config['JWT_SECRET_KEY'] = '6738430'

# Enable CORS for all routes
CORS(app, origins=["*"])  # Atau specify domain frontend: ["https://your-frontend.vercel.app"]

db = SQLAlchemy(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)

# Import routes after app initialization to avoid circular imports
from . import route, user, ControllerUser, DataChemy, sistemHitung