Gpfeeds::Application.routes.draw do

  root :to => "application#index"

  resources :tweets
  resources :events

end
