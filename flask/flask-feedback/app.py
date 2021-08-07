from flask import Flask, render_template, redirect, session
from flask.helpers import flash
from flask_debugtoolbar import DebugToolbarExtension
from werkzeug.exceptions import Unauthorized
from models import Feedback, connect_db, db, User
from forms import DeleteForm, LoginForm, RegisterForm, FeedbackForm

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql:///flask_feedback"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = '12345'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

connect_db(app)

toolbar = DebugToolbarExtension(app)


@app.errorhandler(404)
def page_not_found(e):
    '''renders the custom 404 page for any page that is not on route, not just get_or_404 errors'''
    return render_template('404.html'), 404


@app.route('/')
def homepage():
    '''homepage, redirects to register'''
    return redirect('/register')


@app.route('/register', methods=['GET', 'POST'])
def register():
    '''register new user, handle registration form, and redirect user to 'custom' (formerly secret) user page if logged in'''
    if 'username' in session:
        return redirect(f'/users/{session["username"]}')

    form = RegisterForm()

    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        email = form.email.data
        first_name = form.first_name.data
        last_name = form.last_name.data

        user = User.register(username, password, email, first_name, last_name)

        db.session.add(user)
        db.session.commit()
        session['username'] = user.username
        flash('Your account has been created', 'success')
        return redirect(f'/users/{username}')

    else:
        return render_template('users/register.html', form=form)


@app.route('/login', methods=['GET', 'POST'])
def login():
    '''GET and POST user login form, if user already logged in redirect to 'custom' (formerly secret) user page'''
    if 'username' in session:
        return redirect(f'/users/{session["username"]}')

    form = LoginForm()

    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data

        user = User.authenticate(username, password)
        if user:
            session['username'] = user.username
            return redirect(f'/users/{user.username}')
        else:
            form.username.errors = ['INVALID USERNAME OR PASSWORD!']
            return render_template('users/login.html', form=form)
    return render_template('users/login.html', form=form)


@app.route('/logout')
def logout():
    '''if user logged in, log them out. redirect to login page'''
    # if 'username' not in session:
    #     return render_template('404.html')
    session.pop('username')
    return redirect('/login')


@app.route('/users/<username>')
def show_user(username):
    '''shows a page for logged in users'''
    if 'username' not in session or username != session['username']:
        raise Unauthorized()
    user = User.query.filter_by(username=username).first()
    form = DeleteForm()
    return render_template('users/show.html', user=user, form=form)


@app.route('/users/<username>/delete', methods=['POST'])
def delete_user(username):
    '''remove user and feedback, then redirect to login'''
    if 'username' not in session or username != session['username']:
        raise Unauthorized()
    user = User.query.get(username)
    db.session.delete(user)
    db.session.commit()
    session.pop('username')
    flash('Your account has been deleted!', 'danger')
    return redirect('/')


@app.route('/users/<username>/feedback/new', methods=['GET', 'POST'])
def add_feedback(username):
    '''show feedback form and post it'''
    if 'username' not in session or username != session['username']:
        raise Unauthorized()
    form = FeedbackForm()
    if form.validate_on_submit():
        title = form.title.data
        content = form.content.data
        feedback = Feedback(title=title, content=content, username=username)

        db.session.add(feedback)
        db.session.commit()
        flash('Feedback submitted!', 'success')
        return redirect(f'/users/{username}')
    return render_template('feedback/new.html', form=form)


@app.route('/feedback/<int:feedback_id>/update', methods=['GET', 'POST'])
def update_feedback(feedback_id):
    '''get update info from form and post it'''
    feedback = Feedback.query.get(feedback_id)
    if 'username' not in session or feedback.username != session['username']:
        raise Unauthorized()
    form = FeedbackForm(obj=feedback)
    if form.validate_on_submit():
        feedback.title = form.title.data
        feedback.content = form.content.data

        db.session.commit()
        flash('Feedback updated!', 'success')
        return redirect(f'/users/{feedback.username}')
    return render_template('/feedback/edit.html', form=form, feedback=feedback)


@app.route('/feedback/<int:feedback_id>/delete', methods=['POST'])
def delete_feedback(feedback_id):
    '''delete a feedback post'''
    feedback = Feedback.query.get(feedback_id)
    if 'username' not in session or feedback.username != session['username']:
        raise Unauthorized()
    form = DeleteForm()
    if form.validate_on_submit():
        db.session.delete(feedback)
        db.session.commit()
        flash('Feedback removed!', 'danger')
    return redirect(f'/users/{feedback.username}')
