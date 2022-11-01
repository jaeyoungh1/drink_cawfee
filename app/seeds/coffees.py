from app.models import db, Coffee, Day, Note


# Adds a demo Coffee, you can add other Coffees here if you want
def seed_coffee_day_note():
    days_dict = {}
    days = ['Monday', 'Tuesday', 'Wednesday',
            'Thursday', 'Friday', 'Saturday', 'Sunday']
    for day in days:
        dayRow = Day(day=day)
        days_dict[day] = dayRow
        db.session.add(dayRow)

    notes_dict = {}
    notes = [
        "Berry Fruit",
        "Stone Fruit",
        "Citrus",
        "Florals",
        "Vanilla",
        "Earthy",
        "Brown Sugar",
        "Milk Chocolate",
        "Nutty",
        "Spices",
        "Roastiness",
        "Tropical Fruit"
    ]
    for note in notes:
        noteRow = Note(note=note)
        notes_dict[note] = noteRow
        db.session.add(noteRow)

    # print("NOTES DICT>>>>", notes_dict)

    brand1Coffee = [
        {
            "curator_id": 1,
            "brand_id": 1,
            "name": "Cerberus",
            "origin": "Honduras",
            "roast": "dark",
            "inventory": 100,
            "price": 17,
            "description": "This Fully Washed coffee was grown in the Ocotepeque region of Western Honduras between 1,100 and 1,650 meters above sea level. Robust chocolate aromas lead to notes of roasted nuts and dark chocolate in this heavy bodied coffee.",
            "img_url": "https://www.mistobox.com/media/catalog/product/cache/0/image/450x450/9df78eab33525d08d6e5fb8d27136e95/B/F/BFC-1040_3.jpg",
            "notes": [notes_dict['Milk Chocolate'], notes_dict["Nutty"], notes_dict["Roastiness"]],
            "days": [days_dict['Monday']]
        },
        {
            "curator_id": 1,
            "brand_id": 1,
            "name": "Red Cab",
            "origin": "Brazil",
            "roast": "medium",
            "inventory": 100,
            "price": 23,
            "description": "This coffee was grown in the Carmo de Minas, Sul de Minas region of Brazil at an altitude of 1,100 - 1,200 meters. The lots consisted of Caturra and Catuai varieties. This Brazilian coffee is heavy bodied and creamy, it reminds us of a s'more, with notes of graham cracker, chocolate, marshmallow, and hazelnuts.",
            "img_url": "https://www.mistobox.com/media/catalog/product/cache/0/image/450x450/9df78eab33525d08d6e5fb8d27136e95/B/F/BFC-12.jpg",
            "notes": [notes_dict['Milk Chocolate'], notes_dict["Nutty"], notes_dict["Spices"]],
            "days": [days_dict['Monday'], days_dict['Tuesday'], days_dict['Thursday']]
        },
        {
            "curator_id": 1,
            "brand_id": 1,
            "name": "Tanzania Igale",
            "origin": "Tanzania",
            "roast": "medium",
            "inventory": 90,
            "price": 23,
            "description": "This Fully Washed coffee was grown between 1,700 and 1,800 meters above sea level in the Mbozi District of Tanzania. Chocolate and caramel aromas lead to notes of honey, stone fruit, and cacao nibs.",
            "img_url": "https://www.mistobox.com/media/catalog/product/cache/0/image/450x450/9df78eab33525d08d6e5fb8d27136e95/B/F/BFC-1072.jpg",
            "notes": [notes_dict['Stone Fruit'], notes_dict["Citrus"], notes_dict["Berry Fruit"]],
            "days": [days_dict['Tuesday'], days_dict['Thursday']]
        },
        {
            "curator_id": 2,
            "brand_id": 1,
            "name": "Boss Fall Espresso",
            "origin": "Various (blend)",
            "roast": "medium",
            "inventory": 100,
            "price": 18,
            "description": "Ginger spice aromas lead to a gooey shot of salted caramel, peanut brittle, and bittersweet chocolate with a lingering vanilla finish.",
            "img_url": "https://www.mistobox.com/media/catalog/product/cache/0/image/450x450/9df78eab33525d08d6e5fb8d27136e95/B/F/BFC-1073.jpg",
            "notes": [notes_dict['Vanilla'], notes_dict["Nutty"], notes_dict["Roastiness"]],
            "days": [days_dict['Monday'], days_dict['Tuesday'], days_dict['Wednesday'], days_dict['Thursday']]
        },
        {
            "curator_id": 2,
            "brand_id": 1,
            "name": "Peru Cafe De Mujer",
            "origin": "Peru",
            "roast": "medium",
            "inventory": 100,
            "price": 24,
            "description": "This Fully Washed coffee was grown by 124 women members of Asociacion de Productores Cafetaleros de la Cuenca del Rio Maranon (APROCCURMA). Organically grown between 1,500 and 1,800 meters above sea level, this coffee is balanced and sweet offering chocolate, raisin, and baking spice flavor qualities.",
            "img_url": "https://www.mistobox.com/media/catalog/product/cache/0/image/450x450/9df78eab33525d08d6e5fb8d27136e95/B/F/BFC-1069.jpg",
            "notes": [notes_dict['Milk Chocolate'], notes_dict["Spices"], notes_dict["Nutty"]],
            "days": [days_dict['Monday']]
        },
        {
            "curator_id": 2,
            "brand_id": 1,
            "name": "Nicaragua Fina La Esmeralda",
            "origin": "Nicaragua",
            "roast": "light",
            "inventory": 100,
            "price": 23,
            "description": "This naturally processed Nicaraguan coffee was produced by Finca La Esmeralda at 1,250 meters above sea level in Jinotega. Floral aromas lead to notes of tropical fruit and red plum with a juicy body and a sweet, citrusy finish.",
            "img_url": "https://www.mistobox.com/media/catalog/product/cache/0/image/450x450/9df78eab33525d08d6e5fb8d27136e95/B/F/BFC-1071.jpg",
            "notes": [notes_dict['Citrus'], notes_dict["Tropical Fruit"], notes_dict["Berry Fruit"]],
            "days": [days_dict['Monday'], days_dict['Tuesday'], days_dict['Wednesday'], days_dict['Thursday'], days_dict['Friday'], days_dict['Saturday']]
        }
    ]
    brand2Coffee = [
        {
            "curator_id": 2,
            "brand_id": 2,
            "name": "Cerberus",
            "origin": "Honduras",
            "roast": "dark",
            "inventory": 100,
            "price": 17,
            "description": " This Fully Washed coffee was grown in the Ocotepeque region of Western Honduras between 1,100 and 1,650 meters above sea level. Robust chocolate aromas lead to notes of roasted nuts and dark chocolate in this heavy bodied coffee.",
            "img_url": "",
            "notes": [notes_dict['Milk Chocolate'], notes_dict["Nutty"], notes_dict["Roastiness"]],
            "days": [days_dict['Monday']]
        }
    ]

    for coffee in brand1Coffee:
        coffeeRow = Coffee(
            curator_id=coffee['curator_id'],
            brand_id=coffee['brand_id'],
            name=coffee['name'],
            origin=coffee['origin'],
            roast=coffee['roast'],
            inventory=coffee['inventory'],
            price=coffee['price'],
            description=coffee['description'],
            img_url=coffee['img_url'],
            notes=coffee['notes'],
            days=coffee['days'],
        )
        db.session.add(coffeeRow)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the Coffees table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_coffee_day_note():
    db.session.execute('TRUNCATE coffees RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE days RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE notes RESTART IDENTITY CASCADE;')
    db.session.commit()
