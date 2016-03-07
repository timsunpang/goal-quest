class AddEquipmentToUser < ActiveRecord::Migration
  def change
    add_column :users, :face_id, :integer, default: 100, null: false
    add_column :users, :head_id, :integer, default: 101, null: false
    add_column :users, :body_id, :integer, default: 102, null: false
    add_column :users, :legs_id, :integer, default: 103, null: false
    add_column :users, :weapon_id, :integer, default: 104, null: false
    add_column :users, :shield_id, :integer, default: 105, null: false
    add_column :items, :special, :integer, default: false, null: false
  end
end
