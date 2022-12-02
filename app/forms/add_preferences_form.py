from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired

class AddPreferenceForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    tool = StringField('Tool', validators=[DataRequired()])
    experience = StringField('Experience', validators=[DataRequired()])
    add = StringField('Add', validators=[DataRequired()])
    roast = StringField('Roast', validators=[DataRequired()])
    submit = SubmitField('Submit')
