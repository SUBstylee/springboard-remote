from flask import Flask, url_for, render_template, redirect, flash, jsonify
from flask_debugtoolbar import DebugToolbarExtension

from models import db, connect_db, Pet
from forms import AddPetForm, EditPetForm

app = Flask(__name__)

app.config['SECRET_KEY'] = '12345'

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///adopt'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

connect_db(app)
db.create_all()

# app.config['DEBUG_TB_INTERCEPT_REDIRECTS']=False
toolbar = DebugToolbarExtension(app)

# routes


@app.route('/')
def all_pets():
    '''display all pets'''
    pets = Pet.query.all()
    return render_template('all_pets.html', pets=pets)


@app.route('/add', methods=['GET', 'POST'])
def add_pet():
    '''add a new pet'''
    form = AddPetForm()
    if form.validate_on_submit():
        data = {k: v for k, v in form.data.items() if k != 'csrf_token'}
        new_pet = Pet(**data)
        db.session.add(new_pet)
        db.session.commit()
        flash(f'{new_pet.name} has been added!')
        return redirect(url_for('all_pets'))
    else:
        return render_template('add_pet.html', form=form)


@app.route('/<int:pet_id>', methods=['GET', 'POST'])
def edit_pet(pet_id):
    '''edit an existing pet'''
    pet = Pet.query.get_or_404(pet_id)
    form = EditPetForm(obj=pet)
    if form.validate_on_submit():
        pet.notes = form.notes.data
        pet.available = form.available.data
        pet.photo_url = form.photo_url.data
        db.session.commit()
        flash(f'{pet.name} has been updated!')
        return redirect(url_for('all_pets'))
    else:
        return render_template("edit_pet.html", form=form, pet=pet)


@app.route('/api/pets/<int:pet_id>', methods=['GET'])
def api_get_pet(pet_id):
    '''return the pet info in JSON'''
    pet = Pet.query.get_or_404(pet_id)
    info = {'name': pet.name, 'age': pet.age}
    return jsonify(info)
