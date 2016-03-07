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

class User < ActiveRecord::Base
  attr_reader :password
  validates :username, :password_digest, :session_token, :level, :exp, presence: true
  validates :gold, :numericality => {:greater_than_or_equal_to => 0}
  validates :username, uniqueness: true
  validates :password, length: {minimum: 6, allow_nil: true}
  after_initialize :ensure_session_token

  has_many :goals
  has_many :ownerships
  has_many :items,
  through: :ownerships

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil if user.nil?
    user.is_password?(password) ? user : nil
  end

  def reset_token!
    self.session_token = User.generate_session_token
    self.save!
    self.session_token
  end


  private

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end

  def self.generate_session_token
    SecureRandom.urlsafe_base64(16)
  end
end
