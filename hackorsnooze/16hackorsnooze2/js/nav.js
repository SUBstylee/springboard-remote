"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
  // hideForms();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

//show submit new story form on click

function submitStoryClick(e) {
  console.debug('submitStoryClick', e);
  hidePageComponents();
  $submitForm.show();
}

$navSubmit.on("click", submitStoryClick);

//show favorite stories list on click

function favoriteClick(e) {
  console.debug('favoriteClick', e);
  hidePageComponents();
  putFavoriteList();
}
$navFavorites.on('click', favoriteClick);

//show my stories list on click

function myStoriesClick(e) {
  console.debug('myStoriesClick', e);
  hidePageComponents();
  putMyStoriesList();
}
$navMyStories.on('click', myStoriesClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

// When a user logs in, creates an account, submits a new story, hide the forms.
function hideForms() {
  $loginSection.hide();
  $submitForm.hide();
}
