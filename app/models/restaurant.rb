class Restaurant < ActiveRecord::Base
	has_many :menus, dependent: :destroy
end
