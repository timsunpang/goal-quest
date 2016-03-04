# == Schema Information
#
# Table name: ownerships
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  item_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Ownership < ActiveRecord::Base
  validates :user_id, :item_id, presence: true;

  belongs_to :user
  belongs_to :item
end
