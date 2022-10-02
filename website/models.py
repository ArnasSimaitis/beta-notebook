from . import db 
from flask_login import UserMixin
from sqlalchemy.sql import func

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True)
    username = db.Column(db.String(150), unique=True)
    password = db.Column(db.String(150))
    notes = db.relationship('Notes')
    categories = db.relationship('Category')

class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150))
    user = db.Column(db.Integer, db.ForeignKey('user.id'))
    notes = db.relationship('Notes')

class Notes(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150))
    note = db.Column(db.String(10000))
    category = db.Column(db.Integer, db.ForeignKey('category.id'))
    user = db.Column(db.Integer, db.ForeignKey('user.id'))
    pictures = db.relationship('Pictures')
    is_temp = db.Column(db.Integer)

class Pictures(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    key = db.Column(db.Integer)
    name = db.Column(db.String(150), unique=True)
    note = db.Column(db.Integer, db.ForeignKey('notes.id'))
