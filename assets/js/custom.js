$(function() {
  $('.tdnn').click(function () {
    $(".moon").toggleClass('sun');
    $(".tdnn").toggleClass('day');

    $("body").toggleClass('dark');
  });
});