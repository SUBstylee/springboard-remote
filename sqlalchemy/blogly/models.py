from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

DEFAULT_IMG_URL = '/static/default.jpg'


class User(db.Model):
    '''user data'''

    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.Text, nullable=False)
    last_name = db.Column(db.Text, nullable=False)
    img_url = db.Column(db.Text, nullable=False, default=DEFAULT_IMG_URL)

    @property
    def full_name(self):
        '''return full name'''
        return f'{self.first_name} {self.last_name}'


def connect_db(app):
    '''connect database (to flask app)'''
    db.app = app
    db.init_app(app)
