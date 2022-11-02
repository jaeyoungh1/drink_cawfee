from app.models import db, Cart


# Adds a demo Brand, you can add other Brands here if you want
def seed_cart():

    cart1 = Cart(user_id=1,
                 coffee_id=1,
                 quantity=1
                 )
    cart2 = Cart(user_id=1,
                 coffee_id=2,
                 quantity=1)
    cart3 = Cart(user_id=1,
                 coffee_id=3,
                 quantity=2)

    db.session.add(cart1)
    db.session.add(cart2)
    db.session.add(cart3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the Brands table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_cart():
    db.session.execute('TRUNCATE carts RESTART IDENTITY CASCADE;')
    db.session.commit()
