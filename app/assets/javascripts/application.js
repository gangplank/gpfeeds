//= require jquery
//= require jquery_ujs
//= require moment
//= require_tree .

var event_sort_asc = function (event1, event2) {
	var date1 = event1.start.dateTime;
	var date2 = event2.start.dateTime;
  if (date1 > date2) return 1;
  if (date1 < date2) return -1;
  return 0;
};

var eventItemLimit = 5;
var tweetItemLimit = 4;
var update_frequency = 60000;

// Show Google Calendar events:
function populate_events() {
	// Clear existing content:
	// Get events and show them:
  $.getJSON('/events.json', function(data) {
    $('#events > dl').remove();
    var items = [];
    data.sort(event_sort_asc);

    var counter = 0;
    $.each(data, function(key, val) {
      if (counter == eventItemLimit) {
        return;
      }
      counter++;
      var startDateTime = moment.utc(new Date(val.start.dateTime)).subtract(7, 'hours').format('LLLL');
      if (!val.location) { val.location = "Gangplank Chandler"; }
      items.push('<dt id="' + val.id + '" class="' + val.status + '">' + val.summary + '</dt> ' +
  	    '<dd class="organizer">' + val.organizer.displayName + '</dd> ' + 
  		  '<dd class="location"> Location: ' + val.location + '</dd>' +
  	    '<dd> <time datetime="' + startDateTime + '">' + startDateTime + '</time></dd>');
    });
   
    $('<dl/>', {
      'class': 'event',
      html: items.join('')
    }).appendTo('#events');
  });

  // Run this again after 60 seconds:
  window.setTimeout(function() {
  	populate_events();
  }, 60000);
}

// Show Twitter tweets:
function populate_tweets() {
  // Clear existing content:
  // Get tweets and show them:
  $.getJSON('/tweets.json', function(data) {
    $('#tweets #tweetitemswrapper > div').remove();
    var items = [];

    var counter = 0;
    $.each(data, function(key, val) {
      if (counter == tweetItemLimit) {
        return;
      }
      counter++;
      var this_tweet_id_string = "a" + val.tweet_id.toString();
      items.push(
        '<article id="' + this_tweet_id_string + '">' + 
          '<header>' + 
            '<aside><img src="' + val.avatar_url + '" /></aside>' +
            '<h1>' + val.name + '</h1><h2><em>@' + val.screen_name + '</em>:</h2>' +
          '</header>' +
          '<p>' + val.content + 
          // ' <time datetime="' + val.tweet_time + '">' + val.tweet_time + '</time></p>' + 
        '</article>');
    });

    $('<div/>', {
      'class': 'tweet',
      html: items.join('')
    }).appendTo('#tweets #tweetitemswrapper');

  }); //end .getJSON

  // Run this again after 60 seconds:
  window.setTimeout(function() {
    append_tweets();
  }, update_frequency);
}

// Append Twitter tweets:
function append_tweets() {
  // Clear existing content:
  // Get tweets and show them:
  $.getJSON('/tweets.json', function(data) {
    var counter = 0;
    $.each(data, function(key, val) {
      if (counter == tweetItemLimit) {
        return;
      }
      counter++;
      var this_tweet_id_string = "a" + val.tweet_id.toString();
      if ($('#tweetitemswrapper .tweet article#' + this_tweet_id_string).length == 0) {
        $('#tweetitemswrapper .tweet').prepend(
          '<article style="display:none;" id="' + this_tweet_id_string + '">' + 
            '<header>' + 
              '<aside><img src="' + val.avatar_url + '" /></aside>' +
              '<h1>' + val.name + '</h1><h2><em>@' + val.screen_name + '</em>:</h2>' +
            '</header>' +
            '<p>' + val.content + 
            // ' <time datetime="' + val.tweet_time + '">' + val.tweet_time + '</time></p>' + 
          '</article>');
        $('article#' + this_tweet_id_string).show('slow');
        $('#tweetitemswrapper .tweet article:last').fadeOut('slow', function() {$(this).remove(':last-child')});
      }
    });

  }); //end .getJSON

  // Run this again after 60 seconds:
  window.setTimeout(function() {
    append_tweets();
  }, update_frequency);
}


// Run first time:
populate_events();
populate_tweets();