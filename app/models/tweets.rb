class Tweets < ActiveRecord::Base
  attr_accessible :avatar_url, :content, :name, :screen_name, :tweet_id, :tweet_time
  
  def self.pull_tweets
    Twitter.
end
