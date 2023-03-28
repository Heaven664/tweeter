$(document).ready(function () {
  $('#tweet-text').on('input', function () {
    let typed = $(this).val().length;
    let left = 140 - typed;
    let counter = $(this).closest('form').find('#tweet-counter')
    counter.html(left);
    if (left < 0) {
      $('#tweet-counter').addClass('counterNegative')
    } else {
      $('#tweet-counter').removeClass('counterNegative');
    }
  });
});