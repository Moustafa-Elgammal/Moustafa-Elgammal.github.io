/* Search Box */
var search_box = $('.search-box input[type=text]');
search_box.focusin(function () {
    var placeholder_text = $(this).attr('placeholder');
    $(this).attr('data-placeholder', placeholder_text);
    $(this).attr('placeholder', '');
    return false;
});
search_box.blur(function () {
    var placeholder_text = $(this).attr('data-placeholder');
    $(this).attr('placeholder', placeholder_text);
    return false;
});

/* Scroll To The Top Of The Page */
$(".go-top").click(function() {
  $("html, body").animate({ scrollTop: 0 }, "slow");
  return false;
});

/* Run Owl Carousel */
var owl = $('#top-slider').owlCarousel({
  margin: 10,
  loop: false,
  autoWidth: true,
  nav: true,
  items: 1,
  center: true,
  slideSpeed : 300,
  paginationSpeed : 750,
  singleItem: true,
  autoPlay: true,
  pagination: true,
  navigation: true,
  navigationText: ['<i class="fa fa-chevron-circle-left" aria-hidden="true"></i>','<i class="fa fa-chevron-circle-right" aria-hidden="true"></i>']
});

/* Share Video */
$('.video-details .share').click(function () {
    $(this).parent('.video-details').find('.share-btns').fadeToggle(300);
    return false; 
});