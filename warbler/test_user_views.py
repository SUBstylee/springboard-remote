'''User view tests'''
from app import app, CURR_USER_KEY
import os
from unittest import TestCase

from models import db, connect_db, Message, User, Follows, Likes

# BEFORE we import our app, let's set an environmental variable
# to use a different database for tests (we need to do this
# before we import our app, since that will have already
# connected to the database

os.environ['DATABASE_URL'] = "postgresql:///warbler-test"


# Now we can import app

# don't use Flask DebugToolbar
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

# Flask errors are real errors, instead of HTML pages with error info
app.config['TESTING'] = True

# turn off debugtoolbar intercept redirects
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

# Create our tables (we do this here, so we only create the tables
# once for all tests --- in each test, we'll delete the data
# and create fresh new clean test data

db.create_all()

# Don't have WTForms use CSRF at all, since it's a pain to test

app.config['WTF_CSRF_ENABLED'] = False


class UserViewTestCase(TestCase):
    '''Test views for users.'''

    def setUp(self):
        '''Create test client, add sample data.'''

        Follows.query.delete()
        Likes.query.delete()
        User.query.delete()
        Message.query.delete()

        self.client = app.test_client()

        test_user1 = User.signup(
            username='testuser',
            email='test@test.com',
            password='testuser',
            image_url=None)

        test_user2 = User.signup(
            username='testuser2',
            email='test@test2.com',
            password='testuser2',
            image_url=None)

        db.session.commit()

        self.testuser1_id = test_user1.id
        self.testuser2_id = test_user2.id

    def tearDown(self):
        '''clean up fouled transactions'''

        db.session.rollback()

    def test_users_following(self):
        '''Can logged in user see the following page for other users?'''

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.testuser2_id

        user1 = User.query.get(self.testuser1_id)
        user2 = User.query.get(self.testuser2_id)
        user1.following.append(user2)
        db.session.commit()

        resp = c.get(
            f'/users/{self.testuser1_id}/following')

        html = resp.get_data(as_text=True)
        self.assertIn('testuser2', html)

    def test_users_following_logged_out(self):
        '''Can a logged out user see the following page for other users?'''

        user1 = User.query.get(self.testuser1_id)
        user2 = User.query.get(self.testuser2_id)
        user1.following.append(user2)
        db.session.commit()

        resp = self.client.get(
            f'/users/{self.testuser1_id}/following',
            follow_redirects=True)

        html = resp.get_data(as_text=True)

        self.assertEqual(resp.status_code, 200)
        self.assertIn('Access unauthorized.', html)

    def test_users_followers(self):
        '''Can logged in user see the followers page of other users?'''

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.testuser2_id

        user1 = User.query.get(self.testuser1_id)
        user2 = User.query.get(self.testuser2_id)
        user1.followers.append(user2)
        db.session.commit()

        resp = c.get(
            f'/users/{self.testuser1_id}/followers')

        html = resp.get_data(as_text=True)
        self.assertIn('testuser2', html)

    def test_users_followers_logged_out(self):
        '''Can logged out user see the followers page of other users?'''

        user1 = User.query.get(self.testuser1_id)
        user2 = User.query.get(self.testuser2_id)
        user1.followers.append(user2)
        db.session.commit()

        resp = self.client.get(
            f'/users/{self.testuser1_id}/followers',
            follow_redirects=True)

        html = resp.get_data(as_text=True)

        self.assertEqual(resp.status_code, 200)
        self.assertIn('Access unauthorized.', html)

    def test_login(self):
        '''Can a user login and logout?'''

        user1 = User.query.get(self.testuser1_id)

        with self.client as c:
            resp = c.post(
                '/login',
                data={
                    'username': user1.username,
                    'password': 'testuser'
                },
                follow_redirects=True)

            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn(f'Hello, {user1.username}!', html)

    def test_login_fail(self):
        '''Can a user log in with bad credentials?'''

        user1 = User.query.get_or_404(self.testuser1_id)

        with self.client as c:
            resp = c.post(
                '/login',
                data={
                    'username': user1.username,
                    'password': 'wrongpassword'
                },
                follow_redirects=True)

            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('Invalid credentials', html)

    def test_logout(self):
        '''Can a user log out?'''

        with self.client as c:
            resp = c.get(
                '/logout',
                follow_redirects=True)

            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('You have been logged out.', html)

    def test_user_profile(self):
        '''Can a user update their profile?'''

        user1 = User.query.get(self.testuser1_id)

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.testuser1_id

            resp = c.post(
                '/users/profile',
                data={
                    'username': user1.username,
                    'email': user1.email,
                    'image_url': user1.image_url,
                    'header_image_url': user1.header_image_url,
                    'bio': 'new bio!',
                    'password': 'testuser',
                },
                follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('new bio!', html)

    def test_user_profile_invalid_cred(self):
        '''Can a user update their profile with wrong password?'''

        user1 = User.query.get(self.testuser1_id)

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.testuser1_id
            resp = c.post(
                '/users/profile',
                data={
                    'username': user1.username,
                    'email': user1.email,
                    'image_url': user1.image_url,
                    'header_image_url': user1.header_image_url,
                    'bio': 'new bio!',
                    'password': 'wrongpassword',
                },
                follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('Unauthorized', html)

    def test_user_profile_logged_out(self):
        '''Can a user update profile if logged out?'''

        user1 = User.query.get(self.testuser1_id)

        with self.client as c:

            resp = c.post(
                '/users/profile',
                data={
                    'username': user1.username,
                    'email': user1.email,
                    'image_url': user1.image_url,
                    'header_image_url': user1.header_image_url,
                    'bio': 'new bio!',
                    'password': 'testuser',
                },
                follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('Access unauthorized', html)

    def test_user_profile_invalid_form(self):
        '''Can a user update profile if form is missing required data?'''

        user1 = User.query.get_or_404(self.testuser1_id)

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.testuser1_id

            resp = c.post(
                '/users/profile',
                data={
                    'username': "",
                    'email': user1.email,
                    'image_url': user1.image_url,
                    'header_image_url': user1.header_image_url,
                    'bio': 'new bio!',
                    'password': 'testuser',
                },
                follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn(f'{user1.image_url}', html)

            user = User.query.get_or_404(self.testuser1_id)
            self.assertNotEqual(user.username, "")

    def test_user_delete(self):
        '''Can a user be deleted?'''

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.testuser1_id

            resp = c.post(
                '/users/delete',
                follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('Join Warbler today.', html)
            self.assertEqual(User.query.count(), 1)

    def test_user_delete_logged_out(self):
        '''Can a user be deleted if logged out?'''

        with self.client as c:

            resp = c.post(
                '/users/delete',
                follow_redirects=True)
            html = resp.get_data(as_text=True)
            self.assertEqual(resp.status_code, 200)
            self.assertIn('Access unauthorized', html)
