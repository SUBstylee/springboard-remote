"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story, storyNum, deleteBtn = false) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  //if user is logged in, show star
  const showStar = Boolean(currentUser);
  return $(`
    <li id="${story.storyId}">
        <span class='story-top'>
          ${storyNum}.
          <span class'buttons'>
            ${deleteBtn ? deleteBtnHTML() : ''}
            ${showStar ? starBtnHTML(story, currentUser) : ''}
          </span>
        </span>

        <iframe src="${story.url}" frameborder="0" scrolling='no'></iframe>
          <p><a href="${story.url}" target="a_blank" class="story-link">
            ${story.title}
          </a></p>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
    </li>
    <hr>
    `);
}

//toggle favorite status
function starBtnHTML(story, user) {
  const isFavoriteStory = user.isFavoriteStory(story);
  const starFill = isFavoriteStory ? 'fas' : 'far';//solid or outline star
  return `<span class='star'><i class='${starFill} fa-star'></i></span>`;
}

//Toggles favoriting/unfavoriting a story

async function toggleStoryFavorite(e) {
  console.debug('toggleStoryFavorite');

  const $target = $(e.target);
  const $closestLi = $target.closest('li');
  const storyId = $closestLi.attr('id');
  const story = storyList.stories.find((s) => s.storyId === storyId);

  // checks to see if the target is favorited
  // fas is a solid star
  if ($target.hasClass('fas')) {
    // toggles story to unfavorite, star is toggled to open star
    await currentUser.removeFavorite(story);
    $target.closest('i').toggleClass('fas far');
  } else {
    // do the opposite if not favorited
    await currentUser.addFavorite(story);
    $target.closest('i').toggleClass('fas far');
  }
}

$storyLists.on('click', '.star', toggleStoryFavorite);

//make delete button
function deleteBtnHTML() {
  return `<span class='trash-can'><i class='fas fa-trash-alt'></i></span>`;
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");
  let storyNum = 1 //counter since it is no longer in an ordered list
  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story, storyNum);//pass counter into function
    $allStoriesList.append($story);
    storyNum++;//add to counter
  }

  $allStoriesList.show();
}


// <!-- reference later for iframe thumbnail hack -->
//   <!-- <div class="thumbnail-container" style="position: absolute;">
//     <div class="thumbnail">
//       <iframe src="https://www.playrust.io/" frameborder="0" scrolling='no'></iframe>
//     </div>
//   </div> -->


// remove a story

async function deleteStory(e) {
  console.debug('deleteStory');
  //targets closest li
  const $closestLi = $(e.target).closest('li');
  const storyId = $closestLi.attr('id');

  await storyList.removeStory(currentUser, storyId);
  // updates story list
  putMyStoriesList();
}

$myStories.on('click', '.trash-can', deleteStory);

//submit story form
async function submitNewStory(e) {
  console.debug('submitNewStory');
  e.preventDefault();

  //input values
  const author = $('#author').val();
  const title = $('#title').val();
  const url = $('#url').val();

  const username = currentUser.username;
  const storyData = { title, url, author, username };

  const story = await storyList.addStory(currentUser, storyData);

  const $story = generateStoryMarkup(story);
  $allStoriesList.prepend($story);

  $submitForm.trigger('reset');
  hidePageComponents();
  putStoriesOnPage();
}

$submitForm.on('submit', submitNewStory);

//favorite stories
function putFavoriteList() {
  console.debug('putFavoriteList');
  let storyNum = 1
  $favoriteStories.empty();
  if (currentUser.favorites.length === 0) {
    $favoriteStories.append('<h2>You currently have no favorites.');
  } else {
    for (let story of currentUser.favorites) {
      const $story = generateStoryMarkup(story, storyNum);
      $favoriteStories.append($story);
      storyNum++;
    }
  }
  $favoriteStories.show();
}

//my stories
function putMyStoriesList() {
  console.debug('putMyStoriesList');
  let storyNum = 1
  $myStories.empty();
  if (currentUser.ownStories.length === 0) {
    $myStories.append('<h2>You have not added any stories.</h2>');
  } else {
    for (let story of currentUser.ownStories) {
      const $story = generateStoryMarkup(story, storyNum, true);
      $myStories.append($story);
      storyNum++;
    }
  }
  $myStories.show();
}