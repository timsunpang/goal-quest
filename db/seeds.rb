# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


Item.create(
  name: "Potion",
  id: 1,
  name: "Potion",
  description: "A simple concoction. Heals 10 HP.",
  price: 80,
  hp_value: 10,
  atk_value: 0,
  def_value: 0,
  item_type: "consummable",
  picture_url: "http://i66.tinypic.com/2hqfnv9.png",
  special: 0
)

Item.create(
  id: 2,
  name: "Iron Shield",
  description: "A common soldier's shield.",
  price: 200,
  hp_value: 0,
  atk_value: 0,
  def_value: 1,
  item_type: "armor",
  armor_type: "shield",
  picture_url: "http://res.cloudinary.com/ladh6sfp9/image/upload/v1457479064/GoalQuest/sprite_body3.png",
  special: 0
)

Item.create(
  id: 4,
  name: "Iron Leggings",
  description: "Heavy armor at a bargain price!",
  price: 450,
  hp_value: 0,
  atk_value: 0,
  def_value: 3,
  item_type: "armor",
  armor_type: "legs",
  picture_url: "http://res.cloudinary.com/ladh6sfp9/image/upload/v1457479064/GoalQuest/sprite_body5.png",
  special: 0
)

Item.create(
  id: 5,
  name: "Iron Armor",
  description: "Heavy armor at a bargain price!",
  price: 500,
  hp_value: 0,
  atk_value: 0,
  def_value: 5,
  item_type: "armor",
  armor_type: "body",
  picture_url: "http://res.cloudinary.com/ladh6sfp9/image/upload/v1457479064/GoalQuest/sprite_body4.png",
  special: 0
)

Item.create(
  id: 100,
  name: "Base Face",
  description: "Base Face",
  price: 0,
  hp_value: 0,
  atk_value: 0,
  def_value: 0,
  item_type: "armor",
  armor_type: "face",
  picture_url: "http://res.cloudinary.com/ladh6sfp9/image/upload/v1457479064/GoalQuest/sprite_body9.png",
  special: 1
  )

  Item.create(
  id: 102,
  name: "Base Body",
  description: "Base Body",
  price: 0,
  hp_value: 0,
  atk_value: 0,
  def_value: 0,
  item_type: "armor",
  armor_type: "body",
  picture_url: "http://res.cloudinary.com/ladh6sfp9/image/upload/v1457479064/GoalQuest/sprite_body6.png",
  special: 1
  )

  Item.create(
  id: 103,
  name: "Base Legs",
  description: "Base Legs",
  price: 0,
  hp_value: 0,
  atk_value: 0,
  def_value: 0,
  item_type: "armor",
  armor_type: "legs",
  picture_url: "http://res.cloudinary.com/ladh6sfp9/image/upload/v1457479065/GoalQuest/sprite_body7.png",
  special: 1
  )

  Item.create(
  id: 105,
  name: "Base Shield",
  description: "Base shield",
  price: 0,
  hp_value: 0,
  atk_value: 0,
  def_value: 0,
  item_type: "armor",
  armor_type: "shield",
  picture_url: "http://res.cloudinary.com/ladh6sfp9/image/upload/v1457479063/GoalQuest/blank.png",
  special: 1
  )

  Item.create(
  id: 3,
  name: "Iron Sword",
  description: "A common soldier's sword.",
  price: 300,
  hp_value: 0,
  atk_value: 3,
  def_value: 0,
  item_type: "armor",
  armor_type: "weapon",
  picture_url: "http://res.cloudinary.com/ladh6sfp9/image/upload/v1457479064/GoalQuest/sprite_body2.png",
  special: 0
  )

  Item.create(
  id: 101,
  name: "Base Head",
  description: "Base Head",
  price: 0,
  hp_value: 0,
  atk_value: 0,
  def_value: 0,
  item_type: "armor",
  armor_type: "head",
  picture_url: "http://res.cloudinary.com/ladh6sfp9/image/upload/v1457479063/GoalQuest/blank.png",
  special: 1
  )

  Item.create(
  id: 104,
  name: "Wooden Sword",
  description: "A simple wooden sword",
  price: 0,
  hp_value: 0,
  atk_value: 1,
  def_value: 0,
  item_type: "armor",
  armor_type: "weapon",
  picture_url: "http://res.cloudinary.com/ladh6sfp9/image/upload/v1457479065/GoalQuest/wooden_sword.png",
  special: 1
  )

  Item.create(
  id: 6,
  name: "Leather Armor",
  description: "Simple leather armor",
  price: 200,
  hp_value: 0,
  atk_value: 0,
  def_value: 3,
  item_type: "armor",
  armor_type: "body",
  picture_url: "http://res.cloudinary.com/ladh6sfp9/image/upload/v1457479063/GoalQuest/leather_armor.png",
  special: 0
  )

  Item.create(
  id: 7,
  name: "Leather Leggings",
  description: "Simple leather armor",
  price: 150,
  hp_value: 0,
  atk_value: 0,
  def_value: 2,
  item_type: "armor",
  armor_type: "legs",
  picture_url: "http://res.cloudinary.com/ladh6sfp9/image/upload/v1457479063/GoalQuest/leather_leggings.png",
  special: 0
  )

  Item.create(
  id: 8,
  name: "Wooden Shield",
  description: "A small wooden shield",
  price: 150,
  hp_value: 0,
  atk_value: 0,
  def_value: 1,
  item_type: "armor",
  armor_type: "shield",
  picture_url: "http://res.cloudinary.com/ladh6sfp9/image/upload/v1457479065/GoalQuest/wooden_shield.png",
  special: 0
  )
