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
    items.push('<li>' + 
	    	'<img class="avatar" src="' + val.avatar_url + '" /> ' +
	    	'<span class="message">' + val.content + '</span>' +
	    	'<span class="screenName">@' + val.screen_name + '</span>' +
    	'</li>');
  });
 
  $('<ul/>', {
    'class': 'tweet',
    html: items.join('')
  }).appendTo('body');
});
