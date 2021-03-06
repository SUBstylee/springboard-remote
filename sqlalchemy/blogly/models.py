from flask_sqlalchemy import SQLAlchemy
import datetime

from sqlalchemy.orm import backref

# from sqlalchemy.orm import backref

db = SQLAlchemy()

DEFAULT_IMG_URL = '/static/default.jpg'


class User(db.Model):
    '''user data'''

    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.Text, nullable=False)
    last_name = db.Column(db.Text, nullable=False)
    img_url = db.Column(db.Text, nullable=False, default=DEFAULT_IMG_URL)

    posts = db.relationship('Post', backref='user',
                            cascade='all, delete-orphan')

    @property
    def full_name(self):
        '''return full name'''
        return f'{self.first_name} {self.last_name}'


class Post(db.Model):
    '''blog posts'''
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text, nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(
        db.DateTime,
        nullable=False,
        default=datetime.datetime.now)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    @property
    def readable_date(self):
        '''return the date in a readable format'''
        return self.created_at.strftime('%a %b %-d  %Y, %-I:%M %p')  # had to look this one up, and copy pasted 'strftime('%a %b %-d  %Y, %-I:%M %p')'


class PostTag(db.Model):
    '''tag for posts (many to many junction)'''

    __tablename__ = 'post_tags'
    post_id = db.Column(db.Integer, db.ForeignKey(
        'posts.id'), primary_key=True)
    tag_id = db.Column(db.Integer, db.ForeignKey('tags.id'), primary_key=True)


class Tag(db.Model):
    '''tags for post (individual)'''

    __tablename__ = 'tags'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False, unique=True)

    # saw "cascade='all,delete'" in solution, but didn't have it in my solution, and it is commented out there
    posts = db.relationship('Post', secondary='post_tags', backref='tags')


def connect_db(app):
    '''connect database (to flask app)'''
    db.app = app
    db.init_app(app)
