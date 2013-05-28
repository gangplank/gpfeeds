class Event
  require 'open-uri'
  require 'json' 
  
  def self.pull_events #(url)
    url = "https://www.googleapis.com/calendar/v3/calendars/gangplankhq.com_0fgcnbe2jug0b1bi43m5qv86s8%40group.calendar.google.com/events?timeMin=#{formatted_time_now}&key=AIzaSyDVtDCLk-mEaNPg1UdS5UkXFgbidaRTpmQ"
    JSON.parse(open(url).read)["items"].map do |e|
      e.keep_if { |key, value | ["summary", "status", "organizer", "location", "start", "end" ].include?(key) }
    end
  end
    
private

  #refactor this, specifically UTC offset
  def self.formatted_time_now
    now = DateTime.now
    now.strftime("%Y-%m-%dT%H") + "%3A" + now.strftime("%m")+ "%3A" + now.strftime("%S") + "-07%3A00"
  end
end