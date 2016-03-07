class AddArmorTypes < ActiveRecord::Migration
  def change
    add_column :items, :armor_type, :string
  end
end
