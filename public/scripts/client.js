$(() => {
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  /**
   * Renders a list of tweets
   * @param {array} tweets - array of JSON objects
   */
  const renderTweets = (tweets) => {
    for (const tweet of tweets) {
      const tweetElement = createTweetElement(tweet);
      $('.tweets-container').append(tweetElement);
    }
  };

  /**
   * Inserts data from parameter into template to create a new element 
   * @param {object} tweet - JSON object
   * @returns jQuery object
   */
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

  renderTweets(data);

  $('#new-tweet-from').submit((event) => {
    event.preventDefault();
    $.ajax({
      type: "POST",
      url: "/tweets",
      data: $('#new-tweet-from').serialize()
    })
  })
})

