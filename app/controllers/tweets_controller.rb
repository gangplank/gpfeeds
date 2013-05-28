class TweetsController < ApplicationController

  respond_to :json

  def index
    @tweet = Tweet.all 
    render :json => @tweet.to_json   
  end
  
end
