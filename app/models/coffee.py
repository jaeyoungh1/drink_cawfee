from .db import db, environment, SCHEMA, add_prefix_for_prod

coffee_days = db.Table(
    'coffee_days',
    db.Model.metadata,
    db.Column('coffee_id', db.Integer, db.ForeignKey(
        'coffees.id'), primary_key=True),
    db.Column('day_id', db.Integer, db.ForeignKey(
        'days.id'), primary_key=True)
)

coffee_notes = db.Table(
    'coffee_notes',
    db.Model.metadata,
    db.Column('note_id', db.Integer, db.ForeignKey(
        add_prefix_for_prod('notes.id')), primary_key=True),
    db.Column('coffee_id', db.Integer, db.ForeignKey(
        add_prefix_for_prod('coffees.id')), primary_key=True),
)

class Coffee(db.Model):
    __tablename__ = "coffees"
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    curator_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    brand_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('brands.id')))
    name = db.Column(db.String(225), nullable=False)
    origin = db.Column(db.String(100), nullable=False)
    roast = db.Column(db.String(100), nullable=False)
    # process = db.Column(db.String(100))
    inventory = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(5000), nullable=False)
    img_url = db.Column(db.String(500))

    curator = db.relationship(
        'User', back_populates='coffee')
    brand = db.relationship(
        'Brand', back_populates='coffee')
    review = db.relationship(
        'Review', back_populates='coffee', cascade="all, delete-orphan")
    # order = db.relationship(
    #     'Order', back_populates='coffee')
    # cart = db.relationship(
    #     'Cart', back_populates='coffee')

    days = db.relationship(
        'Day',
        secondary=coffee_days,
        back_populates="coffees"
    )

    notes = db.relationship(
        'Note',
        secondary=coffee_notes,
        back_populates='coffees'
    )

    def to_dict(self):
        return {
            "id": self.id,
            "curator_id": self.curator_id,
            "brand_id": self.brand_id,
            "name": self.name,
            "origin": self.origin,
            "roast": self.roast,
            # "process": self.process,
            "inventory": self.inventory,
            "price": self.price,
            "description": self.description,
            "img_url": self.img_url,
            "days": [day.to_dict() for day in self.days],
            "notes": [note.to_dict() for note in self.notes]
        }


class Day(db.Model):
    __tablename__ = "days"

    id = db.Column(db.Integer, primary_key=True)
    day = db.Column(db.String(50))

    coffees = db.relationship(
        'Coffee',
        secondary=coffee_days,
        back_populates='days'
    )

    def to_dict(self):
        return {
            "id": self.id,
            "day": self.day,
        }


class Note(db.Model):
    __tablename__ = "notes"

    id = db.Column(db.Integer, primary_key=True)
    note = db.Column(db.String(500))

    coffees = db.relationship(
        'Coffee',
        secondary=coffee_notes,
        back_populates='notes'
    )

    def to_dict(self):
        return {
            "id": self.id,
            "note": self.note,
        }
