from unittest import TestCase

from app import app
from models import db, User, Post

# fake database for tests
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_test'
app.config['SQLALCHEMY_ECHO'] = False


app.config['TESTING'] = True

db.drop_all()
db.create_all()


class UserViewsTestCase(TestCase):
    '''test user routes'''

    def setUp(self):
        '''add a user'''
        user = User(first_name='Bart', last_name='Simpson')
        db.session.add(user)
        db.session.commit()

        self.user_id = user.id

    def tearDown(self):
        '''cleanup'''

        db.session.rollback()

    def test_list_users(self):
        with app.test_client() as client:
            resp = client.get('/users')
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('Bart', html)

    def test_show_user(self):
        with app.test_client() as client:
            resp = client.get(f'/users/{self.user_id}')
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('Bart Simpson', html)


class PostViewsTestCase(TestCase):
    '''test post routes'''

    def setUp(self):
        '''add a user and post'''

        # make a user
        user = User(first_name='Bart', last_name='Simpson')
        db.session.add(user)
        db.session.commit()

        self.user_id = user.id

        # make a post
        Post.query.delete()

        post = Post(title='Eat my shorts', content='Denim for dinner.',
                    user_id=self.user_id)

        db.session.add(post)
        db.session.commit()

        self.post_id = post.id

    def tearDown(self):
        '''cleanup'''

        db.session.rollback()

    def test_list_posts(self):
        with app.test_client() as client:
            resp = client.get(f'/users/{self.user_id}')
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('Eat my shorts', html)
