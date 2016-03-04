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
#

require 'test_helper'

class ItemTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
