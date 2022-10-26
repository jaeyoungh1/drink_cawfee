from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, SelectMultipleField, DecimalField, SubmitField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed


class AddReviewForm(FlaskForm):
    rating = IntegerField('Rating', validators=[DataRequired()])
    review_body = StringField('Review', validators=[DataRequired()])

    submit = SubmitField('Submit')
