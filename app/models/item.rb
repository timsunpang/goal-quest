# == Schema Information
#
# Table name: items
#
#  id          :integer          not null, primary key
#  name        :string           not null
#  description :text             not null
#  price       :integer          default(0)
#  hp_value    :integer          default(0)
#  atk_value   :integer          default(0)
#  def_value   :integer          default(0)
#  item_type   :string           not null
#  picture_url :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  special     :integer          default(0), not null
#  armor_type  :string
#

class Item < ActiveRecord::Base
  validates :name, :description, presence: true
  validates :price, :numericality => {:greater_than_or_equal_to => 0}
  validates :hp_value, :numericality => {:greater_than_or_equal_to => 0}
  validates :atk_value, :numericality => {:greater_than_or_equal_to => 0}
  validates :def_value, :numericality => {:greater_than_or_equal_to => 0}
  validates :item_type, inclusion: {in: ['consummable', 'armor']}
  validates :armor_type, inclusion: {in: ['face', 'head', 'body', 'legs', 'weapon', 'shield']}, allow_nil: true

  has_many :ownerships

  has_many :users,
  through: :ownerships
end
