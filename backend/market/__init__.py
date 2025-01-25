import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_wtf.csrf import CSRFProtect
from flask_migrate import Migrate
from paystackapi.paystack import Paystack

# Initialize extensions
db = SQLAlchemy()
bcrypt = Bcrypt()
login_manager = LoginManager()  # Only declare once
csrf = CSRFProtect()
migrate = Migrate()
paystack = None

def create_app():
    app = Flask(__name__, static_folder="dist", template_folder="dist")

    # Set configurations
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
    app.config['PAYSTACK_SECRET_KEY'] = os.getenv('PAYSTACK_SECRET_KEY')
    app.config['PAYSTACK_PUBLIC_KEY'] = os.getenv('PAYSTACK_PUBLIC_KEY')
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///instance/new_shop.db')

    # Initialize extensions
    db.init_app(app)
    bcrypt.init_app(app)
    csrf.init_app(app)
    migrate.init_app(app, db)
    login_manager.init_app(app)

    # Configure login manager
    login_manager.login_view = "login_page"
    login_manager.login_message_category = "info"

    # Initialize Paystack
    global paystack
    paystack = Paystack(secret_key=app.config['PAYSTACK_SECRET_KEY'])

    # Import routes and models here to avoid circular imports
    from . import routes, models
    from market.routes import api

    app.register_blueprint(api)

    return app

# Create the app instance
app = create_app()