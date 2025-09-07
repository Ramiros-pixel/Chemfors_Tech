from DataCreate import db
from config import Config 
from datetime import datetime

class DataSchema(db.Model):
    __tablename__ = 'data_schema'
    id = db.Column(db.Integer,primary_key=True)
    posisi = db.Column(db.String(50), nullable=False)
    suhu = db.Column(db.Float, nullable=False)
    tekanan = db.Column(db.Float, nullable=False)
    entalpi = db.Column(db.Float, nullable= True)    
    massa = db.Column(db.Float, nullable= True)
    created_at = db.Column(db.DateTime, default = datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)
    id_user = db.Column(db.Integer, db.ForeignKey('data_user.id'), nullable=False)
    def __repr__(self):
        return '<dataSchema{}>'.format(self.id) 
