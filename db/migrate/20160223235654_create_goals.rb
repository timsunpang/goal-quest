class CreateGoals < ActiveRecord::Migration
  def change
    create_table :goals do |t|
      t.string :title, null: false
      t.integer :priority, default: 3
      t.text :description
      t.integer :user_id, null: false
      t.integer :card_id, default: 1, null: false
      t.timestamps null: false
    end
    add_index :goals, :user_id
  end
end
