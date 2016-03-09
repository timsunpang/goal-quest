# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


Item.create(
  name: "Test",
  description: "A simple concoction. Heals 10 HP.",
  price: 80,
  hp_value: 10,
  atk_value: 0,
  def_value: 0,
  item_type: "consummable",
  picture_url: "http://i66.tinypic.com/2hqfnv9.png",
  special: 0
)
