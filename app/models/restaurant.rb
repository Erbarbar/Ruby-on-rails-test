class Restaurant < ActiveRecord::Base
	has_many :menus, dependent: :destroy
	validates :name, presence: true
end
