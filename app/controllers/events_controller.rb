class EventsController < ApplicationController

  respond_to :json

  def index
    @events = Event.pull_events
    render :json => @events.to_json   
  end
  
end