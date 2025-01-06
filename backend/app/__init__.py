from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
import os

# Defining extensions to use in the app
db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    
    # Configurations for the database and secret key
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///butchery.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.secret_key = os.getenv('SECRET_KEY', 'dev-secret-key')

    # Starting extensions for the app
    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app)

    # Routes
    from .routes import main
    app.register_blueprint(main)

    return app
