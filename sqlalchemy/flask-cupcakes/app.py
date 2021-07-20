"""Flask app for Cupcakes"""
from flask import Flask, request, render_template, jsonify
from models import db, connect_db, Cupcake


app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = '12345'

connect_db(app)


# routes
@app.route('/')
def root():
    '''root page'''
    return render_template('index.html')


@app.route('/api/cupcakes')
def get_cupcakes():
    '''data about all cupcakes'''
    cupcakes = [cupcake.to_dictionary() for cupcake in Cupcake.query.all()]
    return jsonify(cupcakes=cupcakes)


@app.route('/api/cupcakes/<int:cupcake_id>')
def get_cupcake(cupcake_id):
    '''data about a cupcake based on id'''
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    return jsonify(cupcake=cupcake.to_dictionary())


@app.route('/api/cupcakes', methods=['POST'])
def post_cupcake():
    '''add new cupcake, and return it'''
    data = request.json
    cupcake = Cupcake(
        flavor=data['flavor'],
        rating=data['rating'],
        size=data['size'],
        image=data['image' or None]
    )
    db.session.add(cupcake)
    db.session.commit()
    # after running tests figured out had to set this to 201 for created
    return (jsonify(cupcake=cupcake.to_dictionary()), 201)
