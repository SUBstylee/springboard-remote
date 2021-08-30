"""Message View tests."""

# run these tests like:
#
#    FLASK_ENV=production python -m unittest test_message_views.py


from app import app, CURR_USER_KEY
import os
from unittest import TestCase

from models import db, connect_db, Message, User

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


class MessageViewTestCase(TestCase):
    """Test views for messages."""

    def setUp(self):
        """Create test client, add sample data."""

        User.query.delete()
        Message.query.delete()

        self.client = app.test_client()

        self.testuser = User.signup(username="testuser",
                                    email="test@test.com",
                                    password="testuser",
                                    image_url=None)

        db.session.commit()

    def tearDown(self):
        '''clean up fouled transactions'''

        db.session.rollback()

    def test_add_message(self):
        """Can use add a message?"""

        # Since we need to change the session to mimic logging in,
        # we need to use the changing-session trick:

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.testuser.id

            # Now, that session setting is saved, so we can have
            # the rest of ours test

            resp = c.post("/messages/new", data={"text": "Hello"})

            # Make sure it redirects
            self.assertEqual(resp.status_code, 302)

            msg = Message.query.one()
            self.assertEqual(msg.text, "Hello")

            self.assertEqual(Message.query.count(), 1)

    def test_add_message_logged_out(self):
        '''Can a logged out user add a message?'''

        # added follow_redirects so status code is 200
        with self.client as c:
            resp = c.post('/messages/new',
                          data={"text": "Hello"}, follow_redirects=True)
        html = resp.get_data(as_text=True)

        self.assertEqual(resp.status_code, 200)
        self.assertIn('Access unauthorized.', html)

    def test_add_empty_message(self):
        '''Can user add a message if required field left blank?'''

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.testuser.id

            resp = c.post('/messages/new',
                          data={"text": ""}, follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('Add my message!', html)
            self.assertEqual(Message.query.count(), 0)

    def test_message_shown(self):
        '''Are messages being shown?'''

        with self.client as c:

            message_data = {
                'user_id': self.testuser.id,
                'text': 'test_message'
            }

            message = Message(**message_data)
            db.session.add(message)
            db.session.commit()

            resp = c.get(f'/messages/{message.id}')
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('test_message', html)
            self.assertEqual(Message.query.count(), 1)

    def test_message_delete(self):
        '''Are messages being deleted?'''

        with self.client as c:

            # delete message made before
            resp = c.post(
                f'/messages/1/delete', follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertNotIn('test_message', html)
            self.assertEqual(Message.query.count(), 0)

    def test_different_user_message_delete(self):
        '''Can a message be deleted by a different user?'''

        testuser2 = User.signup(username='testuser2',
                                email='test2@test.com',
                                password='testuser2',
                                image_url=None)
        db.session.commit()

        message_data = {
            'user_id': self.testuser.id,
            'text': 'test_message'
        }

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = testuser2.id

            message = Message(**message_data)
            db.session.add(message)
            db.session.commit()

            message = Message(**message_data)
            db.session.add(message)
            db.session.commit()

            resp = c.post(
                f'/messages/{message.id}/delete',
                follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertEqual(Message.query.count(), 1)

    def test_logged_out_message_delete(self):
        '''Can a logged out user delete a message?'''

        with self.client as c:
            resp = c.post(
                f'/messages/1/delete',
                follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('Access unauthorized.', html)
