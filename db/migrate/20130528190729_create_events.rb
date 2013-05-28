class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :summary
      t.string :organizer
      t.string :location
      t.string :status
      t.datetime :start
      t.datetime :end 
      
      t.timestamps
    end
  end
end
