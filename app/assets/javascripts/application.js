// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

// Get events and show them:
$.getJSON('/events.json', function(data) {
  var items = [];
 
  $.each(data, function(key, val) {
    items.push('<li class="'+val.status+'">' + 
	    	'<span class="summary">' + val.summary + '</span> ' +
	    	'<span class="organizer">' + val.organizer.displayName + '</span> ' + 
	    	'<span class="startDateTime">' + val.start.dateTime + '</span> ' + 
	    	'<span class="endDateTime">' + val.end.dateTime + '</span> ' + 
    	'</li>');
  });
 
  $('<ul/>', {
    'class': 'event',
    html: items.join('')
  }).appendTo('body');
});


// Get tweets and show them:
$.getJSON('/tweets.json', function(data) {
  var items = [];
 
  $.each(data, function(key, val) {
    items.push('<article class="tweet">' + 
	    	'<h2><img class="avatar" src="' + val.avatar_url + '" /></h2>' +
	    	'<h3 class="screenName">'+ val.name +' <span>(@' + val.screen_name + ')</span></h3>' +
	    	'<p class="message">' + val.content + '</p>' +
	    	'<footer>Published: <time '
    	'</li>');
  });
 
  $('<ul/>', {
    'class': 'tweet',
    html: items.join('')
  }).appendTo('body');
});


<article class="tweet">
	<h3><img src="url" /></h3>
	<h2>(NAME) <span>(@NAME)</h2>
	<p>(TWEET)</p>
	<footer>Published: <time pubdate datetime="(TIME)">(PARSED TIME)</footer>
</article>