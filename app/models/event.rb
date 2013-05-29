class Event
  require 'open-uri'
  require 'json' 
  
  def self.pull_events #(url)
    url = "https://www.googleapis.com/calendar/v3/calendars/gangplankhq.com_0fgcnbe2jug0b1bi43m5qv86s8%40group.calendar.google.com/events?futureevents=true&timeMin=#{today}&timeMax=#{tomorrow}&key=AIzaSyDVtDCLk-mEaNPg1UdS5UkXFgbidaRTpmQ"
    JSON.parse(open(url).read)["items"].map do |e|
      e.keep_if { |key, value | ["id", "summary", "status", "organizer", "location", "start", "end" ].include?(key) }
    end
  end
  
  private
    
  def self.today
    format_time(DateTime.now)
  end
  
  def self.tomorrow
    format_time(1.days.from_now) 
  end

  #refactor this, specifically UTC offset
  def self.format_time(time)
    time.strftime("%Y-%m-%dT%H") + "%3A" + time.strftime("%m")+ "%3A" + time.strftime("%S") + "-07%3A00"
  end
end