class TweetsController < ApplicationController

  respond_to :json

  def index
    Tweet.pull_tweets
    @tweet = Tweet.all
    render :json => @tweet.to_json   
  end
  
end
