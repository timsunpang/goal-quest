class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.string :name, null:false
      t.text :description, null:false
      t.integer :price, default: 0
      t.integer :hp_value, default: 0
      t.integer :atk_value, default: 0
      t.integer :def_value, default: 0
      t.string :item_type, null:false
      t.string :picture_url

      t.timestamps null: false
    end
  end
end
