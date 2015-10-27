/**
 * FILENAME:    index-js.js
 * DESCRIPTION: This is the javascript for codyschindler.com main page (index.html).
 * REQS:        jQuery
 * VERISON:     1.0.0
 * UPDATED:     2015-10-25
 * WRITTEN BY:  Cody Schindler (quiksand)
 * CHANGELOG:  
 * 1.0.0 (2015-10-25): Creation and organization in preparatiion for site launch.
 */

$(document).ready(function() {

  //sets segment heights
  var h = $(window).height() * 1.25;
  $(".seg").css('min-height', h);

  //Button effects for li elements.
  $('li').hover(function() {
      $(this).addClass("active");
    },
    function() {
      $(this).removeClass("active");
    });

  //Button effects for brand link.
  $('.navbar-brand').hover(function() {
      $(this).addClass("active");
    },
    function() {
      $(this).removeClass("active");
    });

});