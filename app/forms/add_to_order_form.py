from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, SubmitField
from wtforms.validators import DataRequired
# from flask_wtf.file import FileField, FileAllowed


class AddToOrderForm(FlaskForm):
    total = IntegerField('Total')
    order_number = StringField('order_number')
    quantity = IntegerField('Quantity')
    # order_number = StringField('Order Number', validators=[DataRequired()])

    submit = SubmitField('Submit')
