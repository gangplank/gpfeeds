class TweetsController < ApplicationController

  respond_to :json

  def index
    Tweet.pull_tweets
    @tweet = Tweet.find(:all, :order=>"tweet_id DESC", :limit => 10)
    render :json => @tweet.to_json   
  end
  
end
