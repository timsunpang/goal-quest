# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  level           :integer          default(1), not null
#  exp             :integer          default(0), not null
#  gold            :integer          default(100), not null
#  face_id         :integer          default(100), not null
#  head_id         :integer          default(101), not null
#  body_id         :integer          default(102), not null
#  legs_id         :integer          default(103), not null
#  weapon_id       :integer          default(104), not null
#  shield_id       :integer          default(105), not null
#

require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
