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

## need to fix:

    2. Delete Profile
    3. Likes
    3. User Cards
        a. on followers, following, and list-users page - show bio for users
    4. Edit Profile
        a. ensure user is logged in
        b. show form with following:
            i. username
            ii. email
            iii. image_url
            iv. header_image_url
            v. bio
            vi. password
                - check password is valid length, flash error and return to homepage if not
                - this is to verify edit, NOT change password
                - on success will redirect user to user detail page
    5. Fix homepage
        a. for logged-in-users should show the last 100 warbles ONLY from users the logged-in user is following and logged in   user, rather than all users
    6. Research and Understand Login Strategy
        a. look over the code in app.py related to authentication
            i. how is logged in user being kept track of?
            ii. what is flask's 'g' object?
            iii. what is the purpose of 'add_user_to_g'?
            iv. what does '@app.before_request' mean? 
    need to add:
    1. Add Likes (do this without AJAX/JS first, then later in further study can change to AJAX/JS)
        a. add feature to 'like' a warble. only like warbles written by other users. put symbol (star?) next to likes warbles
        b. should be able to unlike a warble

## Part 2: Add Likes


## Part 3: Add Tests