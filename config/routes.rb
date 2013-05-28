Gpfeeds::Application.routes.draw do

  root :to => "application#show"

  get "tweets_controller/show"

end
