/**
 * FILENAME:    generator-js.js
 * DESCRIPTION: Random quote generator js
 * REQS:        jQuery
 * VERISON:     1.0.1
 * UPDATED:     2015-10-27
 * WRITTEN BY:  Cody Schindler (quiksand)
 * ORGANIZATION: none
 * CHANGELOG:  
 * 1.0.1 (2015-10-27): Added tweet feature. Changed dependence.
 * 1.0.0 (2015-10-26): Creation.
*///

$(document).ready(function() {
  
  var tweeturl = "https://twitter.com/intent/tweet?";
  var re = new RegExp('<\/script>(.*)<br>.*f="(.*)">(.*)<\/a>');
  
  //load iframe and THEN run code, or else tweet button doesn't work properly
  $(".exframe").load(function(){
  
  	var quote = $(".exframe").contents().find("body").html().toString();
  	var mat = quote.match(re);
  	var newHTML =  mat[1] + '<br>-<i><a class="authorlink" target="_blank" href="' + mat[2] + '">' + mat[3] +'</a></i>';
  	var qut = 'text=' + encodeURIComponent(mat[1]) + '%20-' +encodeURIComponent(mat[3]);
    	var lnk = '&url=' + encodeURIComponent(mat[2]);
    	var via = '&via=codyschindler';
  	var quoteurl = tweeturl + qut + lnk + via;
  	$(".tweetbutton").attr("href", quoteurl);
  	$(".quoteseg").html(newHTML);
  
  }); // iframe loading
  
  $(".quotebutton").click(function(){
    //force iframe refresh when button is pushed
    $(".exframe").attr("src", $("iframe").attr("src"));
  }); //quote click
  
}); //document.ready