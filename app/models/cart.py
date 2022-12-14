from datetime import datetime

from .db import db


class Cart(db.Model):
    __tablename__ = "carts"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    coffee_id = db.Column(db.Integer, db.ForeignKey('coffees.id'))
    quantity = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.String(225), default=datetime.now)
    updated_at = db.Column(
        db.String, default=datetime.now, onupdate=datetime.now)

    user = db.relationship('User', back_populates='cart')
    coffee = db.relationship(
        'Coffee', back_populates='cart')

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "coffee_id": self.coffee_id,
            "quantity": self.quantity,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
