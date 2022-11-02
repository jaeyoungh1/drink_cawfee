from flask_wtf import FlaskForm
from wtforms import IntegerField, SubmitField
from wtforms.validators import DataRequired
# from flask_wtf.file import FileField, FileAllowed


class AddToCartForm(FlaskForm):
    # coffee = IntegerField('Coffee Id', validators=[DataRequired()])
    quantity = IntegerField('Quantity', validators=[DataRequired()])

    submit = SubmitField('Submit')
