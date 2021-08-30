'''Message model tests'''

from test_user_model import U_DATA1
from app import app
import os
from unittest import TestCase

from models import db, User, Message, Follows, Likes
from sqlalchemy.exc import IntegrityError
from datetime import datetime

os.environ['DATABASE_URL'] = "postgresql:///warbler-test"

db.create_all()

U_DATA = {
    "email": "test@test.com",
    "username": "testuser",
    "password": "HASHED_PASSWORD"
}


class MessageModelTestCase(TestCase):
    '''Tests for message model'''

    def setUp(self):
        '''Create test client'''

        User.query.delete()
        Message.query.delete()
        Follows.query.delete()
        Likes.query.delete()

        self.client = app.test_client()

        user = User(**U_DATA)

        db.session.add(user)
        db.session.commit()

        self.user = user

        test_message = {
            "user_id": self.user.id,
            "text": "test_message"
        }

        message = Message(**test_message)

        db.session.add(message)
        db.session.commit()

        self.message = message

    def tearDown(self):
        '''Clean up fouled transactions'''

        db.session.rollback()

    def test_message_model(self):
        '''Does message model work?'''
        test_message2 = Message(text='test_message2')

        self.assertEqual(len(self.user.messages), 1)
        self.assertEqual(Message.query.count(), 1)

        self.assertEqual(self.message.text, "test_message")
        self.assertEqual(self.message.user_id, self.user.id)
        self.assertIsInstance(self.message.timestamp, datetime)

        self.assertEqual(self.message.user_id, self.user.id)

        self.user.messages.append(test_message2)
        db.session.commit()

        self.assertEqual(len(self.user.messages), 2)
        self.assertEqual(Message.query.count(), 2)

    def test_message_model_fail(self):
        '''Does message creation fail when no message is passed in?'''
        with self.assertRaises(IntegrityError):
            message = Message(user_id=self.user.id)
            db.session.add(message)
            db.session.commit()
        db.session.rollback()
        self.assertEqual(Message.query.count(), 1)
