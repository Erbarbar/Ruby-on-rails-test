class Menu < ActiveRecord::Base
	belongs_to :restaurant
	validates :menu_id, presence: true
end
