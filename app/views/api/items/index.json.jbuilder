json.array! @items do |item|
  json.extract! item, :id, :name, :description, :price, :hp_value, :atk_value, :def_value, :item_type, :picture_url, :created_at, :updated_at
  json.owned current_user.items.include?(item)
end
