from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User



class UpdateAddressForm(FlaskForm):
    address = StringField('address', validators=[DataRequired()])
    zipcode = StringField('zipcode', validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired()])
