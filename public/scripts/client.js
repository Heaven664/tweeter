$(() => {

  /**
   * Escapes unsafe characters
   * @param {string} str - any sequence of characters
   * @returns same string
   */
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  /**
   * Makes get request to /tweets using AJAX
   */
  const loadTweets = () => {
    $.ajax({
      url: '/tweets'
    }).then((tweets) => renderTweets(tweets));
  };

  /**
   * Renders a list of tweets
   * @param {array} tweets - array of JSON objects
   */
  const renderTweets = (tweets) => {
    $('.tweets-container').empty();
    for (const tweet of tweets) {
      const tweetElement = createTweetElement(tweet);
      $('.tweets-container').prepend(tweetElement);
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
          <img src="${escape(tweet.user.avatars)}">
          <p>${escape(tweet.user.name)}</p>
        </div>
        <p>${escape(tweet.user.handle)}</p>
      </header>
      <div>
        <h4>${escape(tweet.content.text)}</h4>
      </div>
      <footer>
        <p>${escape(timeago.format(tweet.created_at))}</p>
        <div class="tweet-options">
          <i class="fa-solid fa-flag fa-xs"></i>
          <i class="fa-solid fa-retweet fa-xs"></i>
          <i class="fa-solid fa-heart fa-xs"></i>
        </div>
      </footer>
    </article>`);

    return $tweet;
  };

  loadTweets();

  $('#new-tweet-form').submit((event) => {
    event.preventDefault();
    const length = $('#tweet-text').val().trim().length;
    if (length < 1) {
      alert('You should write something');
      return;
    }
    if (length > 140) {
      alert('Your text is too long');
      return;
    }
    $.ajax({
      type: "POST",
      url: "/tweets",
      data: $('#new-tweet-form').serialize()
    }).then(loadTweets());
  });
})

