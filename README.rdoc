## gpfeeds ##

This is a simple app to show upcoming events (and other stuff) on a display.

Events are collected from Google Calendar, API access is required (we're using the complementary limits at the moment). https://developers.google.com/google-apps/calendar/

Tweets are collected using the Twitter API v1.1, again API access is required. 
- https://dev.twitter.com/
- https://dev.twitter.com/docs/api/1.1
- https://dev.twitter.com/apps

### Contributing ###

To contribute on this project you can create a fork on your GitHub account and issue a pull request with any changes. As soon as you have one merged pull request you will be given push access to the main repo.

### Installing ###

To install you should have git, ruby, rails, and rvm installed.

You will also need to have new API keys for this app created with your Google and Twitter accounts (and these will be added to the local_env.yml file).

Do the following on the command line (x = repo you can push to e.g. git@github.com:gangplank/gpfeeds.git, y = your local directory to clone in to):
  git clone x y
  rvm use ruby-1.9.3@gpfeeds --create
  cd gpfeeds
  cp config/local_env.yml.example config/local_env.yml
  vim config/local_env.yml #Add your own API keys to this file
  bundle
  rails s

Unless you encounter any errors a WebRick server should now be running on port 3000 which you can access at http://localhost:3000

### Testing on Heroku ###

After you have the Heroku toolkit installed you can use the following commands on the command line to push the project to a new free app on [random].herokuapp.com:
	heroku create
	git push heroku master
	heroku run rake db:create
	heroku run rake db:migrate

When you run `git push heroku master` you will get a lot of output showing the rerun of `bundle` remotely, and the server will automatically restart.

If you have modified Gemfile recently you may need to remove the Gemfile.lock file and rerun bundle before pushing to Heroku...

If you are pushing database changes to Heroku and the `rake db:migrate` command isn't working, you can reset the Postgres database with `heroku pg:reset DATABASE` then do `heroku run rake db:create` and `heroku run rake db:migrate` again.

For more help with debugging heroku problems you can use `heroku logs` and feel free to contact anyone with commit access.