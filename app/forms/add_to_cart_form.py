from flask_wtf import FlaskForm
from wtforms import IntegerField, SubmitField, StringField
from wtforms.validators import DataRequired
from app.models import Cart
# from flask_wtf.file import FileField, FileAllowed


class AddToCartForm(FlaskForm):
    quantity = IntegerField('Quantity')
    # string = StringField("Hello")

    submit = SubmitField('Submit')
