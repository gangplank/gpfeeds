class TweetsController < ApplicationController

  respond_to :json

  def index
    #to-do 
    
    #to-do write a rescue
    Tweet.pull_tweets
    
    @tweet = Tweet.find(:all, :order=>"tweet_id DESC", :limit => 5)
    render :json => @tweet.to_json   
  end
  
end
