from datetime import datetime
from DataCreate import db
from config import Config
from werkzeug.security import generate_password_hash, check_password_hash

class dataUser(db.Model):
    id = db.Column(db.Integer,primary_key=True, autoincrement=True)
    name = db.Column(db.String(50), nullable=False)
    alamat = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(255), nullable=False, default='temp_password')
    level = db.Column(db.BigInteger, nullable=False, default= 1)
    created_at = db.Column(db.DateTime, default = datetime.utcnow)
    updated_at = db.Column(db.DateTime, default = datetime.utcnow)
    def __repr__(self):
        return '<dataUser{}>'.format(self.name)
    
    def setPassword (self,password):
        self.password = generate_password_hash(password)
    
    def checkpassword(self,password):
        return check_password_hash(self.password,password)
