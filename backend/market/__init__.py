from flask import Flask
import os
from flask_wtf.csrf import CSRFProtect
from .extensions import db, bcrypt, csrf, migrate, login_manager
from dotenv import load_dotenv
from paystackapi.paystack import Paystack


load_dotenv()

paystack = Paystack(secret_key="PAYSTACK_SECRET_KEY")


csrf = CSRFProtect()
paystack = Paystack()

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
    Paystack.secret_key = app.config['PAYSTACK_SECRET_KEY']
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///instance/new_shop.db')

    # Initialize extensions
    db.init_app(app)
    bcrypt.init_app(app)
    from flask_cors import CORS
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    csrf.init_app(app)
    migrate.init_app(app, db)
    login_manager.init_app(app)

    # Configure login manager
    login_manager.login_view = "api.login_page"
    login_manager.login_message_category = "info"

    with app.app_context():
        # Import routes here to avoid circular imports
        from .routes import api
        app.register_blueprint(api)

    return app