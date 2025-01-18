from market import app, db
from market.models import Item

# Sample data to populate the database
myProducts = [
    {"name": "Beef Short Ribs", "category": "Beef", "price": 12000, "imageUrl": "/rib.jpg"},
    {"name": "Beef Tenderloin", "category": "Beef", "price": 15000, "imageUrl": "/boneless.jpg"},
    {"name": "Ground Beef", "category": "Beef", "price": 8000, "imageUrl": "/b2.jpg"},
    {"name": "Beef Brisket", "category": "Beef", "price": 14000, "imageUrl": "/shortRib-boneless.jpg"},
    {"name": "Beef Ribeye", "category": "Beef", "price": 16000, "imageUrl": "/fillet_barrel.jpeg"},
    {"name": "Chicken Supreme", "category": "Chicken", "price": 8500, "imageUrl": "/chickenSupreme.webp"},
    {"name": "Chicken Legs", "category": "Chicken", "price": 9000, "imageUrl": "/chickenLegs.webp"},
    {"name": "Chicken Thighs", "category": "Chicken", "price": 9500, "imageUrl": "/chickenThighs.webp"},
    {"name": "Chicken Wings", "category": "Chicken", "price": 10000, "imageUrl": "/Chickenwings.webp"},
    {"name": "chicken Fillet", "category": "Chicken", "price": 11000, "imageUrl": "/chickenFillet.webp"},
    {"name": "Pork Belly", "category": "Pork", "price": 9000, "imageUrl": "/PorkBelly.webp"},
    {"name": "Pork Chops", "category": "Pork", "price": 9500, "imageUrl": "/PorkChops.webp"},
    {"name": "Pork Tenderloin", "category": "Pork", "price": 10000, "imageUrl": "/pork-tenderloin.jpg"},
    {"name": "Pork Ribs", "category": "Pork", "price": 11000, "imageUrl": "/PorkRibs.webp"},
    {"name": "Pork Shoulder", "category": "Pork", "price": 12000, "imageUrl": "/PorkShoulder.webp"},
    {"name": "Venison Steak", "category": "Venison", "price": 17000, "imageUrl": "/lambLeg.webp"},
    {"name": "Venison Tenderloin", "category": "Venison", "price": 18000, "imageUrl": "/lambRump.webp"},
    {"name": "Ground Venison", "category": "Venison", "price": 15000, "imageUrl": "/lambShank.webp"},
    {"name": "Venison Ribs", "category": "Venison", "price": 16000, "imageUrl": "/lambSaddle.jpg"},
    {"name": "Venison Sausage", "category": "Venison", "price": 14000, "imageUrl": "/lambShoulder.webp"}
]

# Function to populate the database
def populate_db():
    with app.app_context():
        for product in myProducts:
            new_product = Item(
                name=product["name"],
                category=product["category"],
                price=product["price"],
                imageUrl=product["imageUrl"]
            )
            db.session.add(new_product)
        db.session.commit()

if __name__ == "__main__":
    populate_db()