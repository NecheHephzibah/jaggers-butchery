from flask import Blueprint, send_from_directory, request, jsonify, session, render_template, flash, redirect, url_for
from flask_login import login_user, logout_user, login_required, current_user
import os
from flask_cors import CORS, cross_origin
import time
import hashlib
from .models import User, Item, CartItem
import jwt
from . import db, bcrypt
import secrets
from paystackapi.transaction import Transaction
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.exceptions import BadRequest

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

def generate_token(user_id):
    payload = {
        'user_id': user_id,
        'exp': time.time() + 3600  # Token expires in 1 hour
    }
    token = jwt.encode(payload, 'JWT_SECRET_KEY', algorithm='HS256')
    return token

# Flask route to handle login, registration, checkout and payment
# Add item to cart route
@api.route('/api/add_to_cart/<int:item_id>', methods=['POST'])
@login_required
def add_to_cart(item_id):
    item = Item.query.get_or_404(item_id)
    if item.owner:
        return jsonify({'status': 'error', 'message': "Item already owned by someone"}), 400

    cart_item = CartItem(user_id=current_user.id, item_id=item.id)
    db.session.add(cart_item)
    db.session.commit()
    return jsonify({'status': 'success', 'message': f"{item.name} added to cart"}), 200

# Checkout page route
@api.route('/api/checkout', methods=['GET'])
@login_required
def checkout():
    item_id = request.args.get('item_id')
    if item_id:
        item = Item.query.get_or_404(item_id)
        items = [item]
        total = item.price
    else:
        items = current_user.cart_items()
        total = current_user.cart_total()
    
    return render_template('checkout.html', items=items, total=total)

# Initiate payment route
@api.route('/api/initiate_payment', methods=['POST'])
@login_required
def initiate_payment():
    item_data = request.get_json()
    if not item_data:
        return jsonify({'status': 'error', 'message': 'No data provided'}), 400

    item_id = item_data.get('item_id')
    if item_id:
        item = Item.query.get_or_404(item_id)
        total_amount = item.price * 100  # Convert to kobo
    else:
        total_amount = current_user.cart_total() * 100  # Convert to kobo

    reference = secrets.token_hex(16)

    try:
        # Initialize Paystack transaction
        response = Transaction.initialize(
            reference=reference,
            amount=total_amount,
            email=current_user.email_address,
            callback_url=url_for('api.payment_callback', _external=True)
        )
        if response['status']:
            session['payment_reference'] = reference
            if item_id:
                session['payment_item_id'] = item_id

            return jsonify({
                'status': 'success',
                'authorization_url': response['data']['authorization_url']
            })
        else:
            return jsonify({'status': 'error', 'message': 'Failed to initiate payment'}), 400
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Payment callback route
@api.route('/api/payment_callback', methods=['GET'])
@login_required
def payment_callback():
    reference = request.args.get('reference') or session.pop('payment_reference', None)
    item_id = session.pop('payment_item_id', None)

    if not reference:
        flash("No payment reference found.", category='danger')
        return redirect(url_for('api.get_products'))

    try:
        response = Transaction.verify(reference=reference)
        if response['status'] and response['data']['status'] == 'success':
            if item_id:
                item = Item.query.get_or_404(item_id)
                item.owner = current_user.id
                db.session.add(item)
            else:
                cart_items = current_user.cart_items()
                for item in cart_items:
                    item.owner = current_user.id
                    db.session.add(item)

                CartItem.query.filter_by(user_id=current_user.id).delete()

            db.session.commit()
            flash("Payment successful!", category='success')
        else:
            flash("Payment not successful. Please try again.", category='danger')
    except Exception as e:
        flash(f"An error occurred: {str(e)}", category='danger')

    return redirect(url_for('api.get_products'))

def generate_csrf_token():
    csrf_token = hashlib.sha256(str(time.time()).encode('utf-8')).hexdigest()
    session['csrf_token'] = csrf_token
    print(f"Generated CSRF token: {csrf_token}")
    return csrf_token

@api.route('/api/register', methods=['GET', 'POST'])
def register_page():
    if request.method == 'POST':
        # Check CSRF token
        token = request.form.get('csrf_token')
        print(f"Form CSRF token: {token}")
        print(f"Session CSRF token: {session.get('csrf_token')}")
        if not token or token != session.get('csrf_token'):
            flash('Invalid CSRF token!', category='danger')
            raise BadRequest("CSRF token missing or invalid")

        # Get form data
        username = request.form.get('username')
        email = request.form.get('email_address')
        password1 = request.form.get('password1')
        password2 = request.form.get('password2')

        print(f"Form data: username={username}, email={email}, password1={password1}, password2={password2}")

        # Validate form data
        if password1 != password2:
            flash('Passwords do not match!', category='danger')
            return redirect(url_for('api.register_page'))
        
        if User.query.filter_by(username=username).first():
            flash('Username already exists! Please try a different username.', category='danger')
            return redirect(url_for('api.register_page'))
        
        if User.query.filter_by(email_address=email).first():
            flash('Email address already exists! Please try a different email.', category='danger')
            return redirect(url_for('api.register_page'))

        # Create new user
        hashed_password = generate_password_hash(password1, method='sha256')
        new_user = User(username=username, email_address=email, password_hash=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        login_user(new_user)
        flash(f'Account created successfully! Welcome, {username}.', category='success')
        return redirect(url_for('api.get_products'))
    
    return render_template('register.html', csrf_token=generate_csrf_token())

# User login route
@api.route('/api/login', methods=['GET', 'POST'])
def login_page():
    if request.method == 'POST':
        # Check CSRF token
        token = request.form.get('csrf_token')
        if not token or token != session.get('csrf_token'):
            flash('Invalid CSRF token!', category='danger')
            raise BadRequest("CSRF token missing or invalid")

        # Get form data
        username = request.form.get('username')
        password = request.form.get('password')

        # Query the user from the database
        user = User.query.filter_by(username=username).first()

        # Validate credentials
        if user and check_password_hash(user.password_hash, password):
            login_user(user)
            flash(f'Welcome back, {username}!', category='success')
            return redirect(url_for('api.get_products'))
        else:
            flash('Invalid username or password!', category='danger')

    # Render the login template
    return render_template('login.html', csrf_token=generate_csrf_token())

# User logout route
@api.route('/api/logout')
@login_required
def logout_page():
    logout_user()
    flash("Logged out successfully.", category='info')
    return redirect(url_for('api.get_products'))