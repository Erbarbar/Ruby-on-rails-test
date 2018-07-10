class AddIndextoRestaurant < ActiveRecord::Migration
  def change
		add_index :restaurants, :name, unique: true
  end
end
