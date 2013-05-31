Twitter.configure do |config|
  config.consumer_key = ENV["T_CONSUMER_KEY"]
  config.consumer_secret = ENV["T_CONSUMER_SECRET"]
  config.oauth_token = ENV["T_OAUTH_TOKEN"]
  config.oauth_token_secret = ENV["T_OAUTH_TOKEN_SECRET"]
end
