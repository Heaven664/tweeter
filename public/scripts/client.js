/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
};

const createTweetElement = (tweet) => {
  const $tweet = $(`
  <article class="tweet">
    <header>
      <div class="user-preview">
        <img src="${tweet.user.avatars}">
        <p>${tweet.user.name}</p>
      </div>
      <p>${tweet.user.handle}</p>
    </header>
    <div>
      <h4>${tweet.content.text}</h4>
    </div>
    <footer>
      <p>${tweet.created_at}</p>
      <div class="tweet-options">
        <i class="fa-solid fa-flag fa-xs"></i>
        <i class="fa-solid fa-retweet fa-xs"></i>
        <i class="fa-solid fa-heart fa-xs"></i>
      </div>
    </footer>
  </article>`);
  
  return $tweet;
};

$(() => {
  const $tweet = createTweetElement(tweetData);
  console.log($tweet);
  $('.tweets-container').append($tweet);
})

