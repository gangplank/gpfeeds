class CreateTweets < ActiveRecord::Migration
  def change
    create_table :tweets do |t|
      t.string :tweet_id
      t.datetime :tweet_time
      t.string :name
      t.string :screen_name
      t.text :content
      t.text :avatar_url
      t.timestamps
    end
  end
end
