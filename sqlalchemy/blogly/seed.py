from models import User, db
from app import app

db.drop_all()
db.create_all()

User.query.delete()

bob = User(first_name='Bob', last_name='Dobbs', img_url='/static/default.jpg')
mike = User(first_name='Mike', last_name='Miles',
            img_url='/static/default.jpg')
mia = User(first_name='Mia', last_name='Wang', img_url='/static/default.jpg')

db.session.add(bob)
db.session.add(mike)
db.session.add(mia)
db.session.commit()
