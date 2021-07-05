from flask import Flask, request, redirect, render_template, flash
from flask_debugtoolbar import DebugToolbarExtension
# from models import PostTag (wasn't used here, but leaving this as reminder for relationships)
from models import db, connect_db, User, Post, Tag

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = '12345'

# comment next line out if you want debug to pause for redirects
# app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

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
        img_url=request.form['img_url'] or None)  # will use default.jpg in static folder if left empty (None)

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
    tags = Tag.query.all()
    return render_template('posts/new.html', user=user, tags=tags)


@app.route('/users/<int:user_id>/posts/new', methods=['POST'])
def posts_new(user_id):
    '''creates new post by user'''
    user = User.query.get_or_404(user_id)
    tag_ids = [int(num) for num in request.form.getlist('tags')]
    tags = Tag.query.filter(Tag.id.in_(tag_ids)).all()
    new_post = Post(title=request.form['title'],
                    content=request.form['content'],
                    user=user, tags=tags)
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
    tags = Tag.query.all()
    return render_template('/posts/edit.html', post=post, tags=tags)


@app.route('/posts/<int:post_id>/edit', methods=['POST'])
def submit_edit_post(post_id):
    '''submits edits to a post'''
    post = Post.query.get_or_404(post_id)
    post.title = request.form['title']
    post.content = request.form['content']
    tag_ids = [int(num) for num in request.form.getlist('tags')]
    post.tags = Tag.query.filter(Tag.id.in_(tag_ids)).all()
    db.session.add(post)
    db.session.commit()
    flash(f'{post.title} has been edited.')
    # changed from user.id to user_id due to relationship
    return redirect(f'/users/{post.user_id}')


@app.route('/posts/<int:post_id>/delete', methods=['POST'])
def delete_post(post_id):
    '''delete a post'''
    post = Post.query.get_or_404(post_id)
    db.session.delete(post)
    db.session.commit()
    flash(f'{post.title} has been deleted.')
    return redirect(f'/users/{post.user_id}')

# tags


@app.route('/tags')
def tags_index():
    '''show all tags'''
    tags = Tag.query.all()
    return render_template('tags/index.html', tags=tags)


@app.route('/tags/new')
def new_tag():
    '''create new tag form'''
    posts = Post.query.all()
    return render_template('tags/new.html', posts=posts)


@app.route('/tags/new', methods=['POST'])  # post
def new_tag_post():
    '''form submission for new tag'''
    post_ids = [int(num) for num in request.form.getlist('posts')]
    posts = Post.query.filter(Post.id.in_(post_ids)).all()
    new_tag = Tag(name=request.form['name'], posts=posts)

    db.session.add(new_tag)
    db.session.commit()
    flash(f'{new_tag.name} has been added')

    return redirect('/tags')


@app.route('/tags/<int:tag_id>')
def display_tag(tag_id):
    '''show info on a tag'''
    tag = Tag.query.get_or_404(tag_id)
    return render_template('tags/show.html', tag=tag)


@app.route('/tags/<int:tag_id>/edit')
def edit_tag(tag_id):
    '''form for editing a tag'''
    tag = Tag.query.get_or_404(tag_id)
    posts = Post.query.all()
    return render_template('tags/edit.html', tag=tag, posts=posts)


@app.route('/tags/<int:tag_id>/edit', methods=['POST'])  # post
def edit_tag_post(tag_id):
    '''post form for editing a tag'''
    tag = Tag.query.get_or_404(tag_id)
    tag.name = request.form['name']
    post_ids = [int(num) for num in request.form.getlist('posts')]
    tag.posts = Post.query.filter(Post.id.in_(post_ids)).all()

    db.session.add(tag)
    db.session.commit()
    flash(f'{tag.name} has been edited.')

    return redirect('/tags')


@app.route('/tags/<int:tag_id>/delete', methods=['POST'])  # post
def delete_tag(tag_id):
    '''delete a tag'''
    tag = Tag.query.get_or_404(tag_id)
    db.session.delete(tag)
    db.session.commit()
    flash(f'{tag.name} has been deleted')

    return redirect('/tags')
