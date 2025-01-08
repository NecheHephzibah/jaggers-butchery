# Import necessary modules
import os
from flask import Flask
from flask_wtf.csrf import CSRFProtect
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from paystackapi.paystack import Paystack
from flask_cors import CORS

# Initializing extensions
db = SQLAlchemy()
csrf = CSRFProtect()
bcrypt = Bcrypt()
login_manager = LoginManager()

def create_app():
    # Initialize Flask application
    app = Flask(__name__, static_folder='static')

    # Configure CORS
    CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

    # Configure database
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///market.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = '8f2d191c390fdb4fd3c7c13105dc5e91ba25c5bd6e9a2c6c'

    app.config['PAYSTACK_SECRET_KEY'] = os.environ.get('PAYSTACK_SECRET_KEY', 'sk_test_b9ea25fc47d33cac3542bc25ae63ef415be85782')
    app.config['PAYSTACK_PUBLIC_KEY'] = os.environ.get('PAYSTACK_PUBLIC_KEY', 'pk_test_3e90032c631e39cd94623b61bcf7dadafe7ab4a7')

    # Initialize extensions with app
    db.init_app(app)
    csrf.init_app(app)
    bcrypt.init_app(app)
    login_manager.init_app(app)

    # Configure login manager
    login_manager.login_view = "login_page"
    login_manager.login_message_category = "info"

    # Initialize Paystack
    paystack = Paystack(secret_key=app.config['PAYSTACK_SECRET_KEY'])

    # Add user loader callback for Flask-Login
    @login_manager.user_loader
    def load_user(user_id):
        from .models import User  # Import here to avoid circular import
        return User.query.get(int(user_id))

    # Import routes and models
    from . import routes
    from . import models

    return app

# Create the app instance
app = create_app()

# Initialize migrations after app creation
migrate = Migrate(app, db)