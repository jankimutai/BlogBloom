from flask_sqlalchemy import SQLAlchemy
db=SQLAlchemy()
from datetime import datetime
class User(db.Model):
    __tablename__ ="users_table"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email=db.Column(db.String(80),unique=True)
    password = db.Column(db.String(120), nullable=False)

class BlogPost(db.Model):
    __tablename__ ="blogs_table"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    created_at = db.Column(db.DateTime,default=datetime.now())
    updated_at = db.Column(db.DateTime,onupdate=datetime.now(),default=datetime.now())
    published_on =db.Column(db.DateTime,default=datetime.now())
    content = db.Column(db.Text, nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey('authors_table.id'), nullable=False)
    image_url =db.Column(db.String())
    category =db.Column(db.String())

class Author(db.Model):
    __tablename__ ="authors_table"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email=db.Column(db.String(80),unique=True)
    role=db.Column(db.String())
    #relationship
    blogs= db.relationship('BlogPost',backref="authors")

