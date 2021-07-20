from models import User, Post, Tag, db
from app import app

db.drop_all()
db.create_all()

User.query.delete()
Post.query.delete()
Tag.query.delete()
# users
bob = User(first_name='Bob', last_name='Dobbs',
           img_url='https://m.media-amazon.com/images/M/MV5BYjdmMGRiNDQtNzJiNS00ZWFkLTliNTQtMGNjMjUyMWUwYWY5XkEyXkFqcGdeQXVyNzA1NDc0Nzg@._V1_.jpg')
mike = User(first_name='Mike', last_name='Miles',
            img_url='/static/default.jpg')
mia = User(first_name='Mia', last_name='Wang',
           img_url='https://pbs.twimg.com/profile_images/1002019549426970625/Q7pTNN_k_400x400.jpg')
billie = User(first_name='Billie', last_name='Chang',
              img_url='https://i.pinimg.com/564x/77/76/a5/7776a5ef42b3781255679e7cec8cff15.jpg')

users = [bob, mike, mia, billie]

db.session.add_all(users)
# posts
first_post = Post(title='My post',
                  content='TESTING', user_id=1)
second_post = Post(title='My post',
                   content='TESTING', user_id=2)
third_post = Post(title='My post',
                  content='TESTING', user_id=3)
fourth_post = Post(title='My post',
                   content='TESTING', user_id=4)

posts = [first_post, second_post, third_post, fourth_post]

db.session.add_all(posts)
# tags
journal = Tag(name='Journal')

sports = Tag(name='Sports')

review = Tag(name='Review')

tags = [journal, sports, review]

db.session.add_all(tags)

db.session.commit()
