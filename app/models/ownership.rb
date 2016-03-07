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

  def self.find_by_credentials(user_id, item_id)
    ownership = Ownership.find_by_user_id_and_item_id(user_id, item_id)
    return nil if ownership.nil?
  end

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil if user.nil?
    user.is_password?(password) ? user : nil
  end
end
