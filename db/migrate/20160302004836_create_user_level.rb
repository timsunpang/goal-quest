class CreateUserLevel < ActiveRecord::Migration
  def change
    add_column :users, :level, :integer, default: 1, null: false
    add_column :users, :exp, :integer, default: 0, null: false
    add_column :users, :gold, :integer, default: 100, null: false
  end
end
