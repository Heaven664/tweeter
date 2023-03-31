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

  /**
   * Slides down error message
   * @param {html} message - html error message
   */
  const showError = (message) => {
    $('#error-message').addClass('error').slideDown(500);
    setTimeout(() => {
      $('#error-message').html(message);
    }, 500);
  };

  loadTweets();

  $('#error-message').slideUp(0);

  // Displays and hides error messages
  $('#new-tweet-form').submit((event) => {
    event.preventDefault();
    const length = $('#tweet-text').val().trim().length;
    $('#error-message').slideUp(500);
    if (length < 1) {
      const message = `<p>You should write something</p>`;
      return showError(message);
    }

    if (length > 140) {
      const message = `<p>Your text is too long</p>`;
      return showError(message);
    }

    $('#error-message').slideUp(500);
    $.ajax({
      type: "POST",
      url: "/tweets",
      data: $('#new-tweet-form').serialize()
    }).then((tweet) => {
      $('#tweet-text').val('');
      $('.counter').val(140);
      loadTweets();
    });
  });

  // Increases size of the logo
  $('#write-new-tweet').hover(function () {
    $('#nav-scroll-icon').addClass("fa-xl");
  }, function () {
    $('#nav-scroll-icon').removeClass("fa-xl");
  });

  // Slides up and down tweet compose form
  $('#write-new-tweet').click(function () {
    if ($('.new-tweet').is(':visible')) {
      $('.new-tweet').slideUp(500);
      $('#nav-scroll-icon').removeClass('fa-angles-down').addClass('fa-angles-up');
    } else {
      $('.new-tweet').slideDown(500);
      $('#nav-scroll-icon').removeClass('fa-angles-up').addClass('fa-angles-down');
    }
  });

  // Adds scroll button if viewport under the tweet compose from 
  $(document).scroll(function () {
    const showHeight = 180;
    let currentHeight = $(this).scrollTop();
    if (currentHeight > showHeight) {
      $('#scroller').show(200);
      $('#write-new-tweet').fadeOut(100);
    } else {
      $('#scroller').hide(200);
      $('#write-new-tweet').fadeIn(100);
    }

  });

  // Scrolls to new tweet input and focuses on it
  $('#scroller').click(() => {
    // if form is hided
    if (!$('.new-tweet').is(':visible')) {
      $('.new-tweet').slideDown(1100);
      $('#nav-scroll-icon').removeClass('fa-angles-up').addClass('fa-angles-down');
    }
    // animate the scroll
    $('html, body').animate({
      scrollTop: $("#tweet-text").offset().top - 400
    }, 600);
    // focus on the form
    setTimeout(() => {
      $("#tweet-text").focus();
    }, 650);
  });
})

