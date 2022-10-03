from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from os import path
from flask_login import LoginManager
from db_settings import *
import mysql.connector

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'Ray Charles'
    app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+pymysql://{db_user}:@{db_host}/{db_name}"
    
    db.init_app(app)

    from .views import views
    from .auth import auth
    from .creator import creator

    app.register_blueprint(views, url_prefix="/")
    app.register_blueprint(auth, url_prefix="/")
    app.register_blueprint(creator, url_prefix="/")

    from .models import User

    create_database(app)

    create_guest()

    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(id):
        return User.query.get(int(id))

    return app

def create_database(app):
    db.create_all(app=app)

def create_guest():
    mydb = mysql.connector.connect(
        host=db_host,
        user=db_user,
        passwd=db_password,
        database=db_name
    )
    my_cursor = mydb.cursor()
    
    my_cursor.execute(f"INSERT IGNORE INTO `user` (`id`, `email`, `username`, `password`) VALUES (1,'guest','guest','guest')")
    mydb.commit()
    my_cursor.execute(f"INSERT IGNORE INTO `category`(`id`, `name`, `user`) VALUES (1,'Empty',1)")
    mydb.commit()

    my_cursor.close()
    mydb.close()