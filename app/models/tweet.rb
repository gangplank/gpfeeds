class Tweet < ActiveRecord::Base

  attr_accessible :avatar_url, :content, :name, :screen_name, :tweet_id, :tweet_time
  
  def self.pull_tweets
    tweets = Twitter.search("#gpchandler OR @gpchandler OR @gangplank -rt", :result_type => "recent", :count => 20, :since_id => latest_tweet_id).statuses
    add_tweets_to_db(tweets)
  end

private

  def self.latest_tweet_id
    self.maximum(:tweet_id)
  end

  def self.add_tweets_to_db(tweets)
    tweets.each do |tweet|
      unless exists?(tweet_id: tweet.id)
        create!(
          tweet_id: tweet.id,
          tweet_time: tweet.created_at,
          name: tweet.user.name,
          screen_name: tweet.user.screen_name,
          avatar_url: tweet.user.profile_image_url,
          content: tweet.text
        )
      end
    end
  end

end
