from flask import Blueprint, send_from_directory, request, jsonify
from flask_login import login_user, logout_user, login_required, current_user
import os
import time
from .models import User, Item, CartItem
from . import db, bcrypt, paystack

# Create blueprint
api = Blueprint('api', __name__)

# Define the path to the frontend's dist folder
frontend_dist_folder = os.path.join(os.path.dirname(os.path.abspath(__file__)), '../dist')

# Route to serve static images
@api.route('/assets/<path:filename>')
def serve_image(filename):
    return send_from_directory('public/assets', filename)

# Serve static files from the dist folder
@api.route('/', defaults={'path': ''})
@api.route('/<path:path>')
def serve_frontend(path):
    # Serve static files if the path exists
    if path != "" and os.path.exists(os.path.join(frontend_dist_folder, path)):
        return send_from_directory(frontend_dist_folder, path)
    # Otherwise, serve the index.html (fallback for SPA routing)
    return send_from_directory(frontend_dist_folder, 'index.html')

# Rest of your routes, but change @app.route to @api.route
@api.route('/api/check', methods=['GET'])
def check_connection():
    return {'status': 'connected'}

@api.route('/api/products', methods=['GET'])
def get_products():
    try:
        default_img = '/assets/rib.jpg'

        products = Item.query.all()
        products_list = [
            {
                "id": product.id,
                "name": product.name,
                "category": product.category,
                "price": product.price,
                "imageUrl": product.imageUrl or default_img
            }
            for product in products
        ]
        return jsonify(products_list)
    except Exception as e:
        return jsonify({"error": str(e)}), 500