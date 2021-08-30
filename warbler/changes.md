added **.gitignore**

checked functionality.

## Part 1: Fix Current Features

1. model

2. fixed **Logout**

    - implement logout route
    - flash success and redirect to login page

3. fixed **User Profile**

    - location
    - bio
    - header image background

4. fixed **User Cards**
    
    - Followers, following, and list-users pages the user cards need to show the bio for the users.

5. fixed **Edit Profile**

    - ensure user is logged in
    - show form with following:

        - username
        - email
        - img url
        - header img url
        - bio
        - location
        - password:

            - check password is valid length, flash error and return to homepae if not
            - this is to verify edit, _NOT_ change password
            - on success, will redirect user to user detail page, flash success

6. fixed **Homepage**

    - Show only the last 100 warbles from logged in user and users that they are following, rather than from all users

7. Research and understand login strategy:

    1. How is the logged in user being kept track of?
    
        - Using the CURR_USER_KEY variable and the global namespace

    2. What is Flask’s g object?
    
        - Global namespace object that holds data you want during a single app context

    3. What is the purpose of add_user_to_g?
    
        - It adds the current user to the Flask global object

    4. What does @app.before_request mean?

        - It is a handler that makes g.user accessible to the routes and other functions

## Part 2: Add Likes

1. Added likes:
    
    - allow users to like a warble
    - allow users to unlike a warble
    - on profile page show how many warbles that user has liked, and link to page showing all liked warbles

## Part 3: Add Tests