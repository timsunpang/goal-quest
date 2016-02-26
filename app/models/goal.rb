# == Schema Information
#
# Table name: goals
#
#  id          :integer          not null, primary key
#  title       :string           not null
#  priority    :integer          default(3)
#  description :text
#  user_id     :integer          not null
#  card_id     :integer          default(1), not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Goal < ActiveRecord::Base
  validates :title, :user_id, :card_id, presence: true
  validates :priority, inclusion: {in: (1..5).to_a}
  belongs_to :user
end
