class ChangeTweetsTweetidDatatypeToInteger < ActiveRecord::Migration
	def up
	  change_column :tweets, :tweet_id, :decimal, :precision => 0
	end

	def down
		change_column :tweets, :tweet_id, :string
	end
end
