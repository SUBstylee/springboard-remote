from models import User, db
from app import app

db.drop_all()
db.create_all()

User.query.delete()

bob = User(first_name='Bob', last_name='Dobbs', img_url='/static/default.jpg')
mike = User(first_name='Mike', last_name='Miles',
            img_url='/static/default.jpg')
mia = User(first_name='Mia', last_name='Wang', img_url='/static/default.jpg')
billie = User(first_name='Billie', last_name='Chang',
              img_url='/static/default.jpg')

users = [bob, mike, mia, billie]

db.session.add_all(users)
db.session.commit()
