from flask import Blueprint, request, jsonify, session
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from market.models import db, Product, Order, User, CartItem
from paystackapi.transaction import Transaction
from paystackapi.paystack import Paystack
import secrets

main = Blueprint('main', __name__)
paystack = Paystack() 

@main.route('/api/auth/register', methods=['POST'])
def register():
    data = request.json()
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already registered'}), 400
    
    user = User(
        email=data['email'],
        username=data['username'],
        password=generate_password_hash(data['password']),
        name=data.get('name', '')
    )
    db.session.add(user)
    db.session.commit()
    
    token = create_access_token(identity=user.id)
    return jsonify({
        'token': token, 
        'user': {'id': user.id, 'email': user.email, 'name': user.name}
    })

@main.route('/api/auth/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data['email']).first()
    
    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({'error': 'Invalid credentials'}), 401
    
    token = create_access_token(identity=user.id)
    return jsonify({
        'token': token, 
        'user': {'id': user.id, 'email': user.email, 'name': user.name}
    })

@main.route('/api/products', methods=['GET'])
def get_products():
    try:
        category = request.args.get('category')
        query = request.args.get('query')
        
        products_query = Product.query
        
        if category:
            products_query = products_query.filter_by(category=category)
        if query:
            products_query = products_query.filter(Product.name.ilike(f'%{query}%'))
        
        products = products_query.all()
        return jsonify([product.to_dict() for product in products])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@main.route('/api/cart', methods=['GET', 'POST', 'DELETE'])
@jwt_required()
def manage_cart():
    current_user_id = get_jwt_identity()
    
    if request.method == 'GET':
        user = User.query.get(current_user_id)
        return jsonify({
            'items': user.get_cart_items(),
            'total': user.cart_total()
        })
    
    elif request.method == 'POST':
        data = request.json
        product = Product.query.get(data['product_id'])
        
        if not product:
            return jsonify({'error': 'Product not found'}), 404
        
        cart_item = CartItem.query.filter_by(
            user_id=current_user_id,
            product_id=data['product_id']
        ).first()
        
        if cart_item:
            cart_item.quantity += data.get('quantity', 1)
        else:
            cart_item = CartItem(
                user_id=current_user_id,
                product_id=data['product_id'],
                quantity=data.get('quantity', 1)
            )
            db.session.add(cart_item)
        
        db.session.commit()
        return jsonify({'message': 'Item added to basket'})
    
    elif request.method == 'DELETE':
        data = request.json
        CartItem.query.filter_by(
            user_id=current_user_id,
            product_id=data['product_id']
        ).delete()
        db.session.commit()
        return jsonify({'message': 'Item removed from basket'})

@main.route('/api/checkout', methods=['POST'])
@jwt_required()
def checkout():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if not user.cart_items:
        return jsonify({'error': 'Basket is empty'}), 400
    
    try:
        # Generate unique reference
        reference = secrets.token_hex(16)
        
        # Initialize Paystack transaction
        response = paystack.transaction.initialize(
            reference=reference,
            amount=int(user.cart_total() * 100),  # Convert to kobo
            email=user.email,
            callback_url=request.json.get('callback_url')
        )
        
        if response['status']:
            # Store reference in session
            session['payment_reference'] = reference
            
            # Create order
            for cart_item in user.cart_items:
                order = Order(
                    user_id=current_user_id,
                    product_id=cart_item.product_id,
                    quantity=cart_item.quantity,
                    total_price=cart_item.product.price * cart_item.quantity,
                    reference=reference
                )
                db.session.add(order)
            
            db.session.commit()
            
            return jsonify({
                'authorization_url': response['data']['authorization_url'],
                'reference': reference
            })
        
        return jsonify({'error': 'Failed to initialize payment'}), 400
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@main.route('/api/verify-payment', methods=['POST'])
@jwt_required()
def verify_payment():
    reference = request.json.get('reference')
    if not reference:
        return jsonify({'error': 'No payment reference provided'}), 400
    
    try:
        # Verify the transaction
        response = paystack.transaction.verify(reference=reference)
        
        if response['status'] and response['data']['status'] == 'success':
            # Update orders status
            orders = Order.query.filter_by(reference=reference).all()
            for order in orders:
                order.status = 'completed'
            
            # Clear cart
            current_user_id = get_jwt_identity()
            CartItem.query.filter_by(user_id=current_user_id).delete()
            
            db.session.commit()
            return jsonify({'message': 'Payment verified successfully'})
        
        return jsonify({'error': 'Payment verification failed'}), 400
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
