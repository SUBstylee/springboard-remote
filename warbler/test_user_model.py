"""User model tests."""

# run these tests like:
#
#    python -m unittest test_user_model.py


from app import app
import os
from unittest import TestCase

from models import db, User, Message, Follows, Likes

from flask_bcrypt import Bcrypt
# needed for testing unique value error
from sqlalchemy.exc import IntegrityError

# BEFORE we import our app, let's set an environmental variable
# to use a different database for tests (we need to do this
# before we import our app, since that will have already
# connected to the database

os.environ['DATABASE_URL'] = "postgresql:///warbler-test"


# Now we can import app


# Create our tables (we do this here, so we only create the tables
# once for all tests --- in each test, we'll delete the data
# and create fresh new clean test data

db.create_all()
bcrypt = Bcrypt()

U_DATA1 = {
    'email': 'test1@test.com',
    'username': 'testuser1',
    'password': 'HASHED_PASSWORD1'
}

U_DATA2 = {
    'email': 'test2@test.com',
    'username': 'testuser2',
    'password': 'HASHED_PASSWORD2'
}

U_DATA3 = {
    'email': 'test3@test.com',
    'username': 'testuser3',
    'password': 'HASHED_PASSWORD3',
    'image_url': User.image_url.default.arg
}


class UserModelTestCase(TestCase):
    """Test views for messages."""

    def setUp(self):
        """Create test client, add sample data."""

        User.query.delete()
        Message.query.delete()
        Follows.query.delete()

        self.client = app.test_client()

        u = User(**U_DATA1)
        u2 = User(**U_DATA2)

        db.session.add(u)
        db.session.add(u2)
        db.session.commit()

        # changed this to storing self.user_id instead of the instance itself
        ##############
        self.user = u
        self.user2 = u2
        ##############

    def tearDown(self):
        '''Clean up fouled transactions'''

        db.session.rollback()

    def test_user_model(self):
        """Does basic model work?"""

        # moved some of this to setUp

        # User should have no messages, no followers, no likes, and not be following any other users
        self.assertEqual(len(self.user.messages), 0)
        self.assertEqual(len(self.user.followers), 0)
        self.assertEqual(len(self.user.following), 0)
        self.assertEqual(len(self.user.likes), 0)

    def test_user_following(self):
        '''Does is_following successfully detect when user1 is/isn't following user2?'''
        # user is following
        self.user.following.append(self.user2)
        self.assertTrue(self.user.is_following(self.user2))

        # user is not following
        self.user.following.remove(self.user2)
        self.assertFalse(self.user.is_following(self.user2))

    def test_user_followed(self):
        '''Does is_followed_by successfully detect when user1 is/isnt followed by user2?'''
        # user is followed
        self.user.followers.append(self.user2)
        self.assertTrue(self.user.is_followed_by(self.user2))

        # user is not followed
        self.user.followers.remove(self.user2)
        self.assertFalse(self.user.is_followed_by(self.user2))

    def test_user_signup(self):
        '''Does User.create successfully create a new user given valid credentials?'''

        new_signup = User.signup(**U_DATA3)
        db.session.commit()

        self.assertIsInstance(new_signup.id, int)
        self.assertEqual(User.query.count(), 3)

    def test_user_signup_fail(self):
        '''Does User.create fail to create a new user if any of the validations (e.g. uniqueness, non-nullable fields) fail?'''

        # signup fails if required value left empty
        U_DATA3.pop('username')
        with self.assertRaises(TypeError):
            new_user = User.signup(**U_DATA3)

        self.assertEqual(User.query.count(), 2)

        # signup fails if username not unique
        U_DATA3['username'] = U_DATA1['username']
        with self.assertRaises(IntegrityError):
            new_user = User.signup(**U_DATA3)
            db.session.add(new_user)
            db.session.commit()

        db.session.rollback()
        self.assertEqual(User.query.count(), 2)

    def test_user_authenticate(self):
        '''Does User.authenticate successfully return a user when given a valid username and password?  Does User.authenticate fail to return a user when the username or password is invalid?'''

        # needed to hash password and compare
        pw = U_DATA3['password']
        U_DATA3['password'] = bcrypt.generate_password_hash(
            U_DATA3['password']).decode('UTF-8')
        new_user = User(**U_DATA3)

        db.session.add(new_user)
        db.session.commit()

        # test if authenticate is successful with correct username and password
        self.assertEqual(User.authenticate(U_DATA3['username'], pw), new_user)

        # test if authenticate fails on wrong password
        self.assertFalse(User.authenticate(
            U_DATA3['password'], 'wrongpassword'))

        # test if authenticate fails on wrong username
        self.assertFalse(User.authenticate('wrongusername', pw))
