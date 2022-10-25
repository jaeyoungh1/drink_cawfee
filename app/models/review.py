from .db import db

class Review(db.Model):
    __tablename__ = "reviews"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    coffee_id = db.Column(db.Integer, db.ForeignKey('coffees.id'))
    rating = db.Column(db.Integer, nullable=False)
    review_body = db.Column(db.String(5000), nullable=False)

    user = db.relationship('User', back_populates='review')
    coffee = db.relationship('Coffee', back_populates='review')

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "coffee_id": self.coffee_id,
            "quantity": self.quantity
        }
