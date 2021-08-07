from wtforms import StringField, PasswordField
from wtforms.validators import InputRequired, Length, NumberRange, Email, Optional
from flask_wtf import FlaskForm


class RegisterForm(FlaskForm):
    '''register form, used at /register route'''
    username = StringField('Username', validators=[
                           InputRequired(), Length(min=1, max=20)])
    password = PasswordField('Password', validators=[
                             InputRequired(), Length(min=8, max=50)])
    email = StringField('Email', validators=[
        InputRequired(), Email(), Length(max=50)])
    first_name = StringField('First Name', validators=[
        InputRequired(), Length(min=1, max=30)])
    last_name = StringField('Last Name', validators=[
        InputRequired(), Length(min=1, max=30)])


class LoginForm(FlaskForm):
    '''login form, used at /login route'''
    username = StringField('Username', validators=[
                           InputRequired(), Length(min=1, max=20)])
    password = PasswordField('Password', validators=[
                             InputRequired(), Length(min=8, max=50)])


class FeedbackForm(FlaskForm):
    '''feedback form, used at /feedback route'''
    title = StringField('Title', validators=[
                        InputRequired(), Length(min=1, max=100)])
    feedback = StringField('Feedback', validators=[
                           InputRequired(), Length(min=10)])


class DeleteForm(FlaskForm):
    ''''''
