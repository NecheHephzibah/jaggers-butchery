import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_wtf.csrf import CSRFProtect
from flask_migrate import Migrate
from paystackapi.paystack import Paystack

# Initialize SQLAlchemy first
db = SQLAlchemy()

# Create app
app = Flask(__name__)

# Set configurations
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['PAYSTACK_SECRET_KEY'] = os.getenv('PAYSTACK_SECRET_KEY')
app.config['PAYSTACK_PUBLIC_KEY'] = os.getenv('PAYSTACK_PUBLIC_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///new_shop.db')

# Initialize extensions
db.init_app(app)
migrate = Migrate(app, db)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
login_manager.login_view = "login_page"
login_manager.login_message_category = "info"
csrf = CSRFProtect(app)
paystack = Paystack(secret_key=app.config['PAYSTACK_SECRET_KEY'])

# Import routes and models
from . import routes, models