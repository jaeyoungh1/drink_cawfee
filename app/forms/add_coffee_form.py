from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, SelectMultipleField, DecimalField, SubmitField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed
from app.models import Brand, Coffee

NOTES = [
    ("Berry Fruit", "Berry Fruit"),
    ("Stone Fruit", "Stone Fruit"),
    ("Citrus", "Citrus"),
    ("Florals", "Florals"),
    ("Vanilla", "Vanilla"),
    ("Earthy", "Earthy"),
    ("Brown Sugar", "Brown Sugar"),
    ("Milk Chocolate", "Milk Chocolate"),
    ("Nutty", "Nutty"),
    ("Spices", "Spices"),
    ("Roastiness", "Roastiness"),
    ("Tropical Fruit", "Tropical Fruit")
]
DAYS = [
    ("Monday", "Monday"),
    ("Tuesday", "Tuesday"),
    ("Wednesday", "Wednesday"),
    ("Thursday", "Thursday"),
    ("Friday", "Friday"),
    ("Saturday", "Saturday"),
    ("Sunday", "Sunday"),
]


class AddCoffeeForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    origin = StringField('Origin', validators=[DataRequired()])
    roast = StringField('Roast', validators=[DataRequired()])
    # wash = StringField('Process', validators=[DataRequired()])
    inventory = IntegerField('Inventory', validators=[DataRequired()])
    brand = StringField('Brand', validators=[DataRequired()])
    price = IntegerField('Price', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    # image_url = FileField('Preview Image', validators=[FileAllowed(['jpg', 'png', 'gif'])])
    # img_url = StringField('Preview Image', validators=[DataRequired()])
    notes = StringField('Tasting Notes', validators=[
        DataRequired()])
    days = StringField('Roasting Days', validators=[
        DataRequired()])
    # notes = SelectMultipleField('Tasting Notes', validators=[
    #                             DataRequired()], choices=NOTES)
    # days = SelectMultipleField('Roasting Days', validators=[
    #                            DataRequired()], choices=DAYS)

    submit = SubmitField('Submit')
