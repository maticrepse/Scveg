class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  acts_as_follower
  acts_as_followable
  has_many :posts
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :confirmable

  has_attached_file :avatar, styles: { medium: "300x300>", thumb: "100x100>" }, default_url: "/assets/stockUserPhoto.png"
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/

end
