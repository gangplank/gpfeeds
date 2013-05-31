class ChangeTweetsTweetidDatatypeToInteger < ActiveRecord::Migration
	def up
		remove_column :tweets, :tweet_id
		add_column :tweets, :tweet_id, :integer
	end

	def down
		remove_column :tweets, :tweet_id
		add_column :tweets, :tweet_id, :string
	end
end
