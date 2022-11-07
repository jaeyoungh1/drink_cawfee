from app.models import db, Order


# Adds a demo Brand, you can add other Brands here if you want
def seed_order():

    order1 = Order(user_id=1,
                 coffee_id=1,
                 quantity=1,
                 total=20,
                 )
    order2 = Order(user_id=1,
                 coffee_id=2,
                 quantity=1,
                   total=20,)
    order3 = Order(user_id=1,
                 coffee_id=3,
                 quantity=2,
                   total=20,)

    db.session.add(order1)
    db.session.add(order2)
    db.session.add(order3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the Brands table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_order():
    db.session.execute('TRUNCATE orders RESTART IDENTITY CASCADE;')
    db.session.commit()
