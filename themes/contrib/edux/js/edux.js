/* Load jQuery.
--------------------------*/
jQuery(document).ready(function ($) {
// Full page search.
  $('.search-icon').on('click', function() {
    $('.search-box').addClass('open');
    return false;
  });

  $('.search-box-close').on('click', function() {
    $('.search-box').removeClass('open');
    return false;
  });
  // Homepage blocks
  $(".region-content-home .block").wrapInner( '<div class="container"></div>' );

/* End document
--------------------------*/
});