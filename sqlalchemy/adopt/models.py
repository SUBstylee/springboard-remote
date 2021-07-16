from flask_sqlalchemy import SQLAlchemy

MISSING_IMG = 'https://www.nationalpetregister.org/assets/img/no-photo.jpg'

db = SQLAlchemy()


class Pet(db.Model):
    '''pets for adoption model'''
    __tablename__ = "pets"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    species = db.Column(db.Text, nullable=False)
    photo_url = db.Column(db.Text)
    age = db.Column(db.Integer)
    notes = db.Column(db.Text)
    available = db.Column(db.Boolean, nullable=False, default=True)

    def img_url(self):
        '''return image for pet, defaults to MISSING_IMG'''
        return self.photo_url or MISSING_IMG


def connect_db(app):
    '''connects database to app.py'''
    db.app = app
    db.init_app(app)
