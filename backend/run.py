from market import app

if __name__ == '__main__':
    app.run(debug=True)

# from flask import Flask, jsonify
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)

# @app.route('/api/product')
# def get_product():
#     product = [
#         {
#             "name": "Premium Beef Tenderloin",
#             "category": "Beef",
#             "price": "15000",
#             "quality": "Premium Cut",
#             "imageUrl": "/beef-tenderloin.jpg"
#         },

#         {
#             "name": "Lean Goat Meat",
#             "category": "Goat",
#             "price": "8,500/kg",
#             "quality": "Select Cut",
#             "imageUrl": "/goat-meat.jpg"
#         },
#         {
#             "name": "Whole Chicken",
#             "category": "Chicken",
#             "price": "5,500/kg",
#             "quality": "Premium Quality",
#             "imageUrl": "/chicken.jpg"
#         },
#         {
#             "name": "Beef Short Ribs",
#             "category": "Beef",
#             "price": "9,500/kg",
#             "quality": "Choice Cut",
#             "imageUrl": "/beef-ribs.jpg"
#         },
#         {
#             "name": "Goat Legs",
#             "category": "Goat",
#             "price": "7,500/kg",
#             "quality": "Premium Cut",
#             "imageUrl": "/goat-legs.jpg"
#         },
#         {
#             "name": "Chicken Wings",
#             "category": "Chicken",
#             "price": "4,500/kg",
#             "quality": "Select Quality",
#             "imageUrl": "/chicken-wings.jpg"
#         }
#     ]

#     return jsonify(product)

# def test():
#     return jsonify({ "message": "Backend is connected!" })


# if __name__ == '__main__':
#   app.run(debug = True)