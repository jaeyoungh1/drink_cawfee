from .db import db



class Preference(db.Model):
    __tablename__ = "preferences"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    tool = db.Column(db.String(225), nullable=False)
    experience = db.Column(db.String(225), nullable=False)
    add = db.Column(db.String(225), nullable=False)
    roast = db.Column(db.String(100), nullable=False)

    user = db.relationship(
        'User', back_populates='preference')
   
    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "tool": self.tool,
            "experience": self.experience,
            "add": self.add,
            "roast": self.roast,
        }
