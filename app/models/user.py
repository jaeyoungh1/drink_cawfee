from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    shipping_address = db.Column(db.String(225))
    city = db.Column(db.String(100))
    state = db.Column(db.String(100))
    curator = db.Column(db.Boolean, nullable=False)

    review = db.relationship('Review', back_populates='user')
    coffee = db.relationship('Coffee', back_populates='curator')
    # cart = db.relationship('Cart', back_populates='user')
    # order = db.relationship('Order', back_populates='user')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'shipping_address': self.shipping_address,
            'city': self.city,
            'state': self.state,
            'curator': self.curator
        }

