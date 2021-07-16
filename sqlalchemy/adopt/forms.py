from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, TextAreaField, BooleanField
from wtforms.validators import InputRequired, Length, NumberRange, URL, Optional


class AddPetForm(FlaskForm):
    '''form to add a pet'''
    name = StringField('Pet Name: ', validators=[InputRequired()],)
    species = SelectField('Pet Species: ', choices=[
                          ("cat", "Cat"), ("dog", "Dog"), ("porcupine", "Porcupine")],)
    # species = SelectField('Pet Species: ', choices=[('cat', 'Cat'), ('dog', 'Dog'), ('mammal', 'Other Mammal'), (
    #     'bird', 'Bird'), ('fish', 'Fish'), ('rep-amp', 'Reptile or Amphibian'), ('other', 'Other')],)
    photo_url = StringField('Pet Photo (URL): ',
                            validators=[Optional(), URL()],)
    age = IntegerField('Pet Age: ', validators=[
                       Optional(), NumberRange(min=0, max=30)],)
    notes = TextAreaField('Additional Pet Info: ', validators=[
        Optional(), Length(min=10)],)


class EditPetForm(FlaskForm):
    '''form to edit a pet'''
    photo_url = StringField('Pet Photo (URL): ',
                            validators=[Optional(), URL()],)
    notes = TextAreaField('Additional Pet Info: ', validators=[
        Optional(), Length(min=10)],)
    available = BooleanField('Still Available for Adoption?: ')
