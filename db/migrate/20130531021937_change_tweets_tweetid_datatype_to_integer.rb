class ChangeTweetsTweetidDatatypeToInteger < ActiveRecord::Migration
	def up
	  change_column :tweets, :tweet_id, :integer
	end

	def down
		change_column :tweets, :tweet_id, :string
	end
end
