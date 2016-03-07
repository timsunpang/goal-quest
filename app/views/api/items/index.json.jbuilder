json.array! @items do |item|
  json.extract! item, :id, :name, :description, :price, :hp_value, :atk_value, :def_value, :item_type, :armor_type, :picture_url, :special, :created_at, :updated_at
  json.owned current_user.items.include?(item)
  if [current_user.face_id, current_user.head_id, current_user.body_id, current_user.legs_id, current_user.weapon_id, current_user.shield_id].any? {|id| id == item.id}
    json.equipped true
  else
    json.equipped false
  end
end
