from datetime import datetime

from .db import db

class Review(db.Model):
    __tablename__ = "reviews"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    coffee_id = db.Column(db.Integer, db.ForeignKey('coffees.id'))
    rating = db.Column(db.Integer, nullable=False)
    review_body = db.Column(db.String(5000), nullable=False)
    created_at = db.Column(db.String(225), default=datetime.now)
    updated_at = db.Column(
        db.String, default=datetime.now, onupdate=datetime.now)


    user = db.relationship('User', back_populates='review')
    coffee = db.relationship('Coffee', back_populates='review')

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "coffee_id": self.coffee_id,
            "rating": self.rating,
            "review_body": self.review_body,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
