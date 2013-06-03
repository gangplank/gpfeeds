//= require jquery
//= require jquery_ujs
//= require_tree .

var event_sort_asc = function (event1, event2) {
	var date1 = event1.start.dateTime;
	var date2 = event2.start.dateTime;
  if (date1 > date2) return 1;
  if (date1 < date2) return -1;
  return 0;
};


function populate_events() {
	// Clear existing content:
	$('#events > dl').remove();
	// Get events and show them:
  $.getJSON('/events.json', function(data) {
    var items = [];
    data.sort(event_sort_asc);

    var counter = 0;
    $.each(data, function(key, val) {
      if (counter == 3) {
        return;
      }
      counter++;
    	startDate = new Date(val.start.dateTime);
      if (!val.location) { val.location = "Gangplank Chandler"; }
      items.push('<dt id="' + val.id + '" class="' + val.status + '">' + val.summary + '</dt> ' +
  	    '<dd class="organizer">' + val.organizer.displayName + '</dd> ' + 
  		'<dd class="location"> Location: ' + val.location + '</dd>' +
  	    '<dd> <time datetime="' + Date(val.start.dateTime) + '">' + startDate + '</time></dd>');
    });
   
    $('<dl/>', {
      'class': 'event',
      html: items.join('')
    }).appendTo('#events');
  });

  // Run this again after 60 seconds:
  window.setTimeout(function() {
  	populate_events();
  }, 600000);
}

function populate_tweets() {
  // Clear existing content:
  $('#tweets > div').remove();
  // Get tweets and show them:
  $.getJSON('/tweets.json', function(data) {
    var items = [];

    var counter = 0;
    $.each(data, function(key, val) {
      if (counter == 3) {
        return;
      }
      counter++;
      items.push(
        '<article id="' + val.tweet_id + '">' + 
          '<header>' + 
            '<aside><img src="' + val.avatar_url + '" /></aside>' +
            '<h1>' + val.name + ' <em>@' + val.screen_name + '</em>:</h1>' +
          '</header>' +
          '<p>' + val.content + 
          // ' <time datetime="' + val.tweet_time + '">' + val.tweet_time + '</time></p>' + 
        '</article>');
    });

    $('<div/>', {
      'class': 'tweet',
      html: items.join('')
    }).appendTo('#tweets');

  }); //end .getJSON

  // Run this again after 60 seconds:
  window.setTimeout(function() {
    populate_tweets();
  }, 60000);
}

// Run first time:
populate_events();
populate_tweets();