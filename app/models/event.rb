class Event
  require 'open-uri'
  require 'json' 
  
  def self.pull_events
    url = "https://www.googleapis.com/calendar/v3/calendars/gangplankhq.com_0fgcnbe2jug0b1bi43m5qv86s8%40group.calendar.google.com/events?futureevents=true&timeMin=#{today}&timeMax=#{future}&key=AIzaSyDVtDCLk-mEaNPg1UdS5UkXFgbidaRTpmQ"
    JSON.parse(open(url).read)["items"].map do |e|
      # Get the recurring rule string from the event
      rrule = CGI::parse(e["recurrence"].find {|s| s.include?("RRULE")}) if e["recurrence"]
      # Set the correct Date for the event based on the recurring settings.
      if rrule and rrule["RRULE:FREQ"] == ["WEEKLY"]
        range = (DateTime.now..DateTime.now + 3).to_a
        start = DateTime.parse(e["start"]["dateTime"])
        date = range[range.index { |dt| dt.wday == start.wday }]
        corrected_start = DateTime.new(date.year, date.month, date.day, start.hour, start.min)
        e["start"]["dateTime"] = corrected_start
      end
      e.keep_if { |key, value | ["id", "summary", "status", "organizer", "location", "start"].include?(key) }
    end
  end
  
  private
    
  def self.today
    format_time(DateTime.now)
  end
  
  def self.future
    format_time(DateTime.now + 3) 
  end

  #refactor this, specifically UTC offset
  def self.format_time(time)
    time.strftime("%Y-%m-%dT%H") + "%3A" + time.strftime("%m")+ "%3A" + time.strftime("%S") + "-07%3A00"
  end
end