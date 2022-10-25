from .db import db

class Brand(db.Model):
    __tablename__ = "brands"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(225), nullable=False)
    brand_story = db.Column(db.String(5000))
    city = db.Column(db.String(100), nullable=False)
    state = db.Column(db.String(100), nullable=False)
    brand_img = db.Column(db.String(500), nullable=False)

    coffee = db.relationship("Coffee", back_populates="brand")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "brand_story": self.brand_story,
            "city": self.city,
            "state": self.state,
            "brand_img": self.brand_img,
        }