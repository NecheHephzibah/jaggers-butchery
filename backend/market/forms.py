# Import necessary modules from Flask-WTF and WTForms
# from flask_wtf import FlaskForm
# from wtforms import StringField, PasswordField, SubmitField
# from wtforms.validators import Length, EqualTo, Email, DataRequired, ValidationError
# from market.models import User

# Define the registration form
# class RegisterForm(FlaskForm):
#     # Custom validator to check if username already exists
    # def validate_username(self, username_to_check):
    #     user = User.query.filter_by(username=username_to_check.data).first()
    #     if user:
    #         raise ValidationError('Username already exist.')

    # Custom validator to check if email address already exists
    # def validate_email_address(self, email_address_to_check):
    #     email_address = User.query.filter_by(email_address=email_address_to_check.data).first()
    #     if email_address:
    #         raise ValidationError('Email Address already exist.')

    # Form fields with their respective validators
 
# Define the login form
# class LoginForm(FlaskForm):
#     username = StringField(label='Username', validators=[DataRequired(), Length(min=2, max=30)])
#     password = PasswordField(label='Password', validators=[DataRequired(), Length(min=6)])
#     submit = SubmitField(label='Sign in')

# Define the form for purchasing an item
# class PurchaseItemForm(FlaskForm):
#     submit = SubmitField(label='Buy Meat!')

# Define the form for selling an item
# class SellItemForm(FlaskForm):
#     submit = SubmitField(label='Sell Item!')