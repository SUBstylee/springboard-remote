from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

db = SQLAlchemy()

bcrypt = Bcrypt()


def connect_db(app):
    '''import to app.py'''
    db.app = app
    db.init_app(app)


class User(db.Model):
    '''user model'''
    __tablename__ = 'users'
    username = db.Column(db.String(20), primary_key=True)
    password = db.Column(db.Text, nullable=False)
    email = db.Column(db.String(50), nullable=False, unique=True)
    first_name = db.Column(db.String(30), nullable=False)
    last_name = db.Column(db.String(30), nullable=False)

    @classmethod
    def register(cls, username, password, email, first_name, last_name):
        '''register a user and hash password'''
        hashed = bcrypt.generate_password_hash(password)
        # turn bytestring into unicode utf8 string
        hashed_utf8 = hashed.decode('utf8')
        # return instance of user (username and hashed password)
        return cls(username=username, password=hashed_utf8, email=email, first_name=first_name, last_name=last_name)

    @classmethod
    def authenticate(cls, username, password):
        '''validate user and password, if correct then return user'''
        user = User.query.filter_by(username=username).first()
        if user and bcrypt.check_password_hash(user.password, password):
            # return user instance
            return user
        else:
            return False


class Feedback(db.Model):
    '''feedback model'''
    __tablename__ = 'feedbacks'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.Text, nullable=False)
    content = db.Column(db.Text, nullable=False)
    username = db.Column(db.Text, db.ForeignKey('users.username'))
    user = db.relationship('User', backref="feedbacks")
