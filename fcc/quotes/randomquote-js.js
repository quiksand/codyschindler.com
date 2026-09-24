/**
 * FILENAME:    randomquote-js.js
 * DESCRIPTION: Random quote generator frontpage js
 * REQS:        jQuery
 * VERISON:     1.0.1
 * UPDATED:     2015-10-27
 * WRITTEN BY:  Cody Schindler (quiksand)
 * ORGANIZATION: none
 * CHANGELOG:  
 * 1.0.1 (2015-10-27): Deprecation. Keep for codepen connectivity.
 * 1.0.0 (2015-10-26): Creation.
*/

$(document).ready(function() {
  var quote = $(".hidden").html().toString();
  var re = new RegExp("script>(.*)<i.*<a(.*a>)");
  var found = quote.match(re);
  var newHTML = found[1] + '-<i><a class="authorlink" target="_blank"' + found[2] +'</i>';
  $(".showme").html(newHTML);
});
