from flask_sqlalchemy import SQLAlchemy
from . import db, login_manager
from . import bcrypt
from flask_login import UserMixin


# User loader function for Flask-Login
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True, nullable=True)  # Matches current schema
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column("password", db.String(60), nullable=False)
    items = db.relationship('Item', backref='owner', lazy=True)
    cart = db.relationship('CartItem', backref='user', lazy=True)

    @property
    def password(self):
        raise AttributeError('Password is write-only.')
    
    @property
    def password(self):
        return self.password_hash
    
    @password.setter
    def password(self, plain_text_password):
        self.password_hash = bcrypt.generate_password_hash(plain_text_password).decode('utf-8')
        

     # Method to check if a given password matches the hashed password
    def check_password_correction(self, attempted_password):
        return bcrypt.check_password_hash(self.password_hash, attempted_password)

     # Method to check if a user can purchase an item (placeholder implementation)
    def can_buy(self, item):
        return self.cart_total() + item.price <= 1000

    # Method to get all items in the user's cart
    def cart_items(self):
        return [cart_item.item for cart_item in self.cart]

    # Method to calculate the total price of items in the cart
    def cart_total(self):
        return sum(cart_item.item.price for cart_item in self.cart)
    

class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    imageUrl = db.Column(db.String(200), nullable=True)
    category = db.Column(db.String(100), nullable=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)

    def buy(self, user):
        self.owner_id = user.id
        db.session.commit()

class CartItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    item_id = db.Column(db.Integer, db.ForeignKey('item.id'), nullable=False)
    item = db.relationship('Item', backref='cart_item', lazy=True)

    @staticmethod
    def remove_item(user, item):
        cart_item = CartItem.query.filter_by(user_id=user.id, item_id=item.id).first()
        if cart_item:
            db.session.delete(cart_item)
            db.session.commit()