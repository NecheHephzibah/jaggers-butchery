from flask import Blueprint, send_from_directory, request, jsonify
from flask_login import login_user, logout_user, login_required, current_user
import os
import time
from .models import User, Item, CartItem
from . import db, bcrypt, paystack

# Create blueprint
main = Blueprint('main', __name__)

# Serve the frontend
@main.route('/', defaults={'path': ''})
@main.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(main.static_folder + '/' + path):
        return send_from_directory(main.static_folder, path)
    return send_from_directory(main.static_folder, 'index.html')

# Rest of your routes, but change @app.route to @main.route
@main.route('/api/check', methods=['GET'])
def check_connection():
    return {'status': 'connected'}

# Continue with the rest of your routes...