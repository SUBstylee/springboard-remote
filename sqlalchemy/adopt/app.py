from flask import Flask, render_template, redirect, flash
from flask_debugtoolbar import DebugToolbarExtension, toolbar

from models importconnect_db,
from forms import

app = Flask(__name__)

app.config['SECRET_KEY'] = '12345'

app.config['SQLALCHEMY_DATABSE_URI'] = 'postgresql:///adopt'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

connect_db(app)
db.create_all()

# app.config['DEBUG_TB_INTERCEPT_REDIRECTS']=False
toolbar = DebugToolbarExtension(app)

# routes
