from flask import Flask, request, redirect, render_template, flash
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User, Post

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = '12345'

#app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

toolbar = DebugToolbarExtension(app)

connect_db(app)
db.create_all()

# routes


@app.route('/')
def root():
    '''root page shows recent posts, newest first'''

    posts = Post.query.order_by(Post.created_at.desc()).limit(5).all()
    return render_template('posts/homepage.html', posts=posts)

# 404 error handler


@app.errorhandler(404)
def page_not_found(e):
    '''displays custom page for 404 error (https://flask.palletsprojects.com/en/1.1.x/patterns/errorpages/)'''
    return render_template('404.html'), 404


# users
@app.route('/users')
def user_list():
    '''shows list of users (link to details or add user)'''
    users = User.query.order_by(User.last_name, User.first_name).all()
    return render_template('users/index.html', users=users)


@app.route('/users/new', methods=['GET'])
def new_user_form():
    '''new user form'''
    return render_template('users/new.html')


@app.route('/users/new', methods=['POST'])
def add_new_user():
    '''add new user to db'''
    new_user = User(
        first_name=request.form['first_name'],
        last_name=request.form['last_name'],
        img_url=request.form['img_url'] or None)

    db.session.add(new_user)
    db.session.commit()
    flash(f'{new_user.full_name} has been added')

    return redirect('/users')


@app.route('/users/<int:user_id>')
def show_user(user_id):
    '''show individual user page'''
    user = User.query.get_or_404(user_id)
    posts = Post.query.filter(Post.user_id == user_id).all()
    return render_template('users/show.html', user=user, posts=posts)


@app.route('/users/<int:user_id>/edit')
def edit_user_form(user_id):
    '''show edit form'''
    user = User.query.get_or_404(user_id)
    return render_template('users/edit.html', user=user)


@app.route('/users/<int:user_id>/edit', methods=['POST'])
def edit_user(user_id):
    '''edit user data'''
    user = User.query.get_or_404(user_id)
    user.first_name = request.form['first_name']
    user.last_name = request.form['last_name']
    user.img_url = request.form['img_url']

    db.session.add(user)
    db.session.commit()
    flash(f'{user.full_name} has been edited.')

    return redirect('/users')


@app.route('/users/<int:user_id>/delete', methods=['POST'])
def delete_user(user_id):
    '''delete a user'''
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    flash(f'{user.full_name} has been deleted.')

    return redirect('/users')

# posts


@app.route('/users/<int:user_id>/posts/new')
def new_post_form(user_id):
    '''form to create new post'''
    user = User.query.get_or_404(user_id)
    return render_template('posts/new.html', user=user)


@app.route('/users/<int:user_id>/posts/new', methods=['POST'])
def posts_new(user_id):
    '''creates new post by user'''
    user = User.query.get_or_404(user_id)
    new_post = Post(title=request.form['title'],
                    content=request.form['content'],
                    user=user)
    db.session.add(new_post)
    db.session.commit()
    flash(f'{new_post.title} has been added.')
    return redirect(f'/users/{user.id}')


@app.route('/posts/<int:post_id>')
def show_post(post_id):
    '''show an individual post'''
    post = Post.query.get_or_404(post_id)
    return render_template('posts/show.html', post=post)


@app.route('/posts/<int:post_id>/edit')
def edit_post(post_id):
    '''form for editing a post'''
    post = Post.query.get_or_404(post_id)
    return render_template('/posts/edit.html', post=post)


@app.route('/posts/<int:post_id>/edit', methods=['POST'])
def submit_edit_post(post_id):
    '''submits edited post'''
    post = Post.query.get_or_404(post_id)
    post.title = request.form['title']
    post.content = request.form['content']
    db.session.add(post)
    db.session.commit()
    flash(f'{post.title} has been edited.')
    return redirect(f'/user/{post.user_id}')


@app.route('/posts/<int:post_id>/delete', methods=['POST'])
def delete_post(post_id):
    post = Post.query.get_or_404(post_id)
    db.session.delete(post)
    db.session.commit()
    flash(f'{post.title} has been deleted.')
    return redirect(f'/users/{post.user_id}')
