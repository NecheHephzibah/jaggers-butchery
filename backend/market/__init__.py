from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect
from flask_migrate import Migrate
from flask_login import LoginManager
import os

# Initialize extensions
db = SQLAlchemy()
bcrypt = Bcrypt()
csrf = CSRFProtect()
migrate = Migrate()
login_manager = LoginManager()

def create_app():
    app = Flask(
        __name__,
        static_folder="dist",
        template_folder="templates"
    )

    # Set configurations
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
    app.config['PAYSTACK_SECRET_KEY'] = os.getenv('PAYSTACK_SECRET_KEY')
    app.config['PAYSTACK_PUBLIC_KEY'] = os.getenv('PAYSTACK_PUBLIC_KEY')
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///instance/new_shop.db')

    # Initialize extensions
    db.init_app(app)
    bcrypt.init_app(app)
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    csrf.init_app(app)
    migrate.init_app(app, db)
    login_manager.init_app(app)

    # Configure login manager
    login_manager.login_view = "api.login_page"
    login_manager.login_message_category = "info"

    # Register blueprints
    from .routes import api
    app.register_blueprint(api)

    return app