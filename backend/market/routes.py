from flask import Blueprint, send_from_directory, request, jsonify, session, render_template, flash, redirect, url_for
from flask_login import login_user, logout_user, login_required, current_user
import os
from flask_cors import CORS, cross_origin
from flask_wtf.csrf import CSRFProtect
import time
import hashlib
from .models import User, Item, CartItem
import jwt
from .extensions import db, bcrypt
import secrets
from paystackapi.paystack import Paystack
from paystackapi.transaction import Transaction
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.exceptions import BadRequest

# Initialize Paystack API
paystack = Paystack()

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
    if path != "" and os.path.exists(os.path.join(frontend_dist_folder, path)):
        return send_from_directory(frontend_dist_folder, path)
    return send_from_directory(frontend_dist_folder, 'index.html')

@api.route('/api/checkout', methods=['GET'])
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

@api.route('/api/checkout', methods=['POST'])
def checkout():
    try:
        data = request.get_json()
        print(f"Received data: {data}")  # Debugging information
        if not data:
            return jsonify({'error': 'No data provided'}), 400

        customer_info = data.get('customerInfo')
        cart_items = data.get('cart')
        
        if not customer_info or not cart_items:
            return jsonify({'error': 'Missing required information'}), 400

        total_amount = sum(item.get('price', 0) for item in cart_items)
        reference = secrets.token_hex(16)

        try:
            response = Transaction.initialize(
                reference=reference,
                amount=int(total_amount * 100),
                email=customer_info.get('email'),
                metadata={
                    'customer_name': customer_info.get('name'),
                    'customer_phone': customer_info.get('phone'),
                    'delivery_address': customer_info.get('address'),
                    'cart_items': [item.get('id') for item in cart_items]
                }
            )

            if response['status']:
                session['payment_reference'] = reference
                session['cart_items'] = [item.get('id') for item in cart_items]
                
                return jsonify({
                    'status': 'success',
                    'authorization_url': response['data']['authorization_url'],
                    'reference': reference
                })
            else:
                return jsonify({
                    'status': 'error',
                    'message': 'Failed to initialize payment'
                }), 400

        except Exception as e:
            return jsonify({
                'status': 'error',
                'message': str(e)
            }), 500

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api.route('/api/verify-payment/<reference>', methods=['GET'])
def verify_payment(reference):
    try:
        # Verify the transaction
        response = Transaction.verify(reference=reference)
        
        if response['status'] and response['data']['status'] == 'success':
            # Payment successful
            # Here you might want to update your database, mark orders as paid, etc.
            return jsonify({
                'status': 'success',
                'message': 'Payment verified successfully'
            })
        else:
            return jsonify({
                'status': 'error',
                'message': 'Payment verification failed'
            }), 400

    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500