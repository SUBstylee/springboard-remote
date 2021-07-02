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


class Post(db.Model):
    '''blog posts'''
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text, nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.datetime.now)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    @property
    def readable_date(self):
        '''return the date in a readable format'''
        return self.created_at.strftime('%a %b %-d  %Y, %-I:%M %p')  # had to look this one up, and copy pasted 'strftime('%a %b %-d  %Y, %-I:%M %p')'


def connect_db(app):
    '''connect database (to flask app)'''
    db.app = app
    db.init_app(app)
