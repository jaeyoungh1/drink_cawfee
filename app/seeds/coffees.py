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
    # notes = [
    #     {"alias":"berry_fruit" , "display": "Berry Fruit"},
    #     {"alias":"stone_fruit" , "display": "Stone Fruit"},
    #     {"alias":"citrus" , "display": "Citrus"},
    #     {"alias":"florals" , "display": "Florals"},
    #     {"alias":"vanilla" , "display": "Vanilla"},
    #     {"alias":"earthy", "display": "Earthy"},
    #     {"alias":"brown_sugar" , "display": "Brown Sugar"},
    #     {"alias":"milk_chocolate", "display": "Milk Chocolate"},
    #     {"alias":"nutty" , "display": "Nutty"},
    #     {"alias":"spices", "display": "Spices"},
    #     {"alias": "roastiness", "display": "Roastiness"},
    #     {"alias":"tropical_fruit" , "display": "Tropical Fruit"}
    # ]
    notes = [
        {"Berry Fruit"},
        {"Stone Fruit"},
        {"Citrus"},
        {"Florals"},
        {"Vanilla"},
        {"Earthy"},
        {"Brown Sugar"},
        {"Milk Chocolate"},
        {"Nutty"},
        {"Spices"},
        {"Roastiness"},
        {"Tropical Fruit"}
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
            "process": "washed",
            "inventory": 100,
            "price": 17,
            "description": " This Fully Washed coffee was grown in the Ocotepeque region of Western Honduras between 1,100 and 1,650 meters above sea level. Robust chocolate aromas lead to notes of roasted nuts and dark chocolate in this heavy bodied coffee.",
            "img_url": "https://www.mistobox.com/media/catalog/product/cac…f78eab33525d08d6e5fb8d27136e95/B/F/BFC-1040_3.jpg",
            "notes": [notes_dict['milk_chocolate'], notes_dict["nutty"], notes_dict["roastiness"]],
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
            process=coffee['process'],
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
